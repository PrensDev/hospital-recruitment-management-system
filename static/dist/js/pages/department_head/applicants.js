/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */

/** Get requisition ID from the URL */
const requisitionID = window.location.pathname.split("/")[3];


/** Initialize Hired Applicants DataTable */
initDataTable('#hiredApplicantsDT', {
    // debugMode: true,
    url: `${ D_API_ROUTE }requisitions/hired-applicants/${ requisitionID }`,
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

        // Action
        {
            data: null,
            render: data => {
                const applicantID = data.applicant_id;
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
                            <a 
                                class="dropdown-item d-flex"
                                href="${ D_WEB_ROUTE }add-onboarding-employee/${ applicantID }"
                            >
                                <div style="width: 2rem"><i class="fas fa- mr-1"></i></div>
                                <span>Onboard this applicant</span>
                            </a>
                        </div>
                    </div>
                `
            }
        }
    ]
});