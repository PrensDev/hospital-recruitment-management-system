/**
 * ==============================================================================
 * SUBMIT MANPOWER REQUEST
 * ==============================================================================
 */

// Initialize Plugins for Custom Controls
ifSelectorExist('#addManpowerRequestForm', () => {
    
    /** Vacant Position For Add Select2 */
    GET_ajax(`${ D_API_ROUTE }department/positions`, {
        success: result => {
            const positions = result.department_positions;

            let vacantPosition = $('#vacantPosition');
            vacantPosition.empty();
            vacantPosition.append(`<option></option>`);

            positions.forEach(p => vacantPosition.append(`<option value="${ p.position_id }">${ p.name }</option>`));

            $('#vacantPosition').select2({
                placeholder: "Please select a vacant position",
            });
        },
        error: () => {
            toastr.error('There was an error in getting positions')
        }
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
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
            ['para', ['ol', 'ul', 'paragraph']],
            ['table', ['table']]
        ]
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

});

/** On Set Salary Range Change */
onChange('#setDeadline', () => isChecked('#setDeadline') 
    ? showElement('#deadlineField') 
    : hideElement('#deadlineField'))

/** On Set Salary Range Change */
onChange('#setSalaryRange', () => isChecked('#setSalaryRange') 
    ? showElement('#salaryRangeField') 
    : hideElement('#salaryRangeField'))

/** Validate Add Manpower Request Form */
validateForm('#addManpowerRequestForm', {
    rules: {
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
        position_id: get('vacantPosition'),
        employment_type: get("employmentType"),
        request_nature: get("requestNature"),
        staffs_needed: parseInt(get("staffsNeeded")),
        min_monthly_salary: isChecked('#setSalaryRange') ? parseFloat(get("minSalary")) : null,
        max_monthly_salary: isChecked('#setSalaryRange') ? parseFloat(get("maxSalary")) : null,
        content: get("requestDescription"),
        deadline: isChecked('#setDeadline') ? formatDateTime(get("deadline")) : null
    }

    POST_ajax(`${ D_API_ROUTE }requisitions`, data, {
        success: result => {
            if(result) {
                setSessionedAlertAndRedirect({
                    theme: 'success', 
                    message: 'A new request has been submitted', 
                    redirectURL: `${ D_WEB_ROUTE }manpower-requests`
                });
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
    url: `${ D_API_ROUTE }requisitions`,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // Vacant Position
        { data: "vacant_position.name" },

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
                    ? `
                        <div class="badge badge-${ bagdeTheme } p-2 w-100">
                            <i class="fas fa-${ badgeIcon } mr-1"></i>
                            <span>${ requestStatus }</span>
                        </div>
                    ` 
                    : `<div class="badge badge-light p-2 w-100">Undefined</div>`
            }
        },

        // Date Submitted
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
                const requisitionID = data.requisition_id;
                const requestStatus = data.request_status;

                const markAsCompletedBtn = `
                    <div 
                        class="dropdown-item d-flex"
                        data-toggle="modal"
                        data-target="#"
                    >
                        <div style="width: 2rem"><i class="fas fa-check mr-1"></i></div>
                        <span>Mark as Completed</span>
                    </div>
                `;

                const editBtn = `
                    <a 
                        class="dropdown-item d-flex"
                        href="${ D_WEB_ROUTE }edit-manpower-request/${ data.requisition_id }"
                    >
                        <div style="width: 2rem"><i class="fas fa-pen mr-1"></i></div>
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

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewManpowerRequest('${ requisitionID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View</span>
                            </div>

                            ${ requestStatus === "For Review" ? editBtn + cancelBtn : "" }

                            ${ requestStatus === "Approved" ? markAsCompletedBtn : "" }

                            ${ requestStatus === "Rejected" ? deleteBtn : "" }
                        </div>
                    </div>
                `
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
const manpowerRequestAnalytics = () => GET_ajax(`${ D_API_ROUTE }requisitions/analytics`, {
    success: result => {
        
        // Set Total Mapower Requests Count
        setContent('#totalManpowerRequestsCount', formatNumber(result.total));

        // Set Completed Requests
        setContent('#completedRequestsCount', formatNumber(result.completed));

        // Set Approved Requests
        setContent('#approvedRequestsCount', formatNumber(result.approved));

        // Set Rejected Requests
        setContent('#rejectedRequestsCount', formatNumber(result.rejected));
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
const viewManpowerRequest = (requisitionID) => {
    GET_ajax(`${ D_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            // console.log(result);

            const requestedBy = result.manpower_request_by;
            
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

            // Set Modal Footer
            var modalPositiveBtn;
            if(result.request_status === 'For Review') {
                modalPositiveBtn = `
                    <a href="${ D_WEB_ROUTE }edit-manpower-request/${ result.requisition_id }" class="btn btn-info">
                        <span>Edit</span>
                        <i class="fas fa-edit ml-1"></i>
                    </a>
                `
            } else {
                modalPositiveBtn = '';
            }
            setContent('#viewManpowerRequestModalFooter', `
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                ${ modalPositiveBtn }
            `);

            // Show View Manpower Request Modal
            showModal('#viewManpowerRequestModal');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
}


/** 
 * ==============================================================================
 * EDIT MANPOWER REQUEST
 * ==============================================================================
 */

/** If Edit Manpower Request Form Exists */
ifSelectorExist('#editManpowerRequestForm', () => {

    /** Vacant Position For Add Select2 */
    GET_ajax(`${ D_API_ROUTE }department/positions`, {
        success: result => {
            // console.log(result);

            const positions = result.department_positions;

            let vacantPosition = $('#vacantPosition');
            vacantPosition.empty();
            vacantPosition.append(`<option></option>`);

            positions.forEach(p => vacantPosition.append(`<option value="${ p.position_id }">${ p.name }</option>`));

            $('#vacantPosition').select2({
                placeholder: "Please select a vacant position",
            });
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
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
            ['para', ['ol', 'ul', 'paragraph']],
            ['table', ['table']]
        ]
    });

    /** 
     * =====================================================================
     * GET REQUISITION DETAILS
     * =====================================================================
     */

    /** Get requisition ID from the URL */
    const requisitionID = window.location.pathname.split('/')[3];

    /** Get Manpower Request Information */
    GET_ajax(`${ D_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            // console.log(result);

            /** Set Requisition ID */
            setValue('#requisitionID', result.requisition_id);

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

    PUT_ajax(`${ D_API_ROUTE }requisitions/${ requisitionID }`, data, {
        success: result => {
            if(result) {
                setSessionedAlertAndRedirect({
                    theme: 'success', 
                    message: 'A new request has been updated', 
                    redirectURL: `${ D_WEB_ROUTE }manpower-requests`
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
        const formData = generateFormData('#cancelManpowerRequestForm');

        const requisitionID = formData.get('requisitionID');

        DELETE_ajax(`${ D_API_ROUTE }requisitions/${ requisitionID }`, {
            success: result => {
                if(result) {
                    hideModal('#cancelManpowerRequestModal');
                    reloadDataTable('#manpowerRequestDT');
                    manpowerRequestAnalytics();
                    toastr.info('A manpower request is successfully canceled');
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

        DELETE_ajax(`${ D_API_ROUTE }requisitions/${ requisitionID }`, {
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