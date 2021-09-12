/**
 * ==============================================================================
 * JOB POST ANALYTICS
 * ==============================================================================
 */

/** Job Post Analytics */
ifSelectorExist('#jobPostsAnalytics', () => {
    GET_ajax(`${ H_API_ROUTE }job-posts/analytics`, {
        success: result => {

            // Set Total Job Post
            setContent('#totalJobPostsCount', result.total);

            // Set On Going Job Posts
            setContent('#ongoingJobPostsCount', result.on_going);

            // Set Ended Job Posts
            setContent('#endedJobPostsCount', result.ended);
        },
        error: () => toastr.error('There was an error in getting job posts analytics')
    })
});


/**
 * ==============================================================================
 * VIEW ALL JOB POSTS
 * ==============================================================================
 */

/** Initialize Job Posts DataTable */
initDataTable('#jobPostsDT', {
    // debugMode: true,
    url: `${ H_API_ROUTE }job-posts`,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // View Manpower Request
        {
            data: null,
            render: data => {
                return `
                    <button 
                        class="btn btn-sm btn-light btn-block"
                        onclick="viewManpowerRequestDetails('${ data.manpower_request.requisition_id }')"
                    >
                        <i class="fas fa-file-alt mr-1"></i>
                        <span>View request</span>
                    </button
                `
            }
        },

        // Vacant Position
        { data: "manpower_request.vacant_position.name" },

        // Applicants
        {
            data: null,
            render: data => {
                const applicants = data.applicants.length;
                return applicants == 0 
                    ? `<div class="text-secondary font-italic">No applicants yet</div>` 
                    : `${ applicants } applicant${ applicants > 1 ? 's' : '' }`
            }
        },

        // Application Status
        {
            data: null,
            render: data => {
                const expirationDate = data.expiration_date;

                if(isAfterToday(expirationDate) || isEmptyOrNull(expirationDate))
                    return dtBadge('info', 'On Going');
                else if(isBeforeToday(expirationDate))
                    return dtBadge('danger', 'Ended');
                else
                    return dtBadge('warning', 'Last day today');
            }
        },

        // Open until
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const expirationDate = data.expiration_date;

                return isEmptyOrNull(expirationDate)
                    ? `<div class="text-secondary font-italic">No expiration</div>`
                    : `
                        <div>${ formatDateTime(expirationDate, "MMM. D, YYYY") }</div>
                        <div class="small text-secondary">${ fromNow(expirationDate) }</div>
                    `
            }
        },

        // Actions
        {
            data: null,
            render: data => {
                const jobPostID = data.job_post_id;
                const requisitionID = data.manpower_request.requisition_id;

                const applicants = data.applicants.length > 0
                    ? `
                        <a 
                            class="dropdown-item d-flex"
                            href="${ H_WEB_ROUTE }job-posts/${ data.job_post_id }/applicants"
                        >
                            <div style="width: 2rem"><i class="fas fa-users mr-1"></i></div>
                            <div>View Applicants</div>
                        </a>
                    `
                    : '';

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewJobPostDetails('${ jobPostID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Job Post</div>
                            </div>
                            ${ applicants }
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewManpowerRequestDetails('${ requisitionID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-file-alt mr-1"></i></div>
                                <div>View Manpower Request</div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    ]
});


/** View Job Post Details */
const viewJobPostDetails = (jobPostID) => {
    alert(jobPostID)
}

/** View Manpower Reuqest Details */
const viewManpowerRequestDetails = (requisitionID) => {
    GET_ajax(`${ H_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            const requestedBy = result.manpower_request_by;

            // Set Requisition ID
            setValue('#requisitionID', result.requisition_id)
            
            // Set Requestor Name
            setContent('#requestorName', formatName("F M. L, S", {
                firstName: requestedBy.first_name,
                middleName: requestedBy.middle_name,
                lastName: requestedBy.last_name,
                suffixName: requestedBy.suffix_name
            }));
            
            // Set Requestor Department
            setContent('#requestorDepartment', `${ requestedBy.position.name }, ${ requestedBy.position.department.name }`);
            
            // Set Date Requested
            setContent('#dateRequested', formatDateTime(result.created_at, "DateTime"));
            
            // Set Deadline
            setContent('#deadline', () => {
                const deadline = result.deadline;
                if(isEmptyOrNull(deadline)) return `<div class="text-secondary font-italic">No deadline</div>`
                else return formatDateTime(result.deadline, "DateTime")
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
                return isEmptyOrNull(minMonthlySalary) && isEmptyOrNull(maxMonthlySalary) 
                    ? `<div class="text-secondary font-italic">Unset</div>` 
                    : `${ formatCurrency(minMonthlySalary) } - ${ formatCurrency(maxMonthlySalary) }/month`;
            });

            // Set Request Description
            setContent('#requestDescription', result.content);

            // Set Approved By
            setContent('#approvedBy', () => {
                const approvedBy = result.manpower_request_reviewed_by;
                return isEmptyOrNull(approvedBy)
                    ? `<div class="text-secondary font-italic">Not yet approved</div>`
                    : () => {
                        if(result.request_status === "Rejected") {
                            return `<div class="text-danger">This request has been rejected</div>`
                        } else {
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
                    }
            });

            // Set Approved At
            setContent('#approvedAt', () => {
                const approvedAt = result.reviewed_at;
                return (isEmptyOrNull(approvedAt) || result.request_status === 'Rejected') 
                    ? `<div class="text-secondary font-italic">No status</div>`
                    : formatDateTime(approvedAt, "DateTime")
            });

            // Set Approved At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>`
                    : formatDateTime(completedAt, "Date")
            });

            // Set Modal Footer and Other Fields
            const requestStatus = result.request_status;
            var modalFooterBtns;
            
            if(requestStatus === "For Review") {
                showElement('#requestApprovalField');
                modalFooterBtns = `
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button 
                        type="submit" 
                        class="btn btn-success" 
                        id="submitBtn"
                        disabled
                    >
                        <span>Submit</span>
                        <i class="fas fa-check ml-1"></i>
                    </button>
                `;
            } else {
                hideElement('#requestApprovalField');
                modalFooterBtns = `<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`;
            }
            
            setContent('#viewManpowerRequestModalFooter', modalFooterBtns);

            // Show View Manpower Request Modal
            showModal('#viewManpowerRequestModal');
        },
        error: () => {
            toastr.error('There was an error in getting manpower request details')
        }
    });
}