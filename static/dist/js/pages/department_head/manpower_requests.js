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
            // console.log(result);

            const positions = result.department_positions;

            let vacantPositionForAdd = $('#vacantPositionForAdd');
            vacantPositionForAdd.empty();
            vacantPositionForAdd.append(`<option></option>`);

            positions.forEach(p => vacantPositionForAdd.append(`<option value="${ p.position_id }">${ p.name }</option>`));

            $('#vacantPositionForAdd').select2({
                placeholder: "Please select a vacant position",
            });
        },
        error: () => {
            toastr.error('There was an error in getting positions')
        }
    })

    /** Request Nature For Add Select 2 */
    $('#requestNatureForAdd').select2({
        placeholder: "Please select the nature of request",
        minimumResultsForSearch: -1,
    });
    
    /** Employment Type For Add Select2 */
    $('#employmentTypeForAdd').select2({
        placeholder: "Please select an employment type",
        minimumResultsForSearch: -1,
    });
    
    /** Request Description For Add Summernote */
    $('#requestDescriptionForAdd').summernote({
        height: 500,
        placeholder: "Write the description of your request here",
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
            ['para', ['ol', 'ul', 'paragraph']],
            ['table', ['table']]
        ]
    });

});


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
            required: 'No. of vacany is required'
        },
        employmentType: {
            required: 'Employment type is required'
        },
        requestDescription: {
            required: 'Job description is required'
        },
    },
    submitHandler:() => {
        showModal('#confirmAddManpowerRequestModal');
        return false
    }
});


/** Submit Manpower Request */
onClick('#confirmAddManpowerRequestBtn', () => {
    const formData = generateFormData('#addManpowerRequestForm');
    
    const minMonthlySalary = formData.get("minSalary");
    const maxMonthlySalary = formData.get("maxSalary");
    const deadline = formData.get("deadline");

    const data = {
        position_id: formData.get('vacantPosition'),
        employment_type: formData.get("employmentType"),
        request_nature: formData.get("requestNature"),
        staffs_needed: parseInt(formData.get("staffsNeeded")),
        min_monthly_salary: nullOrReturnValue(minMonthlySalary, parseFloat(minMonthlySalary)),
        max_monthly_salary: nullOrReturnValue(maxMonthlySalary, parseFloat(maxMonthlySalary)),
        content: formData.get("requestDescription"),
        deadline: nullOrReturnValue(deadline, formatDateTime(deadline))
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
                        if(result.request_status === "Rejected") {
                            return '<div class="text-danger">This request has been rejected</div>'
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
                return isEmptyOrNull(approvedAt) ? "No status" : formatDateTime(approvedAt, "Date")
            });

            // Set Approved At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) ? "No status" : formatDateTime(completedAt, "Date")
            });

            // Show View Manpower Request Modal
            showModal('#viewManpowerRequestModal');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
}



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


/** On Cancel Manpower Request Modal is going to be hidden */
onHideModal('#deleteManpowerRequestModal', () => resetForm('#deleteManpowerRequestForm'));


/** Validate Cancel Manpower Request Form */
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