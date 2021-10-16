/**
 * ==============================================================================
 * HIRED APPLICANTS
 * ==============================================================================
*/


/** Initialize Hired Applicants DataTable */
initDataTable('#hiredApplicantsDT', {
    url: `${ DH_API_ROUTE }hired-applicants`,
    columns: [
        
        // Created at (for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                return formatName("F M. L, S", {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name
                })
            }
        },

        // Position
        { data: 'applied_job.manpower_request.vacant_position.name' },

        // Applied at
        {
            data: null,
            render: data => {
                const appliedAt = data.created_at;
                return `
                    <div>${ formatDateTime(appliedAt, 'MMM. D, YYYY') }</div>
                    <div>${ formatDateTime(appliedAt,'Time') }</div>
                    <div class="small text-secondary">${ fromNow(appliedAt) }</div>
                `
            }
        },

        // Hired at
        {
            data: null,
            render: data => {
                const hiredAt = data.hired_at;
                return `
                    <div>${ formatDateTime(hiredAt, 'MMM. D, YYYY') }</div>
                    <div>${ formatDateTime(hiredAt,'Time') }</div>
                    <div class="small text-secondary">${ fromNow(hiredAt) }</div>
                `
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const status = data.status;

                if(status === "Hired") 
                    return dtBadge('warning', `
                        <i class="fas fa-file-signature mr-1"></i>
                        <span>For signing</span>
                    `)
                else if(status === "Contract signed")
                    return dtBadge('success', `
                        <i class="fas fa-check mr-1"></i>
                        <span>Signed</span>
                    `)
                else 
                    return dtBadge('light', `Invalid data`)
            }
        },

        // Action
        {
            data: null,
            class: 'text-center',
            render: data => {
                const applicantID = data.applicant_id;

                const markContractAsSigned = () => {
                    if(data.status === "Hired") return `
                        <div
                            role="button"
                            class="dropdown-item d-flex"
                            onclick="markContractAsSigned('${ applicantID }')"
                        >
                            <div style="width: 2rem">
                                <i class="fas fa-check mr-1"></i>
                            </div>
                            <span>Mark contract as signed</span>
                        </div>
                        `
                } 

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div
                                role="button"
                                class="dropdown-item d-flex"
                                onclick="getHiredApplicantDetails('${ applicantID }')"
                            >
                                <div style="width: 2rem">
                                    <i class="fas fa-list mr-1"></i>
                                </div>
                                <span>View Details</span>
                            </div>

                            ${ markContractAsSigned() }
                        </div>
                    </div>
                `
            }
        },
    ]
});


/** Get Hired Applicant Details */
const getHiredApplicantDetails = (applicantID) => {
    GET_ajax(`${ DH_API_ROUTE }hired-applicants/${ applicantID }`, {
        success: result => {
            
            /** APPLICANT DETAILS */

            // Set Applicant ID
            setValue('#applicantID', result.applicant_id)

            const applicantFullName = formatName('F M. L, S', {
                firstName: result.first_name,
                middleName: result.middle_name,
                lastName: result.last_name,
                suffixName: result.suffixName
            });

            // Set Applicant Full Name
            setContent('#applicantFullName', applicantFullName);

            // Set Applicant Contact Number
            setContent("#applicantContactNumber", result.contact_number);

            // Set Applicant Email
            setContent("#applicantEmail", result.email);

            // Set Resume Link
            $('#viewResumeBtn').attr('href', `${ URL_RESUME_FILES }${ result.resume }`);


            /** APPLICANT TIMELINE */

            let timelineData = [];

            // Applied
            const createdAt = result.created_at;
            timelineData.push({
                icon: "file-export",
                iconTheme: "primary",
                dateTime: createdAt,
                timelineTitle: 'Applied',
                timelineBody: `
                    <div class="small mb-3">Application was submitted by <b>${ applicantFullName }</b></div>
                    <div class="small text-secondary">${ formatDateTime(createdAt, "Full Date") }</div>
                    <div class="small text-secondary">${ formatDateTime(createdAt, "Time") }</div>
                `
            });

            // Evaluated
            const evaluatedAt = result.evaluated_at;
            const evaluatedBy = result.evaluation_done_by;
            if(!isEmptyOrNull(evaluatedAt) && !isEmptyOrNull(evaluatedBy)) {
                const evaluatedByFullName = formatName('F M. L, S', {
                    firstName: evaluatedBy.first_name,
                    middleName: evaluatedBy.middle_name,
                    lastName: evaluatedBy.last_name,
                    suffixName: evaluatedBy.suffix_name
                });
                timelineData.push({
                    icon: "check",
                    iconTheme: "success",
                    dateTime: evaluatedAt,
                    timelineTitle: 'Evaluated',
                    timelineBody: `
                        <div class="small mb-3">Evaluation was done by <b>${ evaluatedByFullName }</b></div>
                        <div class="small text-secondary">${ formatDateTime(evaluatedAt, "Full Date") }</div>
                        <div class="small text-secondary">${ formatDateTime(evaluatedAt, "Time") }</div>
                    `
                });
            }

            // Screened
            const screenedAt = result.screened_at;
            const screenedBy = result.screening_done_by;
            if(!isEmptyOrNull(screenedAt) && !isEmptyOrNull(screenedBy)) {
                const screenedByFullName = formatName('F M. L, S', {
                    firstName: screenedBy.first_name,
                    middleName: screenedBy.middle_name,
                    lastName: screenedBy.last_name,
                    suffixName: screenedBy.suffix_name
                });
                timelineData.push({
                    icon: "check",
                    iconTheme: "warning",
                    dateTime: screenedAt,
                    timelineTitle: 'Screened',
                    timelineBody: `
                        <div class="small mb-3">Screening was done by <b>${ screenedByFullName }</b></div>
                        <div class="small text-secondary">${ formatDateTime(screenedAt, "Full Date") }</div>
                        <div class="small text-secondary">${ formatDateTime(screenedAt, "Time") }</div>
                    `
                });
            }

            // Hired
            const hiredAt = result.hired_at;
            const hiredBy = result.hiring_done_by;
            if(!isEmptyOrNull(hiredAt) && !isEmptyOrNull(hiredBy)) {
                const hiredByFullName = formatName('F M. L, S', {
                    firstName: hiredBy.first_name,
                    middleName: hiredBy.middle_name,
                    lastName: hiredBy.last_name,
                    suffixName: hiredBy.suffix_name
                });
                timelineData.push({
                    icon: "handshake",
                    iconTheme: "success",
                    dateTime: hiredAt,
                    timelineTitle: 'Hired',
                    timelineBody: `
                        <div class="small mb-3">Hiring was done by <b>${ hiredByFullName }</b></div>
                        <div class="small text-secondary">${ formatDateTime(hiredAt, "Full Date") }</div>
                        <div class="small text-secondary">${ formatDateTime(hiredAt, "Time") }</div>
                    `
                });
            }

            // Rejected
            const status = result.status;
            if(
                status === "Rejected from evaluation" || 
                status === "Rejected from screening"  || 
                status === "Rejected from interview" 
            ) {
                const rejectedAt = result.rejected_at;
                const rejectedBy = result.rejection_done_by;
                if(!isEmptyOrNull(rejectedAt) && !isEmptyOrNull(rejectedBy)) {
                    const rejectedByFullName = formatName('F M. L, S', {
                        firstName: rejectedBy.first_name,
                        middleName: rejectedBy.middle_name,
                        lastName: rejectedBy.last_name,
                        suffixName: rejectedBy.suffix_name
                    });
                    timelineData.push({
                        icon: "times",
                        iconTheme: "danger",
                        dateTime: rejectedAt,
                        timelineTitle: status,
                        timelineBody: `
                            <div class="small mb-3">Applicant was ${ status.toLowerCase() } by <b>${ rejectedByFullName }</b></div>
                            <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                            <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
                        `
                    });
                }
            }

            // Set Applicant Timeline
            setTimeline('#applicantTimeline', {
                title: "Applicant Timeline",
                timelineData: timelineData
            });

            // Remove Applicant Timeline Loader
            hideElement('#applicantTimelineLoader');
            showElement('#applicantTimeline');

            /** Show Modal */
            showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting applicant details')
    });
}


/** Mark Contract as Signed */
const markContractAsSigned = (applicantID) => {
    setValue('#applicantID', applicantID);
    showModal('#uploadSignedContractModal');
}


/** On Upload Signed Contract Modal is going to be hidden */
onHideModal('#uploadSignedContractModal', () => resetForm('#signedContractForm'));


/** Validate Signed Contract Form on submit */
validateForm('#signedContractForm', {
    rules: {
        signedContract: {
            required: true,
            accept: 'application/pdf'
        }
    },
    messages: {
        signedContract: {
            required: "Please upload signed contract of applicant here",
            accept: 'Please upload signed contract in PDF format'
        }
    },
    submitHandler: () => {

        // Set button to loading state
        btnToLoadingState('#submitContractBtn');
        disableElement('#cancelSubmitContractBtn');

        // Generate Form Data
        const formData = generateFormData('#signedContractForm');
        const get = (name) => { return formData.get(name) }

        // Get resume file
        const resume = $('#signedContract')[0].files[0];
        const fd = new FormData();
        fd.append('file', resume);

        // Upload resume
        $.ajax({
            url: `${ DH_API_ROUTE }upload/employment-contract`,
            type: 'POST',
            headers: AJAX_HEADERS,
            processData: false,
            contentType: false,
            data: fd,
            success: result => {

                const data = {
                    applicant_id: get('applicantID'),
                    employment_contract: result.new_file
                }
                
                // Add applicant as onboarding employee
                POST_ajax(`${ DH_API_ROUTE }onboarding-employees`, data, {
                    success: result => {
                        if(result) {

                            // Reload DataTable
                            reloadDataTable('#hiredApplicantsDT');

                            // Hide Modal
                            hideModal('#uploadSignedContractModal');

                            // Set buttons to unload state
                            btnToUnloadState('#submitContractBtn', `
                                <i class="fas fa-file-export mr-1"></i>
                                <span>Submit</span>
                            `);
                            enableElement('#cancelSubmitContractBtn');

                            // Show alert
                            toastr.success('Employment Contact is successfully uploaded')
                        }
                    },
                    error: () => toastr.error('There was an error in uploading signed contract')
                })
            },
            error: () => toastr.error('There was an error in uploading employment contract')
        });
        return false;
    }
})