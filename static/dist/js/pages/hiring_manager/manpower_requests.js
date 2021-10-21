/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */

/** Manpower Request DataTable */
initDataTable('#manpowerRequestDT', {
    url: `${ H_API_ROUTE }requisitions`,
    columns: [
        
        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // Requisition No.
        { data: 'requisition_no', class: 'text-nowrap' },

        // Vacant Position
        {
            data: null,
            render: data => {
                const vacantPosition = data.vacant_position;
                return `
                    <div>${ vacantPosition.name }</div>
                    <div class="small text-secondary">${ vacantPosition.department.name }</div>
                `
            }
        },
        
        // Staffs Needed
        { 
            data: null,
            render: data => {
                staffsNeeded = data.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }`;
            }
        },

        // Request Status
        {
            data: null,
            render: data => {
                const requestStatus = data.request_status;

                var bagdeTheme;
                var badgeIcon;
                let validStatus = true;
                
                if(requestStatus === "For approval") {
                    bagdeTheme = "warning";
                    badgeIcon = "sync-alt";
                } else if(requestStatus === "Approved") {
                    bagdeTheme = "success";
                    badgeIcon = "thumbs-up";
                } else if(requestStatus === "Rejected for approval") {
                    bagdeTheme = "danger";
                    badgeIcon = "times";
                } else if(requestStatus === "Completed") {
                    bagdeTheme = "info";
                    badgeIcon = "check";
                } else validStatus = false

                return validStatus 
                    ? dtBadge(bagdeTheme, `
                        <i class="fas fa-${ badgeIcon } mr-1"></i>
                        <span>${ requestStatus }</span>
                    `)
                    : `<div class="badge badge-light p-2 w-100">Undefined</div>`
            }
        },

        // Requested At
        {
            data: null,
            render: data => {
                const createdAt = data.created_at
                return `
                    <div>${ formatDateTime(createdAt, "MMM. D, YYYY") }<div>
                    <div class="small text-secondary">${ fromNow(createdAt) }<div>
                `
            }
        },

        // Actions
        { 
            data: null,
            render: data => {
                const requisitionID = data.requisition_id;
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a 
                                class="dropdown-item d-flex"
                                href="${ H_WEB_ROUTE }manpower-requests/${ requisitionID }"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View Details</span>
                            </a>
                        </div>
                    </div>
                `
            }
        }
    ],
});


/**
 * ==============================================================================
 * MANPOWER REQUESTS ANALYICS
 * ==============================================================================
 */

/** Manpower Requests Analytics */
const manpowerRequestAnalytics = () => {
    GET_ajax(`${ H_API_ROUTE }requisitions/analytics`, {
        success: result => {
            
            // Set Total Manpower Requests
            setContent('#totalManpowerRequestsCount', formatNumber(result.total));

            // Set For Review Requests
            setContent('#forReviewRequestsCount', () => {
                const forReviewCount = result.for_review;
                return forReviewCount > 0
                    ? `
                        <i class="fas fa-exclamation-triangle text-warning"></i>
                        <span>${ formatNumber(forReviewCount) }</span>
                    `
                    : 0
            });

            // Set Approved Requests
            setContent('#approvedRequestsCount', formatNumber(result.approved));

            // Set Rejected Requests
            setContent('#rejectedRequestsCount', formatNumber(result.rejected));
        },
        error: () => toastr.error('There was an error in getting manpower request analytics')
    });
}

/** Load manpower request analytics if its container exist */
ifSelectorExist('#manpowerRequestAnalytics', () => manpowerRequestAnalytics())


/**
 * ==============================================================================
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */

/** View Manpower Request */
ifSelectorExist('#manpowerRequestDocument', () => {
    const requisitionID = window.location.pathname.split('/')[3];
    GET_ajax(`${ H_API_ROUTE }requisitions/${ requisitionID }`, {
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
            showElement('#manpowerRequestDocument');
            
            // Remove Manpower Request Timeline Loader
            $('#manpowerRequestTimelineLoader').remove();
            showElement('#manpowerRequestTimeline');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
});

/** Reset Update Request Status Form if its modal is going to be hide */
onHideModal('#viewManpowerRequestModal', () => {
    $('#remarksField').hide();
    resetForm('#updateManpowerRequestStatusForm');
});


/**
 * ==============================================================================
 * APPROVAL FORM
 * ==============================================================================
 */

/** Validate Approval Form */
validateForm('#approvalForm', {
    submitHandler: () => {
        const requestStatus = generateFormData('#approvalForm').get('requestStatus');

        if(requestStatus == "Approved")
            showModal('#confirmApproveRequestModal')
        else if(requestStatus == "Rejected for approval")
            showModal('#rejectRequestModal')

        return false;
    }
});

/** Approve Requests Form */
validateForm('#approveRequestForm', {
    submitHandler: () => {
        
        // Buttons to loading state
        btnToLoadingState('#submitApproveRequestBtn');
        disableElement('#cancelApproveRequestBtn');

        // Request Approval
        requestApproval({request_status: 'Approved'});
    }
});

/** Reject Request Form */
validateForm('#rejectRequestForm', {
    rules: { remarks: { required: true }},
    messages: { remarks: { required: 'Remarks is required' }},
    submitHandler: () => {

        // Buttons to loading state
        btnToLoadingState('#submitRejectRequestBtn');
        disableElement('#cancelRejectRequestBtn');

        // Request Approval
        requestApproval({
            remarks: generateFormData('#rejectRequestForm').get('remarks'),
            request_status: 'Rejected for approval'
        });
        return false;
    }
});

/** Reset form if reject request modal has been hidden */
onHideModal('#rejectRequestModal', () => resetForm('#rejectRequestForm'));

/** Update Request For approval */
const requestApproval = (data) => {
    const requisitionID = window.location.pathname.split('/')[3];

    const ifError = () => {
        if(data.request_status == "Approved") {
    
            // Buttons to unload state
            btnToUnloadState('#submitApproveRequestBtn', `
                <span>Yes, approve it!</span>
                <i class="fas fa-thumbs-up ml-1"></i>
            `);
            enableElement('#cancelSignRequestBtn');

            // Hide modal
            hideModal('#confirmSignRequestModal');
        } else if(data.request_status == "Rejected for approval") {
            
            // Buttons to loading state
            btnToLoadingState('#submitRejectRequestBtn', `
                <span>Submit</span>
                <i class="fas fa-check ml-1"></i>
            `);
            disableElement('#cancelRejectRequestBtn');

            // Hide modal
            hideModal('#rejectRequestModal');
        }
    }

    PUT_ajax(`${ H_API_ROUTE }requisitions/${ requisitionID }`, data, {
        success: result => {
            if(result) {
                if(data.request_status == "Approved")
                    setSessionedAlertAndRedirect({
                        theme: 'success',
                        message: 'A manpower request is successfully approved',
                        redirectURL: `${ H_WEB_ROUTE }manpower-requests`
                    });
                else if(data.request_status == "Rejected for approval")
                    setSessionedAlertAndRedirect({
                        theme: 'info',
                        message: 'A manpower request has been rejected for approval',
                        redirectURL: `${ H_WEB_ROUTE }manpower-requests`
                    });
            } else ifError()
        },
        error: () => ifError()
    });
}