/**
 * ==============================================================================
 * MANPOWER REQUESTS
 * ==============================================================================
 */

/** ManPower Requests DataTable */
initDataTable('#manpowerRequestDT', {
    url: `${ ROUTE.API.DH }requisitions`,
    enableButtons: true,
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

                switch(requestStatus) {
                    case "For signature":
                        bagdeTheme = "warning";
                        badgeIcon = "file-signature";
                        bagdeContent = requestStatus
                        break;
                    case "For approval":
                    case "Approved":
                    case "Completed":
                        bagdeTheme = "success";
                        badgeIcon = "check";
                        bagdeContent = "Signed"
                        break;
                    case "Rejected for signing":
                    case "Rejected for approval":
                        bagdeTheme = "danger";
                        badgeIcon = "times";
                        bagdeContent = requestStatus;
                        break;
                    default:
                        validStatus = false
                        break;
                }

                return validStatus 
                    ? TEMPLATE.DT.BADGE(bagdeTheme, TEMPLATE.ICON_LABEL(badgeIcon, bagdeContent))
                    : TEMPLATE.DT.BADGE("light", "Invalid data")
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

                return TEMPLATE.DT.OPTIONS(`
                    <a 
                        class="dropdown-item d-flex"
                        href="${ ROUTE.WEB.DH }manpower-requests/${ requisitionID }"
                    >
                        <div style="width: 2rem"><i class="fas fa-eye mr-1"></i></div>
                        <span>View Request</span>
                    </a>
                `)
            }
        }
    ],
});



/**
 * ==============================================================================
 * MANPOWER REQUESTS ANALYTICS
 * ==============================================================================
 */

/** Manpower Requests Analytics */
const manpowerRequestAnalytics = () => GET_ajax(`${ ROUTE.API.DH }requisitions/analytics`, {
    success: result => {
        if(result) {

            // Set Total Mapower Requests Count
            setContent('#totalManpowerRequestsCount', formatNumber(result.total));

            // For Signature Count
            setContent('#forSignatureCount', () => {
                const forSignatureCount = parseInt(result.for_signature);
                if(forSignatureCount > 0) return `
                    <i class="fas fa-exclamation-triangle text-warning mr-1"></i>
                    <span>${formatNumber(forSignatureCount)}</span>
                ` 
                else return 0
            });

            // Set Signed Requests
            const signedRequests = parseInt(result.for_approval) + parseInt(result.approved) + parseInt(result.completed);
            setContent('#signedRequestsCount', formatNumber(signedRequests));

            // Set Rejected Requests
            setContent('#rejectedRequestsCount', formatNumber(result.rejected.total));
        } else toastr.error('There was an error in getting manpower request analytics')
    },
    error: () => toastr.error('There was an error in getting manpower request analytics')
});

/** Get Manpower Requests Analytics */
ifSelectorExist('#manpowerRequestAnalytics', () => manpowerRequestAnalytics());



/**
 * ==============================================================================
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */

/** View Manpower Request */
ifSelectorExist('#manpowerRequestFormDocument', () => {
    const requisitionID = window.location.pathname.split('/')[3];
    GET_ajax(`${ ROUTE.API.DH }requisitions/${ requisitionID }`, {
        success: result => {

            const requestedBy = result.manpower_request_by;

            // Set Requisition No
            setContent('#requisitionNo', result.requisition_no);
            
            // Set Requestor Name
            setContent('#requestorName', formatName("L, F M., S", {
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
                    ? `<div class="text-secondary font-italic">No data</div>`
                    : formatDateTime(result.deadline, "DateTime")
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
                                firstName  : approvedBy.first_name,
                                middleName : approvedBy.middle_name,
                                lastName   : approvedBy.last_name,
                                suffixName : approvedBy.suffix_name
                            });
                            return `
                                <div>${ approvedByFullName }</div>
                                ${ TEMPLATE.SUBTEXT(`${ approvedBy.position.name }, ${ approvedBy.position.department.name }`) }
                            `
                        }
                    }
            });

            // Set Approved At
            setContent('#approvedAt', () => {
                const approvedAt = result.reviewed_at;
                return isEmptyOrNull(approvedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : formatDateTime(approvedAt, "Date")
            });

            // Set Completed At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : formatDateTime(completedAt, "DateTime")
            });

            // Options
            setContent('#manpowerRequestOptions', () => {
                return `
                    <div class="btn btn-sm btn-secondary btn-block" onclick="printManpowerRequest()">
                        <span>Print Manpower Request Form</span>
                        <i class="fas fa-print ml-1"></i>
                    </div>
                `
            });

            // Set Manpower Request Timeline
            setManpowerRequestTimeline('#manpowerRequestTimeline', result);

            // Show signature form if request status is for signature
            const requestStatus = result.request_status;
            requestStatus === "For signature" ? showElement('#signatureForm') : $('#signatureForm').remove();

            /** MANPOWER REQUEST STATUS */
            if(requestStatus == "Completed") {
                const completedAt = result.completed_at;
                const requestorFullName = formatName("F M. L, S", {
                    firstName: requestedBy.first_name,
                    middleName: requestedBy.middle_name,
                    lastName: requestedBy.last_name,
                    suffixName: requestedBy.suffix_name
                });
                setContent('#manpowerRequestStatus', `
                    <div class="alert border-success">
                        <h5 class="text-success mb-0">This request has been completed</h5>
                        <div class="small text-secondary">Marked by: ${ requestorFullName }, ${ requestedBy.position.name }</div>
                        <div class="small text-secondary">${ formatDateTime(completedAt, 'Full DateTime') } (${ fromNow(completedAt) })</div>
                    </div>
                `)
            } else if(requestStatus == 'Rejected for signing' || requestStatus == 'Rejected for approval') {
                const rejectedBy = result.manpower_request_rejected_by;
                const rejectedByFullName = formatName("F M. L, S", {
                    firstName: rejectedBy.first_name,
                    middleName: rejectedBy.middle_name,
                    lastName: rejectedBy.last_name,
                    suffixName: rejectedBy.suffix_name
                });
                const rejectedAt = result.rejected_at;
                setContent('#manpowerRequestStatus', `
                    <div class="alert border-danger">
                        <h5 class="text-danger mb-0">This request has been ${ result.request_status.toLowerCase() }</h5>
                        <div class="small text-secondary">Marked by: ${ rejectedByFullName }, ${ requestedBy.position.name }</div>
                        <div class="small text-secondary">${ formatDateTime(rejectedAt, 'Full DateTime') } (${ fromNow(rejectedAt) })</div>
                        <div class="mt-3">
                            <div class="font-weight-bold">Details</div>
                            <div class="ml-3 text-justify">${ result.remarks }</div>
                        </div>
                    </div>
                `)
            } else $('#manpowerRequestStatus').remove();
            
            // Remove Manpower Request Document Loader
            $('#manpowerRequestDocumentLoader').remove();
            showElement('#manpowerRequestDocumentContainer');

            // Remove Manpower Request Options Loader
            $('#optionsLoader').remove();
            showElement('#optionsContainer');
            
            // Remove Manpower Request Timeline Loader
            $('#manpowerRequestTimelineLoader').remove();
            showElement('#manpowerRequestTimeline');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
});


/**
 * ==============================================================================
 * PRINT MANPOWER REQUEST FORM
 * ==============================================================================
 */

const printManpowerRequest = () => {
    var manpowerRequestDocument = $("#manpowerRequestDocument").html();
    var w = window.open();
    w.document.write(`
        <!DOCTYPE html>
        <html>
            <title>Manpower Request Document</title>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
                <link rel="stylesheet" href="${BASE_URL_WEB}static/dist/css/adminlte.min.css">
            </head>
            <body onload="window.print()"> ${ manpowerRequestDocument } </body>
        </html>`);
    w.document.close();
    w.print();
    w.onafterprint = () => w.close();
}


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
        signRequest({request_status: 'For approval'})
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

    PUT_ajax(`${ ROUTE.API.DH }requisitions/${ requisitionID }/sign`, data, {
        success: result => {
            if(result) {
                if(data.request_status == "For approval")
                    setSessionedAlertAndRedirect({
                        theme: 'success',
                        message: 'A manpower request is successfully signed',
                        redirectURL: `${ ROUTE.WEB.DH }manpower-requests`
                    });
                else if(data.request_status == "Rejected for signing")
                    setSessionedAlertAndRedirect({
                        theme: 'info',
                        message: 'A manpower request has been rejected for signing',
                        redirectURL: `${ ROUTE.WEB.DH }manpower-requests`
                    });
            } else ifError()
        },
        error: () => ifError()
    });
}