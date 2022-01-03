/**
 * ==============================================================================
 * SUBMIT MANPOWER REQUEST
 * ==============================================================================
 */

// Initialize Plugins for Custom Controls
ifSelectorExist('#addManpowerRequestForm', () => {
    
    /** Set Requisition No. */
    setValue('#requisitionNo', () => {
        const generateShortUID = () => {
            const id = () => { return ("000" + ((Math.random() * 46656) | 0).toString(36)).slice(-3); }
            return id() + id();
        }
        return (`req-${ Date.now().toString(36) }-${ generateShortUID() }`).toUpperCase(); 
    });

    /** Vacant Position For Add Select2 */
    GET_ajax(`${ ROUTE.API.DM }department/positions`, {
        success: result => {
            if(result) {
                let vacantPosition = $('#vacantPosition');
                vacantPosition.empty();
                vacantPosition.append(`<option></option>`);
                
                result.length > 0
                    ? result.forEach(p => vacantPosition.append(`<option value="${ p.position_id }">${ p.name }</option>`))
                    : vacantPosition.append(`<option disabled>No data</option>`)

                $('#vacantPosition').select2({
                    placeholder: "Please select a vacant position",
                });
            } else toastr.error('There was an error in getting positions')
        },
        error: () => toastr.error('There was an error in getting positions')
    })

    /** Request Nature For Add Select 2 */
    $('#requestNature').select2({
        placeholder: "Please select the nature of request",
        minimumResultsForSearch: -1,
    });
    
    /** Employment Type For Add Select2 */
    $('#employmentType').select2({
        placeholder: "Please select an employment type",
        minimumResultsForSearch: -1,
    });
    
    /** Request Description For Add Summernote */
    $('#requestDescription').summernote({
        height: 500,
        placeholder: "Write the description of your request here",
        toolbar: SUMMERNOTE_TOOLBAR
    });

    
    /** Validate Summernote */
    $('#requestDescription').summernote().on('summernote.change', () => {
        if($('#requestDescription').summernote('isEmpty')) {
            $('#requestDescription').next().addClass('border-danger');
            showElement('#requestDescriptionInvalidFeedback');
            disableElement('#submitBtn');
        } else {
            $('#requestDescription').next().removeClass('border-danger');
            hideElement('#requestDescriptionInvalidFeedback');
            enableElement('#submitBtn');
        }
    });

    /** Remove loader */
    showElement('#addManpowerRequestForm');
    $('#addManpowerRequestFormLoader').remove();
});

/** On Set Salary Range Change */
onChange('#setDeadline', () => showOrHideElement('#deadlineField', isChecked('#setDeadline')))

/** On Set Salary Range Change */
onChange('#setSalaryRange', () => showOrHideElement('#salaryRangeField', isChecked('#setSalaryRange'))) 

/** Validate Add Manpower Request Form */
validateForm('#addManpowerRequestForm', {
    rules: {
        requisitionNo: {
            required: true
        },
        vacantPosition: {
            required: true
        },
        requestNature: {
            required: true
        },
        staffsNeeded: {
            min: 1,
            required: true
        },
        employmentType: {
            required: true
        },
        requestDescription: {
            required: true
        },
        deadline: {
            required: true,
            afterToday: true
        },
        minSalary: {
            required: true,
            number: true,
            min: 1,
            lessThan: "#maxSalary"
        },
        maxSalary: {
            required: true,
            number: true,
            min: 1,
            greaterThan: "#minSalary"
        },
    },
    messages:{
        requisitionNo: {
            required: 'Please reload the page to generate requisition number'
        },
        vacantPosition: {
            required: 'Position is required',
        },
        requestNature: {
            required: 'Nature of request is required'
        },
        staffsNeeded: {
            min: 'The number of staffs must at least 1',
            required: 'Number of staffs is required'
        },
        employmentType: {
            required: 'Employment type is required'
        },
        requestDescription: {
            required: 'Job description is required'
        },
        deadline: {
            required: 'Please select a deadline',
            afterToday: 'Deadline must be in the future'
        },
        minSalary: {
            required: 'Please type the minimum salary here',
            number: "Minimum salary must have a valid value",
            min: "Minimum salary must have a valid value",
            lessThan: "This must be less than the maximum salary"
        },
        maxSalary: {
            required: 'Please type the maximum salary here',
            number: "Maximum salary must have a valid value",
            min: "Maximum salary must have a valid value",
            greaterThan: "This must be greater than the minimum salary"
        }
    },
    submitHandler:() => {
        showModal('#confirmAddManpowerRequestModal');
        return false
    }
});

/** Submit Manpower Request */
onClick('#confirmAddManpowerRequestBtn', () => {
    const formData = generateFormData('#addManpowerRequestForm');
    const get = (n) => { return formData.get(n) }
    
    const data = {
        requisition_no: get('requisitionNo'),
        position_id: get('vacantPosition'),
        employment_type: get("employmentType"),
        request_nature: get("requestNature"),
        staffs_needed: parseInt(get("staffsNeeded")),
        min_monthly_salary: isChecked('#setSalaryRange') ? parseFloat(get("minSalary")) : null,
        max_monthly_salary: isChecked('#setSalaryRange') ? parseFloat(get("maxSalary")) : null,
        content: get("requestDescription"),
        deadline: isChecked('#setDeadline') ? formatDateTime(get("deadline")) : null
    }

    POST_ajax(`${ ROUTE.API.DM }requisitions`, data, {
        success: result => {
            if(result) {
                setSessionedAlertAndRedirect({
                    theme: 'success', 
                    message: 'A new request has been submitted', 
                    redirectURL: `${ ROUTE.WEB.DM }manpower-requests`
                });
            } else {
                hideModal('#confirmAddManpowerRequestModal')
                toastr.error("There was an error in creating manpower request");
            }
        },
        error: () => {
            hideModal('#confirmAddManpowerRequestModal')
            toastr.error("There was an error in creating manpower request");
        }
    });
});


/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */

/** ManPower Requests DataTable */
initDataTable('#manpowerRequestDT', {
    // debugMode: true,
    url: `${ ROUTE.API.DM }requisitions`,
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

                var bagdeTheme, badgeIcon;
                let validStatus = true;
                
                switch(requestStatus) {
                    case "For signature":
                        bagdeTheme = "secondary";
                        badgeIcon = "file-signature";
                        break;
                    case "For approval":
                        bagdeTheme = "warning";
                        badgeIcon = "sync-alt";
                        break;
                    case "Approved":
                        bagdeTheme = "success";
                        badgeIcon = "thumbs-up";
                        break;
                    case "Rejected for signing":
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
                    ${ TEMPLATE.SUBTEXT(fromNow(createdAt)) }
                `
            }
        },

        // Actions
        { 
            data: null,
            render: data => {
                const requisitionID = data.requisition_id;
                const requestStatus = data.request_status;

                const markAsCompletedBtn = `
                    <div 
                        class="dropdown-item d-flex"
                        onclick="markAsCompleted('${ requisitionID }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-check mr-1"></i></div>
                        <span>Mark as Completed</span>
                    </div>
                `;

                const editBtn = `
                    <a 
                        class="dropdown-item d-flex"
                        href="${ ROUTE.WEB.DM }edit-manpower-request/${ data.requisition_id }"
                    >
                        <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                        <span>Edit</span>
                    </a>
                `

                const cancelBtn = `
                    <div 
                        class="dropdown-item d-flex"
                        role="button"
                        onclick="cancelManpowerRequest('${ requisitionID }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-times-circle mr-1"></i></div>
                        <span>Cancel</span>
                    </div>
                `;

                const deleteBtn = `
                    <div 
                        class="dropdown-item d-flex"
                        role="button"
                        onclick="deleteManpowerRequest('${ requisitionID }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-trash-alt mr-1"></i></div>
                        <span>Delete</span>
                    </div>
                `;

                let additionalOptions = "";

                switch(requestStatus) {
                    case "For signature":
                        additionalOptions = editBtn + cancelBtn;
                        break;
                    case "Approved":
                        additionalOptions = markAsCompletedBtn;
                        break;
                    case "Rejected for approval":
                    case "Rejected for signing":
                        additionalOptions = deleteBtn;
                }

                return TEMPLATE.DT.OPTIONS(`
                    <a 
                        class="dropdown-item d-flex"
                        href="${ ROUTE.WEB.DM }manpower-requests/${ requisitionID }"
                    >
                        <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                        <span>View Details</span>
                    </a>
                    ${ additionalOptions }
                `);
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
const manpowerRequestAnalytics = () => GET_ajax(`${ ROUTE.API.DM }requisitions/analytics`, {
    success: result => {
        if(result) {
            setContent({
                '#totalManpowerRequestsCount': formatNumber(result.total),
                '#completedRequestsCount': formatNumber(result.completed),
                '#approvedRequestsCount': formatNumber(result.approved),
                '#rejectedRequestsCount': formatNumber(result.rejected.total)
            });
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

/** Get Manpower Request Details */
const getManpowerRequestDetails = () => {
    const requisitionID = window.location.pathname.split('/')[3];
    GET_ajax(`${ ROUTE.API.DM }requisitions/${ requisitionID }`, {
        success: result => {

            /** MANPOWER REQUEST DETAILS */

            const requestedBy = result.manpower_request_by;
            const requestStatus = result.request_status;

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
            setContent('#dateRequested', `
                <div>${ formatDateTime(result.created_at, "Date") }</div>
                <div>${ formatDateTime(result.created_at, "Time") }</div>
            `);
            
            // Set Deadline
            setContent('#deadline', () => {
                const deadline = result.deadline;
                if(isEmptyOrNull(deadline)) return `<div class="text-secondary font-italic">No data</div>`
                else return `
                    <div>${ formatDateTime(deadline, "Date") }</div>
                    <div>${ formatDateTime(deadline, "Time") }</div>
                `
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
                                ${ TEMPLATE.SUBTEXT(approvedBy.position.name + ', ' + approvedBy.position.department.name) }
                            `
                        }
                    }
            });

            // Set Approved At
            setContent('#approvedAt', () => {
                const approvedAt = result.reviewed_at;
                return isEmptyOrNull(approvedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : `
                        <div class="text-nowrap">${ formatDateTime(approvedAt, "Date") }</div>
                        <div class="text-nowrap">${ formatDateTime(approvedAt, "Time") }</div>
                    `
            });

            // Set Completed At
            const completedAt = result.completed_at;
            setContent('#completedAt', () => {
                return isEmptyOrNull(completedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    :  `
                        <div class="text-nowrap">${ formatDateTime(completedAt, "Date") }</div>
                        <div class="text-nowrap">${ formatDateTime(completedAt, "Time") }</div>
                    `
            });
            
            // Set Manpower Request Options
            setContent('#manpowerRequestOptions', () => {
                const requisitionID = result.requisition_id;

                if(requestStatus === "For signature") {
                    return `
                        <a 
                            class="btn btn-sm btn-info btn-block"
                            href="${ ROUTE.WEB.DM }edit-manpower-request/${ requisitionID }"
                        >
                            ${ TEMPLATE.ICON_LABEL("edit", "Edit Request") }
                        </a>

                        <div class="btn btn-sm btn-warning btn-block" onclick="cancelManpowerRequest('${ requisitionID }')">
                            ${ TEMPLATE.ICON_LABEL("times-circle", "Cancel request") }
                        </div>

                        <hr>

                        <div class="btn btn-sm btn-secondary btn-block" onclick="printManpowerRequest()">
                            ${ TEMPLATE.ICON_LABEL("print", "Print Manpower Request Form") }
                        </div>
                    `
                } else if(requestStatus == "Approved") {
                    $('#cancelManpowerRequestModal').remove();
                    return `
                        <div class="btn btn-sm btn-success btn-block" onclick="markAsCompleted('${ requisitionID }')">
                            ${ TEMPLATE.ICON_LABEL("check-circle", "Mark as Completed") }
                        </div>

                        <hr>

                        <div class="btn btn-sm btn-secondary btn-block" onclick="printManpowerRequest()">
                            ${ TEMPLATE.ICON_LABEL("print", "Print Manpower Request Form") }
                        </div>
                    `
                }  else if(requestStatus == "Completed") {
                    $('#cancelManpowerRequestModal').remove();
                    $('#markAsCompletedModal').remove();
                    return `
                        <div class="btn btn-sm btn-secondary btn-block" onclick="printManpowerRequest()">
                            ${ TEMPLATE.ICON_LABEL("print", "Print Manpower Request Form") }
                        </div>
                        <a href="${ ROUTE.WEB.DM }manpower-requests/${ requisitionID }/report" class="btn btn-sm btn-info btn-block">
                            ${ TEMPLATE.ICON_LABEL("file-alt", "Generate Report") }                            
                        </a>
                    `
                } else {
                    $('#cancelManpowerRequestModal').remove();
                    $('#markAsCompletedModal').remove();
                    return `
                        <div class="btn btn-sm btn-secondary btn-block" onclick="printManpowerRequest()">
                            ${ TEMPLATE.LABEL_ICON("Print Manpower Request Form", "print") }
                        </div>
                    `
                }
            });

            /** MANPOWER REQUEST TIMELINE */
            setManpowerRequestTimeline('#manpowerRequestTimeline', result);
            
            /** MANPOWER REQUEST STATUS */
            if(requestStatus == "Completed") {
                const requestorFullName = formatName("F M. L, S", {
                    firstName  : requestedBy.first_name,
                    middleName : requestedBy.middle_name,
                    lastName   : requestedBy.last_name,
                    suffixName : requestedBy.suffix_name
                });
                setContent('#manpowerRequestStatus', `
                    <div class="alert border-success">
                        <h5 class="text-success mb-0">This request has been completed</h5>
                        ${ TEMPLATE.SUBTEXT(`{ Marked by: ${ requestorFullName }, ${ requestedBy.position.name }`)}
                        ${ TEMPLATE.SUBTEXT(`${ formatDateTime(completedAt, 'Full DateTime') } (${ fromNow(completedAt) })`)}
                    </div>
                `)
            } else if(requestStatus == 'Rejected for signing' || requestStatus == 'Rejected for approval') {
                const rejectedBy = result.manpower_request_rejected_by;
                const rejectedByFullName = formatName("F M. L, S", {
                    firstName  : rejectedBy.first_name,
                    middleName : rejectedBy.middle_name,
                    lastName   : rejectedBy.last_name,
                    suffixName : rejectedBy.suffix_name
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

            // Remove Loaders
            $('#manpowerRequestDocumentLoader').remove();
            showElement('#manpowerRequestDocumentContainer');
            
            $('#optionsLoader').remove();
            showElement('#optionsContainer');

            $('#manpowerRequestTimelineLoader').remove();
            showElement('#manpowerRequestTimeline');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
}

/** View Manpower Request */
ifSelectorExist('#manpowerRequestDocumentContainer', () => getManpowerRequestDetails());

/** Print Manpower Request */
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
 * EDIT MANPOWER REQUEST
 * ==============================================================================
 */

/** If Edit Manpower Request Form Exists */
ifSelectorExist('#editManpowerRequestForm', () => {

    /** Vacant Position For Add Select2 */
    GET_ajax(`${ ROUTE.API.DM }department/positions`, {
        success: result => {
            if(result) {
                let vacantPosition = $('#vacantPosition');
                vacantPosition.empty();
                vacantPosition.append(`<option></option>`);
                
                result.length > 0
                    ? result.forEach(p => vacantPosition.append(`<option value="${ p.position_id }">${ p.name }</option>`))
                    : vacantPosition.append(`<option disabled>No data</option>`)
                
                $('#vacantPosition').select2({
                    placeholder: "Please select a vacant position",
                });
            } else toastr.error('There was an error in getting positions')
        },
        error: () => toastr.error('There was an error in getting positions')
    });

    /** Request Nature For Add Select 2 */
    $('#requestNature').select2({
        placeholder: "Please select the nature of request",
        minimumResultsForSearch: -1,
    });
    
    /** Employment Type For Add Select2 */
    $('#employmentType').select2({
        placeholder: "Please select an employment type",
        minimumResultsForSearch: -1,
    });
    
    /** Request Description For Add Summernote */
    $('#requestDescription').summernote({
        height: 500,
        placeholder: "Write the description of your request here",
        toolbar: SUMMERNOTE_TOOLBAR
    });

    /** 
     * =====================================================================
     * GET REQUISITION DETAILS
     * =====================================================================
     */

    /** Get requisition ID from the URL */
    const requisitionID = window.location.pathname.split('/')[3];

    /** Get Manpower Request Information */
    GET_ajax(`${ ROUTE.API.DM }requisitions/${ requisitionID }`, {
        success: result => {
            if(result) {

                /** Set Requisition ID */
                setValue('#requisitionID', result.requisition_id);

                /** Set Requisition No. */
                setValue('#requisitionNo', result.requisition_no);

                /** Set Vacant Position */
                $('#vacantPosition').val(result.vacant_position.position_id).trigger('change');

                /** Set Nature of Request */
                $('#requestNature').val(result.request_nature).trigger('change');

                /** Set number of staffs */
                setValue('#staffsNeeded', result.staffs_needed);

                /** Set Employment Type */
                $('#employmentType').val(result.employment_type).trigger('change');

                /** Set Deadline */
                const deadline = result.deadline;
                if(!isEmptyOrNull(deadline)) {
                    checkElement('#setDeadline');
                    showElement('#deadlineField');
                    setValue('#deadline', deadline);
                }
    
                /** Set Salary Range */
                const minSalary = result.min_monthly_salary;
                const maxSalary = result.max_monthly_salary;
                if(!(isEmptyOrNull(minSalary) && isEmptyOrNull(maxSalary))) {
                    checkElement('#setSalaryRange');
                    showElement('#salaryRangeField');
                    setValue('#minSalary', minSalary);
                    setValue('#maxSalary', maxSalary);
                }
    
                /** Set Requisition  */
                $('#requestDescription').summernote('code', result.content);
    
                /** Set Date Requested */
                const dateRequested = result.created_at;
                setContent('#dateRequested', `
                    <div>${ formatDateTime(dateRequested, "dddd, MMMM D, YYYY") }</div>
                    <div>${ formatDateTime(dateRequested, "hh:mm A") }</div>
                `);
                setContent('#dateRequestedHumanized', fromNow(dateRequested));
    
                /** Set Last Updated */
                const lastUpdated = result.updated_at;
                setContent('#lastUpdated', `
                    <div>${ formatDateTime(lastUpdated, "dddd, MMMM D, YYYY") }</div>
                    <div>${ formatDateTime(lastUpdated, "hh:mm A") }</div>
                `);
                setContent('#lastUpdatedHumanized', fromNow(lastUpdated));
            } else toastr.error('There was an error in getting manpower request information')
        },
        error: () => toastr.error('There was an error in getting manpower request information')
    });

    /** Validate Summernote */
    $('#requestDescription').summernote().on('summernote.change', () => {
        if($('#requestDescription').summernote('isEmpty')) {
            $('#requestDescription').next().addClass('border-danger');
            showElement('#requestDescriptionInvalidFeedback');
            disableElement('#saveBtn');
        } else {
            $('#requestDescription').next().removeClass('border-danger');
            hideElement('#requestDescriptionInvalidFeedback');
            enableElement('#saveBtn');
        }
    });
    
    /** Remove Loader */
    showElement('#editManpowerRequestForm');
    $('#editManpowerRequestFormLoader').remove();
});

/** Validate Edit Manpower Request Form */
validateForm('#editManpowerRequestForm', {
    rules: {
        requisitionID: {
            required: true
        },
        vacantPosition: {
            required: true,
        },
        requestNature: {
            required: true
        },
        staffsNeeded: {
            min: 1,
            required: true
        },
        employmentType: {
            required: true
        },
        requestDescription: {
            required: true
        },
        deadline: {
            required: true,
            afterToday: true
        },
        minSalary: {
            required: true,
            number: true,
            min: 1,
            lessThan: "#maxSalary"
        },
        maxSalary: {
            required: true,
            number: true,
            min: 1,
            greaterThan: "#minSalary"
        },
    },
    messages:{
        requisitionID: {
            required: 'This must have a value'
        },
        vacantPosition: {
            required: 'Position is required',
        },
        requestNature: {
            required: 'Nature of request is required'
        },
        staffsNeeded: {
            min: 'The number of staffs must at least 1',
            required: 'Number of staffs is required'
        },
        employmentType: {
            required: 'Employment type is required'
        },
        requestDescription: {
            required: 'Job description is required'
        },
        deadline: {
            required: 'Please select a deadline',
            afterToday: 'Deadline must be in the future'
        },
        minSalary: {
            required: 'Please type the minimum salary here',
            number: "Minimum salary must have a valid value",
            min: "Minimum salary must have a valid value",
            lessThan: "This must be less than the maximum salary"
        },
        maxSalary: {
            required: 'Please type the maximum salary here',
            number: "Maximum salary must have a valid value",
            min: "Maximum salary must have a valid value",
            greaterThan: "This must be greater than the minimum salary"
        }
    },
    submitHandler:() => {
        showModal('#confirmEditManpowerRequestModal');
        return false
    }
});

/** Submit Manpower Request */
onClick('#confirmEditManpowerRequestBtn', () => {
    const formData = generateFormData('#editManpowerRequestForm');
    const get = (name) => { return formData.get(name) }
    
    const data = {
        position_id: get('vacantPosition'),
        employment_type: get("employmentType"),
        request_nature: get("requestNature"),
        staffs_needed: parseInt(get("staffsNeeded")),
        min_monthly_salary: isChecked('#setSalary') ? null : parseFloat(get("minSalary")),
        max_monthly_salary: isChecked('#setSalary') ? null : parseFloat(get("maxSalary")),
        content: get("requestDescription"),
        deadline: isChecked('#setDeadlline') ? null : formatDateTime(get("deadline"))
    }

    const requisitionID = get('requisitionID');

    PUT_ajax(`${ ROUTE.API.DM }requisitions/${ requisitionID }`, data, {
        success: result => {
            if(result) {
                setSessionedAlertAndRedirect({
                    theme: 'success', 
                    message: 'A new request has been updated', 
                    redirectURL: `${ ROUTE.WEB.DM }manpower-requests`
                });
            }
        },
        error: () => {
            hideModal('#confirmEditManpowerRequestModal');
            toastr.error("There was an error in creating manpower request");
        }
    });
});


/**
 * ==============================================================================
 * CANCEL MANPOWER REQUEST
 * ==============================================================================
 */

/** Cancel Manpower Request */
const cancelManpowerRequest = (requisitionID) => {
    setValue('#requisitionIDForCancel', requisitionID);
    showModal('#cancelManpowerRequestModal');
}

/** On Cancel Manpower Request Modal is going to be hidden */
onHideModal('#cancelManpowerRequestModal', () => resetForm('#cancelManpowerRequestForm'));

/** Validate Cancel Manpower Request Form */
validateForm('#cancelManpowerRequestForm', {
    rules: { requisitionID: { required: true }},
    messages: { requisitionID: { required: 'Requisition ID should be here' }},
    submitHandler: () => {
        const requisitionID = generateFormData('#cancelManpowerRequestForm').get('requisitionID');

        DELETE_ajax(`${ ROUTE.API.DM }requisitions/${ requisitionID }`, {
            success: result => {
                if(result) {
                    if($('#manpowerRequestDocument').length) {
                        setSessionedAlertAndRedirect({
                            theme: 'info',
                            message: 'A manpower request has been canceled',
                            redirectURL: `${ ROUTE.WEB.DM }manpower-requests`
                        });
                    } else {
                        hideModal('#cancelManpowerRequestModal');
                        reloadDataTable('#manpowerRequestDT');
                        manpowerRequestAnalytics();
                        toastr.info('A manpower request has been canceled');
                    }
                }
            },
            error: () => {
                hideModal('#cancelManpowerRequestModal');
                toastr.error('There was a problem in canceling a manpower request')
            }
        });
    }
});


/** 
 * ==============================================================================
 * DELETE MANPOWER REQUEST
 * ==============================================================================
 */

/** Delete Manpower Request */
const deleteManpowerRequest = (requisitionID) => {
    setValue('#requisitionIDForDelete', requisitionID);
    showModal('#deleteManpowerRequestModal');
}

/** On Delete Manpower Request Modal is going to be hidden */
onHideModal('#deleteManpowerRequestModal', () => resetForm('#deleteManpowerRequestForm'));

/** Validate Delete Manpower Request Form */
validateForm('#deleteManpowerRequestForm', {
    rules: { requisitionID: { required: true }},
    messages: { requisitionID: { required: 'Requisition ID should be here' }},
    submitHandler: () => {
        const formData = generateFormData('#deleteManpowerRequestForm');
        const requisitionID = formData.get('requisitionID');
        DELETE_ajax(`${ ROUTE.API.DM }requisitions/${ requisitionID }`, {
            success: result => {
                if(result) {
                    hideModal('#deleteManpowerRequestModal');
                    reloadDataTable('#manpowerRequestDT');
                    manpowerRequestAnalytics();
                    toastr.info('A manpower request is successfully deleted');
                }
            },
            error: () => {
                hideModal('#deleteManpowerRequestModal');
                toastr.error('There was a problem in deleting a manpower request');
            }
        });
    }
});


/**
 * ==============================================================================
 * MARK AS COMPLETED
 * ==============================================================================
 */

/** Mark Manpower Request as Completed */
const markAsCompleted = (requisitionID) => {
    setValue('#requisitionIDForCompletion', requisitionID);
    showModal('#markAsCompletedModal');
}

/** On mark as completed modal is going to be hidden */
onHideModal('#markAsCompletedModal', () => resetForm('#markAsCompletedForm'));

/** Validate Form */
validateForm('#markAsCompletedForm', {
    submitHandler: () => {

        // Set buttons to loading state
        btnToLoadingState('#confirmMarkAsCompletedBtn');
        disableElement('#cancelMarkAsCompletedBtn');

        // Get the requisition ID
        const requisitionID = generateFormData('#markAsCompletedForm').get('requisitionID');

        // Call if error
        const ifError = () => {
            hideModal('#markAsCompletedModal');
            toastr.error('There was an error while updating manpower request details');
        }

        // Update details
        PUT_ajax(`${ ROUTE.API.DM }requisitions/${ requisitionID }/complete`, {}, {
            success: result => {
                if(result) {

                    /** If Manpower Request Document Container Exists */
                    ifSelectorExist('#manpowerRequestDocumentContainer', () => getManpowerRequestDetails());

                    /** If Manpower Request Document Container Exists */
                    ifSelectorExist('#manpowerRequestDocumentContainer', () => reloadDataTable('#manpowerRequestDT'));

                    // Hide Modal
                    hideModal('#markAsCompletedModal');

                    // Set buttons to unload state
                    btnToUnloadState('#confirmMarkAsCompletedBtn', `
                        <span>Yes, mark it.</span>
                        <i class="fas fa-check-circle ml-1"></i>
                    `);
                    enableElement('#cancelMarkAsCompletedBtn');

                    // Show alert
                    toastr.info('A manpower request is successfully updated');
                } else ifError()
            },
            error: () => ifError()
        })

        return false;
    }
});