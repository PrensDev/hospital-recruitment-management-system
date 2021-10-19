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
            class: 'w-100',
            render: data => {
                const applicantFullName = formatName("F M. L, S", {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name
                });
                return `
                    <div>${ applicantFullName }</div>
                    <div class="small text-secondary">${ data.email }</div>
                    <div class="small text-secondary">${ data.contact_number }</div>
                `
            }
        },

        // Position
        { data: 'applied_job.manpower_request.vacant_position.name' },

        // Applied at
        {
            data: null,
            class: 'text-nowrap',
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
            class: 'text-nowrap',
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
                    return data.status === "Hired"
                        ? `<div
                            role="button"
                            class="dropdown-item d-flex"
                            onclick="markContractAsSigned('${ applicantID }')"
                        >
                            <div style="width: 2rem">
                                <i class="fas fa-check mr-1"></i>
                            </div>
                            <span>Mark contract as signed</span>
                        </div>`
                        : ''
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
            setApplicantTimeline('#applicantTimeline', result);

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