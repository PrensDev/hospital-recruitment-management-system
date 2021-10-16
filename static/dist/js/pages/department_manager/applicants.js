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
            render: data => {
                return formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name
                })
            }
        },

        // Position
        { data: 'onboarding_employee_position.name' },

        // Email
        { data: 'email' },

        // Contact Number
        { data: 'contact_number' },

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
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
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
 * VIEW APPLICANT DETAILS
 * ==============================================================================
 */

const viewApplicantDetails = (applicantID) => {
}