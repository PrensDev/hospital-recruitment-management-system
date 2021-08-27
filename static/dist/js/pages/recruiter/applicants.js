/** Initialize Applicanst DataTable */
initDataTable('#applicantsDT', {
    // debugMode: true,
    url: `${ R_API_ROUTE }applicants`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                return formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name,
                })
            }
        },

        // Position
        { data: 'applied_job.manpower_request.vacant_position.name' },

        // Employment Type
        { data: 'applied_job.manpower_request.employment_type' },

        // Date Applied
        {
            data: null,
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, "Date") }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                `
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const status = data.status;
                if(status === "For evaluation") {
                    return dtBadge('warning', `
                        <i class="fas fa-redo mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(status === "For Screening") {
                    return dtBadge('secondary', `
                        <i class="fas fa-user mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(status === "For Interview") {
                    return dtBadge('info', `
                        <i class="fas fa-file-alt mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(status === "Hired") {
                    return dtBadge('success', `
                        <i class="fas fa-check mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(
                    status === "Rejected from evaluation" || 
                    status === "Rejected from screnning" || 
                    status === "Rejected from interview"
                ) {
                    return dtBadge('danger', `
                        <i class="fas fa-redo mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else {
                    return dtBadge('light', `<span>No data</span>`);
                }
            }
        },

        // User Actions
        {
            data: null,
            render: data => {
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex" 
                                role="button" 
                                onclick="viewApplicantDetails('${ data.applicant_id }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Details</div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    ]
});



const viewApplicantDetails = (applicantID) => {
    GET_ajax(`${ R_API_ROUTE }applicants/${ applicantID }`, {
        success: result => {
            console.log(result)
        },
        error: () => {
            toastr.error('There was an error in getting applicant details')
        }
    })
}