/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */

/** ManPower Requests DataTable */
initDataTable('#manpowerRequestDT', {
    // debugMode: true,
    url: `${ DH_API_ROUTE }requisitions`,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // Requisition No.
        { data: 'requisition_no', class: 'text-nowrap' },

        // Staffs Needed
        { 
            data: null,
            render: data => {
                staffsNeeded = data.staffs_needed;
                return `
                    <div>${ data.vacant_position.name }</div>
                    <div class="small text-secondary">${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }</div>
                `;
            }
        },

        // Request Nature
        { data: "request_nature"},

        // Request Status
        {
            data: null,
            render: data => {
                const requestStatus = data.request_status;

                var bagdeTheme, badgeIcon, bagdeContent;
                let validStatus = true;
                
                if(requestStatus === "For signature") {
                    bagdeTheme = "secondary";
                    badgeIcon = "file-signature";
                    bagdeContent = requestStatus
                } else if(
                    requestStatus === "For approval" || 
                    requestStatus === "Approved"     || 
                    requestStatus === "Completed"
                ) {
                    bagdeTheme = "success";
                    badgeIcon = "check";
                    bagdeContent = "Signed"
                } else if(
                    requestStatus === "Rejected for signing" || 
                    requestStatus === "Rejected for approval"
                ) {
                    bagdeTheme = "danger";
                    badgeIcon = "times";
                    bagdeContent = requestStatus;
                } else validStatus = false

                return validStatus 
                    ? `<div class="badge badge-${ bagdeTheme } p-2 w-100">
                            <i class="fas fa-${ badgeIcon } mr-1"></i>
                            <span>${ bagdeContent }</span>
                        </div>` 
                    : `<div class="badge badge-light p-2 w-100">Invalid data</div>`
            }
        },

        // Date Requested
        {
            data: null,
            render: data => {
                const createdAt = data.created_at
                return `
                    <div>${ formatDateTime(createdAt, "MMM. D, YYYY") }</div>
                    <div>${ formatDateTime(createdAt, "Time") }</div>
                    <div class="small text-secondary">${ fromNow(createdAt) }</div>
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
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a 
                                class="dropdown-item d-flex"
                                href="${ DH_WEB_ROUTE }manpower-requests/${ requisitionID }"
                            >
                                <div style="width: 2rem"><i class="fas fa-eye mr-1"></i></div>
                                <span>View Request</span>
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
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */

/** View Manpower Request */
ifSelectorExist('#manpowerRequestFormDocument', () => {
    const requisitionID = window.location.pathname.split('/')[3];
    GET_ajax(`${ DH_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            console.log(result);
            const requestedBy = result.manpower_request_by;

            // Set Requisition No
            setContent('#requisitionNo', result.requisition_no);
            
            // Set Requestor Name
            setContent('#requestorName', formatName("L, F M., S", {
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
                if(isEmptyOrNull(deadline)) return `<div class="text-secondary font-italic">No data</div>`
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
                const minSalary = result.min_monthly_salary;
                const maxSalary = result.max_monthly_salary;
                const hasNoSalaryRange = isEmptyOrNull(minSalary) && isEmptyOrNull(maxSalary);
                return hasNoSalaryRange 
                    ? `<div class="text-secondary font-italic">No salary has been set</div>`
                    : `${ formatCurrency(minSalary) } - ${ formatCurrency(maxSalary) }/month`;
            });

            // Set Request Description
            setContent('#requestDescription', result.content);

            // Set Signed By
            setContent('#signedBy', () => {
                const signedBy = result.manpower_request_signed_by;
                
                if(result.request_status === "Rejected for signing")
                    return `<div class="text-danger">This request has been rejected for signing</div>`
                else if(isEmptyOrNull(signedBy) && result.request_status !== "Rejected for signing")
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

            // Set Approved By
            setContent('#approvedBy', () => {
                const approvedBy = result.manpower_request_reviewed_by;
                return isEmptyOrNull(approvedBy) && !(
                        result.request_status === "Rejected for approval" ||
                        result.request_status === "Rejected for signing"
                    )
                    ? `<div class="text-secondary font-italic">Not yet approved</div>`
                    : () => {
                        if(result.request_status === "Rejected for signing")
                            return `<div class="text-danger">This request has been rejected</div>`
                        else if(result.request_status === "Rejected for approval")
                            return `<div class="text-danger">This request has been rejected for approval</div>`
                        else {
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
                const approvedAt = result.approved_at;
                return isEmptyOrNull(approvedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : formatDateTime(approvedAt, "Date")
            });

            // Set Approved At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : formatDateTime(completedAt, "DateTime")
            });

            // Set Manpower Request Timeline
            let timelineData = [];

            const requestStatus = result.request_status;
            const rejectedAt = result.rejectedAt;

            // Created
            const createdAt = result.created_at;
            const createdBy = result.manpower_request_by;
            const createdByFullName = formatName('F M. L, S', {
                firstName: createdBy.first_name,
                middleName: createdBy.middle_name,
                lastName: createdBy.last_name,
                suffixName: createdBy.suffix_name
            });
            timelineData.push({
                icon: "edit",
                iconTheme: "info",
                dateTime: createdAt,
                timelineTitle: 'Created',
                timelineBody: `
                    <div class="small mb-3">This request has been created by <b>${ createdByFullName }</b></div>
                    <div class="small text-secondary">${ formatDateTime(createdAt, "Full Date") }</div>
                    <div class="small text-secondary">${ formatDateTime(createdAt, "Time") }</div>
                `
            });

            // Signed
            const signedAt = result.signed_at;
            if(!isEmptyOrNull(signedAt)) {
                const signedBy = result.manpower_request_signed_by;
                const signedByFullName = formatName('F M. L, S', {
                    firstName: signedBy.first_name,
                    middleName: signedBy.middle_name,
                    lastName: signedBy.last_name,
                    suffixName: signedBy.suffix_name
                })
                timelineData.push({
                    icon: "file-signature",
                    iconTheme: "primary",
                    dateTime: signedAt,
                    timelineTitle: 'Signed',
                    timelineBody: `
                        <div class="small mb-3">This request has been signed by <b>${ signedByFullName }</b></div>
                        <div class="small text-secondary">${ formatDateTime(signedAt, "Full Date") }</div>
                        <div class="small text-secondary">${ formatDateTime(signedAt, "Time") }</div>
                    `
                });
            } else if(requestStatus === "Rejected for signing") {
                const rejectedBy = result.manpower_request_rejected_by;
                const rejectedByFullName = formatName('F M. L, S', {
                    firstName: rejectedBy.first_name,
                    middleName: rejectedBy.middle_name,
                    lastName: rejectedBy.last_name,
                    suffixName: rejectedBy.suffix_name
                });
                timelineData.push({
                    icon: "times",
                    iconTheme: "danger",
                    dateTime: rejectedAt,
                    timelineTitle: 'Rejected',
                    timelineBody: `
                        <div class="small mb-3">This request has been rejected for signing by <b>${ rejectedByFullName }</b></div>
                        <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                        <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
                    `
                });
            }

            // Reviewed and approved
            const reviewedAt = result.reviewed_at;
            if(!isEmptyOrNull(reviewedAt)) {
                const reviewedBy = result.manpower_request_reviewed_by;
                const reviewedByFullName = formatName('F M. L, S', {
                    firstName: reviewedBy.first_name,
                    middleName: reviewedBy.middle_name,
                    lastName: reviewedBy.last_name,
                    suffixName: reviewedBy.suffix_name
                });
                timelineData.push({
                    icon: "thumbs-up",
                    iconTheme: "success",
                    dateTime: reviewedAt,
                    timelineTitle: 'Approved',
                    timelineBody: `
                        <div class="small mb-3">This request has been reviewed and approved by <b>${ reviewedByFullName }</b></div>
                        <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                        <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
                    `
                });
            } else if(requestStatus === "Rejected for approval") {
                const rejectedBy = result.manpower_request_rejected_by;
                const rejectedByFullName = formatName('F M. L, S', {
                    firstName: rejectedBy.first_name,
                    middleName: rejectedBy.middle_name,
                    lastName: rejectedBy.last_name,
                    suffixName: rejectedBy.suffix_name
                });
                timelineData.push({
                    icon: "times",
                    iconTheme: "danger",
                    dateTime: rejectedAt,
                    timelineTitle: 'Rejected',
                    timelineBody: `
                        <div class="small mb-3">This request has been rejected for approval by <b>${ rejectedByFullName }</b></div>
                        <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                        <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
                    `
                });
            }

            setTimeline('#manpowerRequestTimeline', {
                title: "Manpower Request Timeline",
                timelineData: timelineData
            });

            // Show signature form if request status is for signature
            result.request_status === "For signature" ? showElement('#signatureForm') : $('#signatureForm').remove();

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


/**
 * ==============================================================================
 * SIGNING FORM
 * ==============================================================================
 */

/** Validate Signature Form */
validateForm('#signatureForm', {
    submitHandler: () => {
        const requestStatus = generateFormData('#signatureForm').get('requestStatus');

        if(requestStatus == "For approval") 
            showModal('#confirmSignRequestModal');
        else if(requestStatus == "Rejected for signature") 
            showModal('#rejectRequestModal');
        
        return false;
    }
});

/** Sign Requests Form */
validateForm('#signRequestForm', {
    submitHandler: () => {
        
        // Buttons to loading state
        btnToLoadingState('#submitSignRequestBtn');
        disableElement('#cancelSignRequestBtn');

        // Sign Request
        signRequest({
            request_status: 'For approval'
        })
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

        // Sign Request
        signRequest({
            remarks: generateFormData('#rejectRequestForm').get('remarks'),
            request_status: 'Rejected for signing'
        });
        return false;
    }
});

/** Reset form if reject request modal has been hidden */
onHideModal('#rejectRequestModal', () => resetForm('#rejectRequestForm'));

/** Sign Request */
const signRequest = (data) => {
    const requisitionID = window.location.pathname.split('/')[3];

    const ifError = () => {
        if(data.request_status == "For approval") {
    
            // Buttons to unload state
            btnToUnloadState('#submitSignRequestBtn', `
                <span>Yes, sign it!</span>
                <i class="fas fa-file-signature ml-1"></i>
            `);
            enableElement('#cancelSignRequestBtn');

            // Hide modal
            hideModal('#confirmSignRequestModal');
        } else if(data.request_status == "Rejected for signing") {
            
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

    PUT_ajax(`${ DH_API_ROUTE }requisitions/${ requisitionID }/sign`, data, {
        success: result => {
            if(result) {
                if(data.request_status == "For approval")
                    setSessionedAlertAndRedirect({
                        theme: 'success',
                        message: 'A manpower request is successfully signed',
                        redirectURL: `${ DH_WEB_ROUTE }manpower-requests`
                    });
                else if(data.request_status == "Rejected for signing")
                    setSessionedAlertAndRedirect({
                        theme: 'info',
                        message: 'A manpower request has been rejected for signing',
                        redirectURL: `${ DH_WEB_ROUTE }manpower-requests`
                    });
            } else ifError()
        },
        error: () => ifError()
    });
}