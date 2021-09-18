/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */

/** Get requisition ID from the URL */
const requisitionID = window.location.pathname.split("/")[3];


/**
 * ==============================================================================
 * HIRED APPLICANTS DATATABLE
 * ==============================================================================
 */

/** Initialize Hired Applicants DataTable */
initDataTable('#hiredApplicantsDT', {
    // debugMode: true,
    url: `${ DM_API_ROUTE }requisitions/hired-applicants/${ requisitionID }`,
    columns: [

        // Updated at (Hidden for default sorting)
        { data: 'updated_at', visible: false},

        // Applicant
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

        // Email
        { data: 'email' },

        // Contact Number
        { data: 'contact_number' },

        // Date Applied
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

        // Status
        {
            data: null,
            render: data => {
                const status = data.status;
                if(status === "Hired") return dtBadge('success', status);
                else if(status === "Onboarding") return dtBadge('info', status);
                else return dtBadge('light', `Invalid Data`);
            }
        },

        // Action
        {
            data: null,
            render: data => {
                const applicantID = data.applicant_id;

                const onboardEmployeeLink = () => {
                    return data.status === "Hired"
                        ? `
                            <a 
                                class="dropdown-item d-flex"
                                href="${ DM_WEB_ROUTE }add-onboarding-employee/${ applicantID }"
                            >
                                <div style="width: 2rem"><i class="fas fa-user-tie mr-1"></i></div>
                                <span>Onboard this applicant</span>
                            </a>
                        `
                        : ''
                }

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewApplicantDetails('${ applicantID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View applicant details</span>
                            </div>
                            ${ onboardEmployeeLink() }
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
    alert(applicantID);
}