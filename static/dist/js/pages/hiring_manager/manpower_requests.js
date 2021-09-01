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

        // Request Nature
        { data: "request_nature"},

        // Request Status
        {
            data: null,
            render: data => {
                const requestStatus = data.request_status;

                var bagdeTheme;
                var badgeIcon;
                let validStatus = true;
                
                if(requestStatus === "For Review") {
                    bagdeTheme = "warning";
                    badgeIcon = "redo";
                } else if(requestStatus === "Approved") {
                    bagdeTheme = "success";
                    badgeIcon = "check";
                } else if(requestStatus === "Rejected") {
                    bagdeTheme = "danger";
                    badgeIcon = "times";
                } else if(requestStatus === "Completed") {
                    bagdeTheme = "blue";
                    badgeIcon = "thumbs";
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
                    <div>${ formatDateTime(createdAt, "DateTime") }<div>
                    <div class="small text-secondary">${ fromNow(createdAt) }<div>
                `
            }
        },

        // Actions
        { 
            data: null,
            render: data => {
                requisitionID = data.requisition_id
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                onclick="viewManpowerRequest('${ requisitionID }')"
                                role="button"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View Details</span>
                            </div>
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
            setContent('#forReviewRequestsCount', formatNumber(result.for_review));

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
const viewManpowerRequest = (requisitionID) => {
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
            // else if(requestStatus === "Approved") {
            //     $('#approveRequest').prop('checked', true);
            //     modalFooterBtns = `
            //         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            //         <button 
            //             type="submit" 
            //             class="btn btn-info"
            //             id="updateBtn"
            //             disabled
            //         >
            //             <span>Update</span>
            //             <i class="fas fa-check ml-1"></i>
            //         </button>
            //     `
            // } else if(requestStatus === "Rejected") {
            //     $('#rejectRequest').prop('checked', true);
            //     $('#remarksField').show();
            //     setValue('#remarks', result.remarks);
            //     modalFooterBtns = `
            //         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            //         <button 
            //             type="submit" 
            //             class="btn btn-info"
            //             id="updateBtn"
            //             disabled
            //         >
            //             <span>Update</span>
            //             <i class="fas fa-check ml-1"></i>
            //         </button>
            //     `
            // }
            
            setContent('#viewManpowerRequestModalFooter', modalFooterBtns);

            // Show View Manpower Request Modal
            showModal('#viewManpowerRequestModal');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
}

/** Reset Update Request Status Form if its modal is going to be hide */
onHideModal('#viewManpowerRequestModal', () => {
    $('#remarksField').hide();
    resetForm('#updateManpowerRequestStatusForm');
});


/**
 * ==============================================================================
 * UPDATE MANPOWER REQUEST STATUS
 * ==============================================================================
 */

/** If user select reject for manpower request */
$("#approveRequest, #rejectRequest").on('change', () => {
    const requestStatus = $(`input[name="requestStatus"]:checked`).val();
    if(requestStatus == "Approved") $("#remarksField").hide();
    if(requestStatus == "Rejected") $("#remarksField").show();

    ifSelectorExist('#updateBtn', () => enableElement('#updateBtn'));
    ifSelectorExist('#submitBtn', () => enableElement('#submitBtn'));
});

/** Validate Manpower Request */
validateForm('#updateManpowerRequestStatusForm', {
    rules: {
        requestStatus: {
            required: true
        },
        remarks: {
            required: true
        }
    }, 
    messages: {
        requestStatus: {
            required: 'Please select an option'
        },
        remarks: {
            required: 'Please type your reason in rejecting this request'
        }
    },
    submitHandler: () => updateManpowerRequestStatus()
});

/** Update Manpower Request Status */
const updateManpowerRequestStatus = () => {
    const formData = generateFormData('#updateManpowerRequestStatusForm');

    const requestStatus = formData.get('requestStatus');
    let remarks = formData.get('remarks');

    remarks = requestStatus === "Approved" ? null : remarks;

    const data = {
        request_status: requestStatus,
        remarks: remarks,
        reviewed_at: moment().format()
    }

    const requisitionID = formData.get('requisitionID');

    PUT_ajax(`${ H_API_ROUTE }requisitions/${ requisitionID }`, data, {
        success: result => {
            if(result) {
                // Reload the DataTable
                reloadDataTable('#manpowerRequestDT');

                // Hide the modal
                hideModal('#viewManpowerRequestModal');

                // Reload Manpower Request Analytics
                manpowerRequestAnalytics();

                // Show alert
                if(requestStatus == 'Approved')
                    toastr.success('A manpower request has been approved successfully');
                else if(requestStatus == 'Rejected')
                    toastr.info('A manpower request has been rejected successfully');
            }
        },
        error: () => toastr.error('There was a problem while updating a manpower request')
    })
}