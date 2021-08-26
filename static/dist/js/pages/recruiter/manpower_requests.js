/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */

/** Initialize Manpower Request DataTable */
initDataTable('#manpowerRequestDT', {
    // debugMode: true,
    url: `${ R_API_ROUTE }requisitions`,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // Requested By
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const requestedBy = data.manpower_request_by;

                const requestedByFullName = formatName("F M. L, S", {
                    firstName: requestedBy.first_name,
                    middleName: requestedBy.middle_name,
                    lastName: requestedBy.last_name,
                    suffixName: requestedBy.suffix_name
                });

                const requestedByDepartment = requestedBy.position.department.name;

                return `
                    <div>${ requestedByFullName }</div>
                    <div class="small text-secondary">${ requestedByDepartment }</div>
                `
            }
        },

        // Vacant Position
        {
            data: null,
            render: data => { return `<div>${ data.vacant_position.name }</div>` }
        },

        // Staffs Needed
        {
            data: null,
            render: data => {
                staffsNeeded = data.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }`;
            }
        },

        // Request Nature
        {
            data: null,
            render: data => { return `<div>${ data.request_nature }</div>` }
        },

        // Status
        {
            data: null,
            render: data => {
                jobPost = data.job_post

                if(jobPost.length == 1) {
                    jobPost = jobPost[1]
                    return dtBadge('success', 'Job post is created')
                } else {
                    return dtBadge('warning', 'No job post yet')
                }
            }
        },

        // Deadline
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const deadline = data.deadline;
                return isEmptyOrNull(deadline)
                    ? "Unset"
                    : `
                        <div>${ formatDateTime(deadline, "MMM. D, YYYY") }</div>
                        <div class="small text-secondary">${ fromNow(deadline) }</div>
                    `
            }
        },

        // Actions
        {
            data: null,
            render: data => {
                const requisitionID = data.requisition_id;

                const jobPost = data.job_post;

                const createJobPostBtn = jobPost.length == 1 
                    ? "" 
                    : `
                        <div 
                            class="dropdown-item d-flex" 
                            role="button"
                            onclick="createJobPost('${ requisitionID }')"
                        >
                            <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                            <div>Create Job Post</div>
                        </div>
                    `;
                
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-light" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex" 
                                role="button"
                                onclick="viewManpowerRequest('${ requisitionID }')"
                            >
                                <div style="width: 2rem">
                                    <i class="fas fa-list mr-1"></i>
                                </div>
                                <div>View Details</div>
                            </div>

                            ${ createJobPostBtn }
                        </div>
                    </div>
                `
            }
        }
    ]
});


/**
 * ==============================================================================
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */


/** View Manpower Request */
const viewManpowerRequest = (requisitionID) => {
    GET_ajax(`${ R_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            console.log(result);

            const requestedBy = result.manpower_request_by;
            
            // Set Requestor Name
            setContent('#requestorName', formatName("L, F M., S", {
                firstName: requestedBy.first_name,
                middleName: requestedBy.middle_name,
                lastName: requestedBy.last_name,
                suffixName: requestedBy.suffix_name
            }));
            
            // Set Requestor Department
            setContent('#requestorDepartment', requestedBy.position.name);
            
            // Set Date Requested
            setContent('#dateRequested', formatDateTime(result.created_at, "Date"));
            
            // Set Deadline
            setContent('#deadline', () => {
                const deadline = result.deadline;
                if(isEmptyOrNull(deadline)) return "No deadline"
                else return formatDateTime(result.deadline, "Date")
            });

            // Set Requested Position
            setContent('#requestedPosition', result.vacant_position.name);
            
            // Set No. of Staffs Needed
            setContent('#noOfStaffsNeeded', () => {
                const staffsNeeded = result.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }`
            });

            // Set Employment Type
            setContent('#employmentType', result.employment_type);

            // Set Employment Type
            setContent('#employmentType', result.employment_type);

            // Set Request Nature
            setContent('#requestNature', result.request_nature);

            // Set Suggested Salary
            setContent('#suggestedSalary', () => {
                const minMonthlySalary = result.min_monthly_salary;
                const maxMonthlySalary = result.max_monthly_salary;
                const hasNoSalaryRange = isEmptyOrNull(minMonthlySalary) && isEmptyOrNull(maxMonthlySalary);
                return hasNoSalaryRange ? 'Unset' : `P ${ minMonthlySalary } - P ${ maxMonthlySalary }/mon`;
            });

            // Set Request Description
            setContent('#requestDescription', result.content);

            // Set Approved By
            setContent('#approvedBy', () => {
                const approvedBy = result.manpower_request_reviewed_by;
                return isEmptyOrNull(approvedBy)
                    ? "Not yet approved"
                    : () => {
                        const approvedByFullName = formatName("L, F M., S", {
                            firstName: approvedBy.first_name,
                            middleName: approvedBy.middle_name,
                            lastName: approvedBy.last_name,
                            suffixName: approvedBy.suffix_name
                        });
                        return `
                            <div>${ approvedByFullName }</div>
                            <div class="small text-secondary">${ approvedBy.position.name }, ${ approvedBy.position.department.name }</div>
                        `
                    }
            });

            // Set Approved At
            setContent('#approvedAt', () => {
                const approvedAt = result.reviewed_at;
                return isEmptyOrNull(approvedAt) ? "No status" : formatDateTime(approvedAt, "Date")
            });

            // Set Approved At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) ? "No status" : formatDateTime(completedAt, "Date")
            });

            // Set Modal Footer
            if(result.job_post.length == 1){
                setContent('#viewManpowerRequestModalFooter', `<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`)
            } else {
                setContent('#viewManpowerRequestModalFooter', `
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" onclick="createJobPost('${ result.requisition_id }')">
                        <span>Create Job Post</span>
                        <i class="fas fa-pen ml-1"></i>
                    </button>
                `)
            }

            // Show View Manpower Request Modal
            showModal('#viewManpowerRequestModal');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
}


const createJobPost = (requisitionID) => location.assign(`${ R_WEB_ROUTE }add-job-post/${ requisitionID }`)