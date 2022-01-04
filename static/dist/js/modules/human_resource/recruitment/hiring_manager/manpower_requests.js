/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */

/** Manpower Request DataTable */
initDataTable('#manpowerRequestDT', {
    url: `${ ROUTE.API.H }requisitions`,
    enableButtons: true,
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
                    ${ TEMPLATE.SUBTEXT(vacantPosition.department.name) }
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

                var bagdeTheme, badgeIcon;
                let validStatus = true;

                switch(requestStatus) {
                    case "For approval":
                        bagdeTheme = "warning";
                        badgeIcon = "sync-alt";
                        break;
                    case "Approved":
                        bagdeTheme = "success";
                        badgeIcon = "thumbs-up";
                        break;
                    case "Rejected for approval":
                        bagdeTheme = "danger";
                        badgeIcon = "times";
                        break;
                    case "Completed":
                        bagdeTheme = "info";
                        badgeIcon = "check";
                        break;
                    default:
                        validStatus = false
                        break;
                }
                
                return validStatus 
                    ? TEMPLATE.DT.BADGE(bagdeTheme, TEMPLATE.ICON_LABEL(badgeIcon, requestStatus))
                    : TEMPLATE.DT.BADGE('light', 'Undefined')
            }
        },

        // Requested At
        {
            data: null,
            render: data => {
                const createdAt = data.created_at
                return `
                    <div>${ formatDateTime(createdAt, "MMM. D, YYYY") }<div>
                    ${ TEMPLATE.SUBTEXT(fromNow(createdAt)) }
                `
            }
        },

        // Actions
        { 
            data: null,
            render: data => {
                const requisitionID = data.requisition_id;
                return TEMPLATE.DT.OPTIONS(`
                    <a 
                        class="dropdown-item d-flex"
                        href="${ ROUTE.WEB.H }manpower-requests/${ requisitionID }"
                    >
                        <div style="width: 2rem"><i class="fas fa-file-alt mr-1"></i></div>
                        <span>View Request</span>
                    </a>
                `)
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
    GET_ajax(`${ ROUTE.API.H }requisitions/analytics`, {
        success: result => {
            setContent({
                '#totalManpowerRequestsCount':formatNumber(result.total),
                '#forReviewRequestsCount': () => {
                    return result.for_review > 0
                        ? TEMPLATE.ICON_LABEL('exclamation-triangle text-warning', formatNumber(forReviewCount))
                        : 0
                },  
                '#approvedRequestsCount': formatNumber(result.approved),
                '#rejectedRequestsCount': formatNumber(result.rejected)
            });
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
    GET_ajax(`${ ROUTE.API.H }requisitions/${ requisitionID }`, {
        success: result => {

            /** SET MANPOWER REQUEST CONTENTS */

            const requestedBy = result.manpower_request_by;

            // Set Requisition No
            setContent('#requisitionNo', result.requisition_no);

            // Set Requisition ID
            setValue('#requisitionID', result.requisition_id)
            
            // Set Requestor Name
            setContent('#requestorName', formatName("F M. L, S", {
                firstName  : requestedBy.first_name,
                middleName : requestedBy.middle_name,
                lastName   : requestedBy.last_name,
                suffixName : requestedBy.suffix_name
            }));
            
            // Set Requestor Department
            setContent('#requestorDepartment', `${ requestedBy.position.name }, ${ requestedBy.position.department.name }`);
            
            // Set Date Requested
            setContent('#dateRequested', formatDateTime(result.created_at, "DateTime"));
            
            // Set Deadline
            setContent('#deadline', () => {
                const deadline = result.deadline;
                return isEmptyOrNull(deadline)
                    ? TEMPLATE.UNSET('No deadline')
                    : formatDateTime(deadline, "DateTime")
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
                    ? TEMPLATE.UNSET('Salary has not been set')
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
                                firstName  : approvedBy.first_name,
                                middleName : approvedBy.middle_name,
                                lastName   : approvedBy.last_name,
                                suffixName : approvedBy.suffix_name
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
                        firstName  : signedBy.first_name,
                        middleName : signedBy.middle_name,
                        lastName   : signedBy.last_name,
                        suffixName : signedBy.suffix_name
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
                    ? TEMPLATE.UNSET("No status")
                    : formatDateTime(approvedAt, "DateTime")
            });

            // Set Approved At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) 
                    ? TEMPLATE.UNSET("No status")
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
            btnToUnloadState('#submitApproveRequestBtn', TEMPLATE.LABEL_ICON('Yes, approve it!', 'thumbs-up'));
            enableElement('#cancelSignRequestBtn');

            // Hide modal
            hideModal('#confirmSignRequestModal');
        } else if(data.request_status == "Rejected for approval") {
            
            // Buttons to loading state
            btnToLoadingState('#submitRejectRequestBtn', TEMPLATE.LABEL_ICON("Submit", 'check'));
            disableElement('#cancelRejectRequestBtn');

            // Hide modal
            hideModal('#rejectRequestModal');
        }
    }

    PUT_ajax(`${ ROUTE.API.H }requisitions/${ requisitionID }`, data, {
        success: result => {
            if(result) {
                if(data.request_status == "Approved")
                    setSessionedAlertAndRedirect({
                        theme: 'success',
                        message: 'A manpower request is successfully approved',
                        redirectURL: `${ ROUTE.WEB.H }manpower-requests`
                    });
                else if(data.request_status == "Rejected for approval")
                    setSessionedAlertAndRedirect({
                        theme: 'info',
                        message: 'A manpower request has been rejected for approval',
                        redirectURL: `${ ROUTE.WEB.H }manpower-requests`
                    });
            } else ifError()
        },
        error: () => ifError()
    });
}