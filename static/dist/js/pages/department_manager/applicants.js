/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */

/** Get requisition ID from the URL */
const requisitionID = window.location.pathname.split("/")[3];


/** Employment Contract Path */
const EMPLOYMENT_CONTRACT_PATH = `${ BASE_URL_WEB }static/app/files/employment_contracts/`;

/**
 * ==============================================================================
 * HIRED APPLICANTS DATATABLE
 * ==============================================================================
 */

/** Initialize Hired Applicants DataTable */
initDataTable('#hiredApplicantsDT', {
    // debugMode: true,
    url: `${ DM_API_ROUTE }hired-applicants`,
    columns: [

        // Updated at (Hidden for default sorting)
        { data: 'created_at', visible: false},

        // Applicant Name
        {
            data: null,
            class: "w-100",
            render: data => {
                const applicantFullName = formatName('F M. L, S', {
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
        { data: 'onboarding_employee_position.name' },

        // Contract Signed at
        {
            data: null,
            render: data => {
                const appliedAt = data.created_at;

                return `
                    <div>${ formatDateTime(appliedAt, 'MMM. D, YYYY') }</div>
                    <div class="small text-secondary">${ fromNow(appliedAt) }</div>
                `
            }
        },

        // Action
        {
            data: null,
            render: data => {
                const onboardingEmployeeID = data.onboarding_employee_id;

                return `
                    <div class="text-center dropdown">
                        <div class="d-block d-md-inline-block btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v d-none d-md-inline-block"></i>
                            <i class="fas fa-ellipsis-h d-md-none mr-1 mr-md-0"></i>
                            <span class="d-md-none">More</span>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewApplicantDetails('${ onboardingEmployeeID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View applicant details</span>
                            </div>
                            <a 
                                href="${ EMPLOYMENT_CONTRACT_PATH + data.employment_contract }"
                                class="dropdown-item d-flex"
                                target="_blank"
                            >
                                <div style="width: 2rem"><i class="fas fa-file-alt mr-1"></i></div>
                                <span>View contract</span>
                            </a>
                            <a 
                                href="${ DM_WEB_ROUTE }onboard-employee/${ onboardingEmployeeID }"
                                class="dropdown-item d-flex"
                            >
                                <div style="width: 2rem"><i class="fas fa-user-tie mr-1"></i></div>
                                <span>Onboard this applicant</span>
                            </a>
                        </div>
                    </div>
                `
            }
        }
    ]
});


/**
 * ==============================================================================
 * APPLICANT DETAILS
 * ==============================================================================
 */

/** View Applicant Details */
const viewApplicantDetails = (onboardingEmployeeID) => {
    GET_ajax(`${ DM_API_ROUTE }hired-applicants/${ onboardingEmployeeID }`, {
        success: result => {

            console.log(result)
            
            /** APPLICANT DETAILS */
            
            // const applicantFullName = formatName('F M. L, S', {
            //     firstName: result.first_name,
            //     middleName: result.middle_name,
            //     lastName: result.last_name,
            //     suffixName: result.suffixName
            // });

            // // Set Applicant Full Name
            // setContent('#applicantFullName', applicantFullName);

            // // Set Applicant Contact Number
            // setContent("#applicantContactNumber", result.contact_number);

            // // Set Applicant Email
            // setContent("#applicantEmail", result.email);

            // // Set Resume Link
            // $('#viewResumeBtn').attr('href', `${ URL_RESUME_FILES }${ result.resume }`);


            // /** APPLICANT TIMELINE */
            // setApplicantTimeline('#applicantTimeline', result);

            // // Remove Applicant Timeline Loader
            // hideElement('#applicantTimelineLoader');
            // showElement('#applicantTimeline');

            // /** Show Modal */
            // showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting applicant details')
    });
}