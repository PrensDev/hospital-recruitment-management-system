/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */

/** Initialize Manpower Request DataTable */
initDataTable('#manpowerRequestDT', {
    url: `${ R_API_ROUTE }requisitions`,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // Requisition No.
        { data: 'requisition_no', class: 'text-nowrap'},

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

        // Staff Needed
        {
            data: null,
            render: data => { 
                return `
                    <div>${ data.vacant_position.name }</div>
                    <div class="small text-secondary">${ data.staffs_needed } new staff${ data.staffs_needed > 1 ? 's' : '' }</div>
                `
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const jobPost = data.job_post;

                if(data.request_status === "Completed") {
                    return dtBadge('info', `
                        <i class="fas fa-check mr-1"></i>
                        <span>Completed</span>
                    `);
                } else if(jobPost.length == 1) {
                    return dtBadge('success', `
                        <i class="fas fa-briefcase mr-1"></i>
                        <span>Job post is created</span>
                    `);
                } else {
                    return dtBadge('warning', `
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        <span>No job post yet</span>
                    `);
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
                    ? `<div class="text-secondary font-italic">Unset</div>`
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
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a 
                                class="dropdown-item d-flex" 
                                href="${R_WEB_ROUTE}manpower-requests/${ requisitionID }"
                            >
                                <div style="width: 2rem">
                                    <i class="fas fa-list mr-1"></i>
                                </div>
                                <div>View Details</div>
                            </a>

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
 * MANPOWER REQUESTS ANALYTICS
 * ==============================================================================
 */

// Set Content for Manpower Request Analytics
const manpowerRequestAnalytics = () => {
    GET_ajax(`${ R_API_ROUTE }requisitions/analytics`, {
        success: result => {

            // Set Approved Requests Count
            setContent('#approvedRequestsCount', formatNumber(result.approved_requests));

            // Set With Job Post Count
            setContent('#withJobPostsCount', formatNumber(result.with_job_post));
        },
        error: () => toastr.error('There was an error in getting manpower request analytics')
    });
}

// Manpower Request Analytics
ifSelectorExist('#manpowerRequestAnalytics', () => manpowerRequestAnalytics());


/**
 * ==============================================================================
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */

/** View Manpower Request */
ifSelectorExist('#manpowerRequestDocumentContainer', () => {
    const requisitionID = window.location.pathname.split('/')[3];
    GET_ajax(`${ R_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            
            /** SET MANPOWER REQUEST CONTENTS */

            const requestedBy = result.manpower_request_by;

            // Set Requisition No
            setContent('#requisitionNo', result.requisition_no);

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

            // Set Signed By
            setContent('#signedBy', () => {
                const signedBy = result.manpower_request_signed_by;
                
                if(result.request_status === "Rejected for signing")
                    return `<div class="text-danger">This request has been rejected for signing</div>`
                else if(isEmptyOrNull(signedBy))
                    return `<div class="text-secondary font-italic">Not yet signed</div>`
                else {
                    const signedByFullName = formatName("L, F M., S", {
                        firstName: signedBy.first_name,
                        middleName: signedBy.middle_name,
                        lastName: signedBy.last_name,
                        suffixName: signedBy.suffix_name
                    });
                    return `
                        <div>${ signedByFullName }</div>
                        <div class="small text-secondary">${ signedBy.position.name }, ${ signedBy.position.department.name }</div>
                    `
                }
            });

            // Set Signed At
            setContent('#signedAt', () => {
                const signedAt = result.signed_at;
                return isEmptyOrNull(signedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : `
                        <div class="text-nowrap">${ formatDateTime(signedAt, "Date") }</div>
                        <div class="text-nowrap">${ formatDateTime(signedAt, "Time") }</div>
                    `
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

            if(requestStatus === "Approved" || requestStatus === "Rejected for approval") 
                $('#approvalForm').remove()
            else if(requestStatus == "For approval")
                showElement('#approvalForm');


            /** FOR MANPOWER REQUEST TIMELINE */
            setManpowerRequestTimeline('#manpowerRequestTimeline', result)

            /** REMOVE LOADERS */
            
            // Remove Manpower Request Document Loader
            $('#manpowerRequestDocumentLoader').remove();
            showElement('#manpowerRequestDocumentContainer');
            
            // Remove Manpower Request Timeline Loader
            $('#manpowerRequestTimelineLoader').remove();
            showElement('#manpowerRequestTimeline');

            // Remobe Manpower Request Options Loader
            if(result.job_post.length == 1) {
                $('#optionsLoader').remove();
                $('#optionsContainer').remove();
            } else {
                $('#optionsLoader').remove();
                showElement('#optionsContainer');
            }
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
});

/** Create Job Post */
const createJobPost = (requisitionID) => location.assign(`${ R_WEB_ROUTE }add-job-post/${ requisitionID }`);

const createJobPostFromViewRequest = () => createJobPost(window.location.pathname.split('/')[3]);