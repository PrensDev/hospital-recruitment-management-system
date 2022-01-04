/**
 * ==============================================================================
 * HIRED APPLICANTS
 * ==============================================================================
*/


/** Initialize Hired Applicants DataTable */
initDataTable('#hiredApplicantsDT', {
    url: `${ ROUTE.API.DH }hired-applicants`,
    columns: [
        
        // Created at (for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            class: 'w-100',
            render: data => {
                const applicantFullName = formatName("F M. L, S", {
                    firstName  : data.first_name,
                    middleName : data.middle_name,
                    lastName   : data.last_name,
                    suffixName : data.suffix_name
                });
                return `
                    <div>${ applicantFullName }</div>
                    ${ TEMPLATE.SUBTEXT(data.email) }
                    ${ TEMPLATE.SUBTEXT(data.contact_number) }
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
                    ${ TEMPLATE.SUBTEXT(fromNow(appliedAt)) }
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
                    ${ TEMPLATE.SUBTEXT(fromNow(hiredAt)) }
                `
            }
        },

        // Status
        {
            data: null,
            render: data => {
                switch(data.status) {
                    case "Hired":
                        return TEMPLATE.DT.BADGE('warning', TEMPLATE.ICON_LABEL('file-signature', 'For Signing'))
                    case "Contract signed":
                        return TEMPLATE.DT.BADGE('success', TEMPLATE.ICON_LABEL('check', 'Signed'))
                    default:
                        return TEMPLATE.DT.BADGE('light', 'Invalid data')
                }
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
                            <div style="width: 2rem"><i class="fas fa-check mr-1"></i></div>
                            <span>Mark contract as signed</span>
                        </div>`
                        : ''
                } 

                return TEMPLATE.DT.OPTIONS(`
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
                `);
            }
        },
    ]
});


/** Get Hired Applicant Details */
const getHiredApplicantDetails = (applicantID) => {
    GET_ajax(`${ ROUTE.API.DH }hired-applicants/${ applicantID }`, {
        success: result => {
            
            /** APPLICANT DETAILS */
            
            const applicantFullName = formatName('F M. L, S', {
                firstName  : result.first_name,
                middleName : result.middle_name,
                lastName   : result.last_name,
                suffixName : result.suffixName
            });

            setContent({
                '#applicantFullName': applicantFullName,
                "#applicantContactNumber": result.contact_number,
                "#applicantEmail": result.email
            });

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


/** On Applicant Details Modal was hidden */
onHideModal('#applicantDetailsModal', () => {
    showElement('#applicantTimelineLoader');
    hideElement('#applicantTimeline');
    $('#applicantDetailsTab').tab('show');
});


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
            url: `${ ROUTE.API.DH }upload/employment-contract`,
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
                POST_ajax(`${ ROUTE.API.DH }onboarding-employees`, data, {
                    success: result => {
                        if(result) {

                            // Reload DataTable
                            reloadDataTable('#hiredApplicantsDT');

                            // Hide Modal
                            hideModal('#uploadSignedContractModal');

                            // Set buttons to unload state
                            btnToUnloadState('#submitContractBtn', TEMPLATE.ICON_LABEL('file-export', 'Submit'));
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