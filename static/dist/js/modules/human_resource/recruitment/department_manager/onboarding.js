/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */

// Get the onboardingEmployeeID from the URL
const onboardingEmployeeID = window.location.pathname.split('/')[3];


/**
 * ==============================================================================
 * ADD ONBOARDING EMPLOYEE
 * ==============================================================================
 */

// Onboarding Tasks Array
let generalOnboardingTasks = [];
let addedOnboardingTasks = [];

// For Add Onboarding Employee Form Validation
let addOnboardingEmployeeFormRules = {
    firstName: {
        required: true
    },
    lastName: {
        required: true
    },
    contactNumber: {
        required: true
    },
    email: {
        required: true,
        email: true
    },
    employmentStartDate: {
        required: true
    }
}
let addOnboardingEmployeeFormMessages = {
    firstName: {
        required: "First name is required"
    },
    lastName: {
        required: "Last name is required"
    },
    contactNumber: {
        required: "Contact number is required"
    },
    email: {
        required: "Email is required",
        email: "This must be a valid email"
    },
    employmentStartDate: {
        required: 'Start of Employment is required'
    }
}

/** Check if no task function */
const checkIfNoTasks = () => generalOnboardingTasks.length == 0 && addedOnboardingTasks.length == 0
    ? disableElement('#addOnboardingEmployeeSubmitBtn')
    : enableElement('#addOnboardingEmployeeSubmitBtn')

/** Get Hired Applicant Details */
ifSelectorExist('#addOnboardingEmployeeForm', () => {

    // Get applicant information
    GET_ajax(`${ DM_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }`, {
        success: result => {

            const onboardingEmployeePosition = result.onboarding_employee_position;

            // Set Position
            setContent('#position', onboardingEmployeePosition.name);
            setValue('#positionID', onboardingEmployeePosition.position_id);

            // Set First Name
            setValue('#firstName', result.first_name);
            
            // Set Middle Name
            setValue('#middleName', result.middle_name);

            // Set Last Name
            setValue('#lastName', result.last_name);

            // Set Suffix Name
            setValue('#suffixName', result.suffix_name);

            // Set Contact Number
            setValue('#contactNumber', result.contact_number);

            // Set Email
            setValue('#email', result.email);

            $('#onboardingEmployeeFormLoader').remove();
            showElement('#onboardingEmployeeForm');
        },
        error: () => toastr.error('There was an error in getting hired onboardingEmployee details')
    });

    // Get general onboarding tasks
    GET_ajax(`${ DM_API_ROUTE }onboarding-tasks/general`, {
        success: result => {
            $('#generalOnboardingTasksDTBody').empty();

            if(result.length > 0) {
                result.forEach(t => {

                    const uniqueSuffix = `${Math.floor(Math.random() * 26)}${Date.now()}`;
                    
                    const startAtInputName = `startAt${ uniqueSuffix }`;
                    const endAtInputName = `endAt${ uniqueSuffix }`;

                    const taskType = () => {
                        const taskType = t.task_type;
                        var theme;
                        if(taskType === "For new employees") theme = "success"
                        else if(taskType === "For the team") theme = "info"
                        else if(taskType === "For department manager") theme = "warning"
                        return `<span class="badge border border-${ theme } text-${ theme }">${ taskType }</span>`
                    }

                    $('#generalOnboardingTasksDTBody').append(`
                        <tr id="generalTaskRow${ uniqueSuffix }">
                            <td>
                                <div>${ t.title }</div>
                                <div>${ taskType() }</div>
                                <div class="small text-secondary">${ t.description }</div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <input 
                                        type="datetime-local" 
                                        class="form-control form-control-border"
                                        style="width: 15rem"
                                        name="${ startAtInputName }"
                                        id="${ startAtInputName }"
                                        required
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <input 
                                        type="datetime-local" 
                                        class="form-control form-control-border"
                                        style="width: 15rem"
                                        name="${ endAtInputName }"
                                        id="${ endAtInputName }"
                                        required
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="text-center dropdown">
                                    <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </div>

                                    <div class="dropdown-menu dropdown-menu-right">
                                        <div 
                                            class="dropdown-item d-flex"
                                            role="button"
                                            onclick="removeGeneralTask('${ uniqueSuffix }')"
                                        >
                                            <div style="width: 2rem"><i class="fas fa-trash-alt mr-1"></i></div>
                                            <span>Remove</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        <tr>
                    `);

                    // Set Validation Rule
                    $(`[name="${ startAtInputName }"]`).rules('add', {
                        required: true,
                        afterToday: true,
                        beforeDateTime: `#${ endAtInputName }`,
                        messages: {
                            required: 'Start date is required',
                            afterToday: 'It must be in the future',
                            beforeDateTime: 'It must be before deadline'
                        }
                    });

                    // Set Validation Rule
                    $(`[name="${ endAtInputName }"]`).rules('add', {
                        required: true,
                        afterToday: true,
                        afterDateTime: `#${ startAtInputName }`,
                        messages: {
                            required: 'Deadline is required',
                            afterToday: 'It must be in the future',
                            afterDateTime: 'It must be after start date'
                        }
                    });


                    generalOnboardingTasks.push({ 
                        id: uniqueSuffix,
                        onboarding_task_id: t.onboarding_task_id
                    });
                });

            } else {
                setContent('#generalOnboardingTasksDTBody', `
                    <tr>
                        <td colspan="4">
                            <div class="py-5 text-center">
                                <h3>No general task yet</h3>
                            </div>
                        </td>
                    </tr>
                `);
            }

            // Call checkIfNoTasks to enable or disable submit button
            checkIfNoTasks();
        },
        error: () => toastr.error('There was an error in getting general onboarding tasks')
    });

    /** Assign Task To For Add Select 2 */
    $('#assignTaskTo').select2({
        placeholder: "Please select for whom the task for",
        minimumResultsForSearch: -1
    });
});

/** Remove General Task */
const removeGeneralTask = (id) => {
    setValue('#generalTaskID', id);
    showModal('#confirmRemoveGeneralTaskModal');
}

/** Validate Confirm Remove General Task Form */
validateForm('#confirmRemoveGeneralTaskForm', {
    rules: {
        generalTaskID: { required: true }
    },
    messages: {
        generalTaskID: { required: 'These filed must have value' }
    },
    submitHandler: () => {
        const generalTaskID = generateFormData('#confirmRemoveGeneralTaskForm').get('generalTaskID');

        hideModal('#confirmRemoveGeneralTaskModal');

        $(`#generalTaskRow${ generalTaskID }`).remove();

        generalOnboardingTasks = generalOnboardingTasks.filter(t => { return t.id != generalTaskID });

        if(generalOnboardingTasks.length == 0) setContent('#generalOnboardingTasksDTBody', `
            <tr>
                <td colspan="4">
                    <div class="py-5 text-center">
                        <h3 class="text-secondary">No general task yet</h3>
                    </div>
                </td>
            </tr>
        `);

        checkIfNoTasks();

        toastr.info('A general task has been removed');
    }
});

/** Initalize Stepper for Add Onboarding Employee */
ifSelectorExist('.bs-stepper', () => {
    document.addEventListener('DOMContentLoaded', () => window.stepper = new Stepper(document.querySelector('.bs-stepper')));
});

/** If next button in applicant information is clicked */
onClick('#nextBtnForApplicantInformation', () => {
    if($('#addOnboardingEmployeeForm').valid()) stepper.next()
});

/** Validate Add Onboarding Task Form */
validateForm('#addOnboardingTaskForm', {
    rules: {
        assignTaskTo: {
            required: true
        },
        taskTitle: {
            required: true
        },
        description: {
            required: true
        }
    },
    messages: {
        assignTaskTo: {
            required: 'Please select to whom is the task for'
        },
        taskTitle: {
            required: 'Task title is required'
        },
        description: {
            required: "Description is required"
        }
    },
    submitHandler: () => {
        const formData = generateFormData('#addOnboardingTaskForm');

        const assignTaskTo = formData.get('assignTaskTo');
        const taskTitle = formData.get('taskTitle');
        const taskDescription = formData.get('description');

        const uniqueSuffix = `${Math.floor(Math.random() * 26)}${Date.now()}`;

        const startAtInputName = `startAt${ uniqueSuffix }`;
        const endAtInputName = `endAt${ uniqueSuffix }`;

        const taskType = () => {
            const taskTheme = {
                "For new employees": "success",
                "For the team": "info",
                "For department manager": "warning"
            }

            return `<span class="badge border border-${ taskTheme[assignTaskTo] } text-${ taskTheme[assignTaskTo] }">${ taskType }</span>`
        }

        if(addedOnboardingTasks.length == 0) $('#addedOnboardingTasksDTBody').empty();

        $('#addedOnboardingTasksDTBody').append(`
            <tr id="addedTaskRow${ uniqueSuffix }">
                <td>
                    <div>${ taskTitle }</div>
                    <div>${ taskType() }</div>
                    <div class="small text-secondary">${ taskDescription }</div>
                </td>
                <td>
                    <div class="form-group">
                        <input 
                            type="datetime-local" 
                            class="form-control form-control-border"
                            style="width: 15rem"
                            name="${ startAtInputName }"
                            id="${ startAtInputName }"
                            required
                        >
                    </div>
                </td>
                <td>
                    <div class="form-group">
                        <input 
                            type="datetime-local" 
                            class="form-control form-control-border"
                            style="width: 15rem"
                            name="${ endAtInputName }"
                            id="${ endAtInputName }"
                            required
                        >
                    </div>
                </td>
                <td>
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="editAddedTask('${ uniqueSuffix }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                                <span>Edit task</span>
                            </div>
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="removeAddedTask('${ uniqueSuffix }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-trash-alt mr-1"></i></div>
                                <span>Remove</span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `);

        // Set Validation Rule
        $(`[name="${ startAtInputName }"]`).rules('add', {
            required: true,
            afterToday: true,
            beforeDateTime: `#${ endAtInputName }`,
            messages: {
                required: 'Start date is required',
                afterToday: 'It must be in the future',
                beforeDateTime: 'It must be before deadline'
            }
        });

        // Set Validation Rule
        $(`[name="${ endAtInputName }"]`).rules('add', {
            required: true,
            afterToday: true,
            afterDateTime: `#${ startAtInputName }`,
            messages: {
                required: 'Deadline is required',
                afterToday: 'It must be in the future',
                afterDateTime: 'It must be after start date'
            }
        });

        // Push Added Task to array
        addedOnboardingTasks.push({
            id: uniqueSuffix,
            task_type: assignTaskTo,
            task_title: taskTitle,
            description: taskDescription
        });

        checkIfNoTasks();

        hideModal('#addOnboardingTaskModal');

        // Show success alert
        toastr.success('Additional onboarding task has been added');

        return false;
    }
});

/** When add onboarding task modal is hidden */
onHideModal('#addOnboardingTaskModal', () => {
    $('#assignTaskTo').val('').trigger('change');
    resetForm('#addOnboardingTaskForm');
});

/** Edit Added Task */
const editAddedTask = (id) => {
    addedOnboardingTasks.forEach(t => {
        if(t.id == id) {
            setValue('#addedTaskID', t.id);
            setValue('#taskTitleForEdit', t.task_title);
            setValue('#descriptionForEdit', t.description);
        }
    });
    showModal('#editAddedOnboardingTaskModal');
}

/** When Edit Added Onboarding Task Modal is going to be hidden */
onHideModal('#editAddedOnboardingTaskModal', () => resetForm('#editAddedOnboardingTaskForm'));

/** Validate Edit Added Onboarding Task Form */
validateForm('#editAddedOnboardingTaskForm', {
    rules: {
        taskTitle: { required: true },
        description: { required: true }
    },
    messages: {
        taskTitle: { required: 'Task Title is required' },
        description: { required: 'Task Description is required' }
    },
    submitHandler: () => {
        return false
    }
});

/** Remove Added Task */
const removeAddedTask = (id) => {
    setValue('#addedTaskIDForRemove', id);
    showModal('#confirmRemoveAddedTaskModal');
}

/** On Confirm Remove Added Task Modal is going to be hidden */
onHideModal('#confirmRemoveAddedTaskModal', () => resetForm('#confirmRemoveAddedTaskModal'));

/** Validate Confirm Remove Task Form */
validateForm('#confirmRemoveAddedTaskForm', {
    rules: {
        addedTaskID: { required: true }
    },
    messages: {
        addedTaskID: { required: 'These field must have value' }
    },
    submitHandler: () => {

        // Get added task ID from the form
        const addedTaskID = generateFormData('#confirmRemoveAddedTaskForm').get('addedTaskIDForRemove');

        // Remove the row from the table
        $(`#addedTaskRow${ addedTaskID }`).remove();

        // Remove the object from the array
        addedOnboardingTasks = addedOnboardingTasks.filter(t => { return t.id != addedTaskID });

        // Set the content if no rows in the table
        if(addedOnboardingTasks.length == 0) setContent('#addedOnboardingTasksDTBody', `
            <tr>
                <td colspan="4">
                    <div class="py-5 text-center">
                        <h3 class="text-secondary">No added tasks yet</h3>
                    </div>
                </td>
            </tr>
        `);

        // Check if no tasks to enable/disable submit button
        checkIfNoTasks();

        // Hide confirm remove added task modal
        hideModal('#confirmRemoveAddedTaskModal');

        // Show info alert
        toastr.info('An added task has been removed');

        // Return false to prevent form from submitting
        return false;
    }
});

/** Validate Add Onboarding Employee Form */
validateForm('#addOnboardingEmployeeForm', {
    rules: addOnboardingEmployeeFormRules,
    messages: addOnboardingEmployeeFormMessages,
    submitHandler: () => {
        showModal('#confirmAddOnboardingEmployeeModal');
        return false;
    }
});

/** If confirm onboarding employee button has been clicked */
onClick('#confirmOnboardingEmployeeBtn', () => {

    // Buttons to loading state
    btnToLoadingState('#confirmOnboardingEmployeeBtn');
    disableElement('#cancelConfirmOnboardingEmployeeBtn');

    // Get form data
    const formData = generateFormData('#addOnboardingEmployeeForm');
    const get = (n) => { return formData.get(n) }

    // Set Data
    const onboardingEmployeeData = {
        first_name: get('firstName'),
        middle_name: get('middleName'),
        last_name: get('lastName'),
        suffix_name: get('suffixName'),
        contact_number: get('contactNumber'),
        email: get('email'),
        employment_start_date: get('employmentStartDate'),
        status: 'Onboarding'
    }

    // Update onboarding employee informations
    PUT_ajax(`${ DM_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }`, onboardingEmployeeData, {
        success: result => {
            if(result) {
                
                // Add general tasks to employee
                if(generalOnboardingTasks.length > 0) generalOnboardingTasks.forEach(t => {
                    
                    // Set General Task Data 
                    const generalTasksData = {
                        onboarding_employee_id: onboardingEmployeeID,
                        onboarding_task_id: t.onboarding_task_id,
                        start_at: get(`startAt${ t.id }`),
                        end_at: get(`endAt${ t.id }`)
                    }

                    // Create onboarding employee task 
                    POST_ajax(
                        `${ DM_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`, 
                            generalTasksData, {
                            success: () => {},
                            error: () => {
                                toastr.error('There was an error in creating onbaording tasks to onboarding employee')
                            }
                        }
                    );
                });

                // Create and add onboarding tasks to employee
                if(addedOnboardingTasks.length > 0) addedOnboardingTasks.forEach(t => {

                    // Set added task data
                    const addedTasksData = {
                        title: t.task_title,
                        description: t.description,
                        task_type: t.task_type,
                        is_general: false
                    }
                    
                    // Create added task
                    POST_ajax(`${ DM_API_ROUTE }onboarding-tasks`, addedTasksData, {
                        success: result2 => {

                            // Set Added employee task data
                            const addedEmployeeTaskData = {
                                onboarding_employee_id: onboardingEmployeeID,
                                onboarding_task_id: result2.data.onboarding_task_id,
                                start_at: get(`startAt${ t.id }`),
                                end_at: get(`endAt${ t.id }`)
                            }

                            // Create added employee task
                            POST_ajax(
                                `${ DM_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`, 
                                addedEmployeeTaskData, 
                                {
                                    success: () => {},
                                    error: () => {
                                        toastr.error('There was an error in creating onbaording tasks to onboarding employee')
                                    }
                                }
                            );
                        },
                        error: () => {
                            toastr.error('There was an error in adding onboarding task');
                        }
                    });
                });

                // Set sessioned alert and redirect
                setSessionedAlertAndRedirect({
                    theme: 'success',
                    message: 'A new onboarding employee has been added',
                    redirectURL: `${ DM_WEB_ROUTE }onboarding-employees`
                });
            }
        },
        error: () => {
            toastr.error('There was an error in adding onboarding employee')
        }
    });
});


/**
 * ==============================================================================
 * ADD GENERAL ONBOARDING TASKS
 * ==============================================================================
 */

/** Add general task */
const addGeneralTask = (taskType = '') => {
    setValue('#taskType', taskType);
    setContent('#onboardingTaskDescription', () => {
        if(taskType === "For new employees")
            return "Add general task for new employees"
        else if(taskType === "For the team")
            return "Add general task for the team"
        else if(taskType === "For department manager")
            return "Add your general task as a department manager here"
    });
    showModal('#addGeneralTaskModal');
}

/** Validate Add General Task Form */
validateForm('#addGeneralTaskForm', {
    rules: {
        taskType: {
            required: true
        },
        taskTitle: {
            required: true
        },
        description: {
            required: true
        }
    },
    messages: {
        taskType: {
            required: 'Task Type must have value'
        },
        taskTitle: {
            required: 'Task title is required'
        },
        description: {
            required: 'Description is required'
        }
    },
    submitHandler: () => {
        addOnboardingTask();
        return false;
    }
});

/** On Add General Onboarding Task Modal is going to be hidden */
onHideModal('#addGeneralTaskModal', () => resetForm('#addGeneralTaskForm'));

/** Add onboarding task */
const addOnboardingTask = () => {
    
    // Set button to loading state
    btnToLoadingState('#addGeneralTaskBtn');
    disableElement('#cancelAddGeneralTaskBtn');

    const get = (n) => { return generateFormData('#addGeneralTaskForm').get(n) }

    const data = {
        title: get('taskTitle'),
        description: get('description'),
        task_type: get('taskType'),
        is_general: true
    }

    POST_ajax(`${ DM_API_ROUTE }onboarding-tasks`, data, {
        success: result => {
            if(result) {

                // Hide General Task Modal
                hideModal('#addGeneralTaskModal');            
                
                // Ste button to unload state
                btnToUnloadState('#addGeneralTaskBtn', `
                    <span>Add</span>
                    <i class="fas fa-plus ml-1"></i>
                `);
                enableElement('#cancelAddGeneralTaskBtn');

                // Reload datatable
                ifSelectorExist('#generalTasksForNewEmployeesDT', () => reloadDataTable('#generalTasksForNewEmployeesDT'));
                ifSelectorExist('#generalTasksForTeamDT', () => reloadDataTable('#generalTasksForTeamDT'));
                ifSelectorExist('#generalTasksForDepartmentManagerDT', () => reloadDataTable('#generalTasksForDepartmentManagerDT'));

                // Show success alert
                toastr.success('A new general onboarding task is successfully added');
            }
        },
        error: () => {

            // Hide add general task modal
            hideModal('#addGeneralTaskModal');            
            
            // Set buttons to unload state
            btnToUnloadState('#addGeneralTaskBtn', `
                <span>Add</span>
                <i class="fas fa-plus ml-1"></i>
            `);
            enableElement('#cancelAddGeneralTaskBtn');

            // Show error alert
            toastr.error('There was an error in adding a general inboarding tasks');
        }
    });
}


/**
 * ==============================================================================
 * GENERAL TASKS
 * ==============================================================================
 */

/** Initialize General Tasks DataTable */
const initGeneralTaskDT = (selector, url) => {
    initDataTable(selector, {
        url: url,
        columns: [
    
            // Created at (Hidden for default sorting)
            { data: 'created_at', visible: false },
    
            // Task Title
            {
                data: null,
                class: 'w-100',
                render: data => {
                    return `
                        <div>${ data.title }</div>
                        <div class="small text-secondary">${ data.description }</div>
                    `
                }
            },
    
            // Date Added
            {
                data: null,
                class: 'text-nowrap',
                render: data => {
                    const dateAdded = data.created_at;
                    return `
                        <div>${ formatDateTime(dateAdded, 'MMM. D, YYYY') }</div>
                        <div class="small text-secondary">${ fromNow(dateAdded) }</div>
                    `
                }
            },

            // Actions
            {
                data: null,
                render: data => {
                    const onboardingTaskID = data.onboarding_task_id;

                    return `
                        <div class="text-center dropdown">
                            <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                                <i class="fas fa-ellipsis-v"></i>
                            </div>

                            <div class="dropdown-menu dropdown-menu-right">
                                <div 
                                    class="dropdown-item d-flex"
                                    role="button"
                                    onclick="viewOnboardingTaskDetails('${ onboardingTaskID }')"
                                >
                                    <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                    <span>View Details</span>
                                </div>
                            </div>
                        </div>
                    `
                }
            }
        ]
    });
}

/** For New Employees DataTable */
ifSelectorExist('#generalTasksForNewEmployeesDT', () => initGeneralTaskDT(
    '#generalTasksForNewEmployeesDT', 
    `${ DM_API_ROUTE }onboarding-tasks/general/for-new-employees`
));

/** For The Team DataTable */
ifSelectorExist('#generalTasksForTeamDT', () => initGeneralTaskDT(
    '#generalTasksForTeamDT', 
    `${ DM_API_ROUTE }onboarding-tasks/general/for-the-team`
));

/** For Department Manager DataTable */
ifSelectorExist('#generalTasksForDepartmentManagerDT', () => initGeneralTaskDT(
    '#generalTasksForDepartmentManagerDT', 
    `${ DM_API_ROUTE }onboarding-tasks/general/for-department-manager`
));

/** View Onboarding Task Details */
const viewOnboardingTaskDetails = (onboardingTaskID) => {
    GET_ajax(`${ DM_API_ROUTE }onboarding-tasks/${ onboardingTaskID }`, {
        success: result => {
            if(result) {
                
                // Set Task title
                setContent('#taskTitle', result.title);

                // Set Task Description
                setContent('#taskDescription', result.description);

                // Set Added By
                setContent('#addedBy', () => {
                    const addedBy = result.onboarding_task_added_by;
                    
                    return formatName('F M. L, S', {
                        firstName: addedBy.first_name,
                        middleName: addedBy.middle_name,
                        lastName: addedBy.last_name,
                        suffixName: addedBy.suffix_name
                    });
                });

                // Set Added At
                setContent('#addedAt', () => {
                    const addedAt = result.created_at;
                    return `
                        <div>${ formatDateTime(addedAt, 'Full Date') }</div>
                        <div>${ formatDateTime(addedAt, 'Time') }</div>
                        <div class="small text-secondary">${ fromNow(addedAt) }</div>
                    `
                });

                // Set Last Updated By
                setContent("#lastUpdatedBy", () => {
                    const updatedBy = result.onboarding_task_updated_by;

                    if(isEmptyOrNull(updatedBy)) {
                        return `<div class="text-secondary font-italic">Not updated yet</div>`
                    } else {
                        return formatName('F M. L, S', {
                            firstName: updatedBy.first_name,
                            middleName: updatedBy.middle_name,
                            lastName: updatedBy.last_name,
                            suffixName: updatedBy.suffix_name
                        });
                    }
                });

                // Set Last Updated At
                setContent("#lastUpdatedAt", () => {
                    const updatedAt = result.updated_at;
                    return `
                        <div>${ formatDateTime(updatedAt, 'Full Date') }</div>
                        <div>${ formatDateTime(updatedAt, 'Time') }</div>
                        <div class="small text-secondary">${ fromNow(updatedAt) }</div>
                    `
                });

                // Show Modal
                showModal('#generalOnboardingTaskDetailsModal');
            }
        },
        error: () => toastr.error('There was an error in getting onboarding task details')
    });
}


/**
 * ==============================================================================
 * ONBOARDING EMPLOYEES
 * ==============================================================================
 */

/** Onboarding employees analytics */
ifSelectorExist('#onboardingEmployeesAnalyticsContainer', () => {
    GET_ajax(`${ DM_API_ROUTE }onboarding-employees/analytics`, {
        success: result => {

            // Set Total Onboarding Employees Count
            setContent('#totalOnboardingEmployeesCount', result.total);
        }, 
        error: () => toastr.error('There was an error in getting onboarding employee analytics')
    });
});

/** Initialize Onboarding Employees DataTable */
initDataTable('#onboardingEmployeesDT', {
    url: `${ DM_API_ROUTE }onboarding-employees`,
    columns: [

        // Created At (Hidden By Default)
        { data: 'created_at', visible: false },

        // Onboarding Employee
        {
            data: null,
            render: data => {
                const fullName = formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffix_name: data.suffix_name
                });

                return `
                    <div>${ fullName }</div>
                    <div class="small text-secondary">${ data.onboarding_employee_position.name }</div>
                `
            }
        },

        // No. of tasks
        {
            data: null,
            render: data => {
                const tasksCount = data.onboarding_employee_tasks.length;
                return `${ tasksCount } task${ tasksCount > 1 ? 's' : '' }`
            }
        },

        // Task Progress
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                let completed = 0;

                const tasks = data.onboarding_employee_tasks;

                tasks.forEach(t => { if(t.status == "Completed") completed++ });

                var taskProgress = ((completed/tasks.length) * 100).toFixed(2);

                var bgColor;
                if(taskProgress <= 25) bgColor = 'danger';
                else if(taskProgress <= 75) bgColor = 'warning';
                else if(taskProgress < 100) bgColor = 'info';
                else if(taskProgress == 100) bgColor = 'success';

                var completeStatus = taskProgress == 100
                    ? `
                        <small>All tasks are completed</small>
                    `
                    : `<small>${ taskProgress }% complete</small>`

                return `
                    <div class="project_progress">
                        <div class="progress progress-sm rounded">
                            <div 
                                class="progress-bar bg-${ bgColor }" 
                                role="progressbar" 
                                aria-valuenow="${ taskProgress }" 
                                aria-valuemin="0" 
                                aria-valuemax="100" 
                                style="width: ${ taskProgress }%"
                            ></div>
                        </div>
                        ${ completeStatus }
                    </div>
                `
            }
        },

        // Action
        {
            data: null,
            render: data => {
                return  `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a 
                                href="${ DM_WEB_ROUTE }onboarding-employees/${ data.onboarding_employee_id }/onboarding-tasks"
                                class="dropdown-item d-flex"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Tasks</div>
                            </a>
                        </div>
                    </div>
                `
            }
        }
    ]
});


/**
 * ==============================================================================
 * ONBOARDING EMPLOYEE TASKS
 * ==============================================================================
 */

/** Assign Task To For Add Select 2 */
ifSelectorExist('#onboardingEmployeeTasksDT', () => $('#assignTaskTo').select2({
    placeholder: "Please select for whom the task for",
    minimumResultsForSearch: -1
}));


/** Initialize Onboarding Employee Tasks DataTable */
initDataTable('#onboardingEmployeeTasksDT', {
    url: `${ DM_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`,
    columns: [

        // Start at (Hidden for default sorting)
        { data: 'start_at', visible: false },

        // Tasks
        {
            data: null,
            class: 'w-100',
            render: data => {
                const task = data.onboarding_task;
                const startAt = data.start_at;
                const deadline = data.end_at;

                const taskType = () => {
                    const taskType = task.task_type;
                    
                    const taskTheme = {
                        "For new employees": "success",
                        "For the team": "info",
                        "For department manager": "warning"
                    }

                    return `<span class="badge border border-${ taskTheme[taskType] } text-${ taskTheme[taskType] }">${ taskType }</span>`
                }

                return `
                    <div>
                        <div>
                            <span>${ task.title }</span>
                            <span class="ml-sm-1">${ taskType() }</span>
                        </div>
                        <div class="small text-secondary mb-3">${ task.description }</div>
                        <div class="small d-flex mb-2">
                            <div class="mr-1">
                                <i class="fas fa-clock text-secondary"></i>
                            </div>
                            <div>
                                <span>${ formatDateTime(startAt, 'DateTime') } - ${ formatDateTime(deadline, 'DateTime') }</span>
                            </div>
                        </div>
                        <div>${ getOnboardingEmployeeTaskStatus(data.status, startAt, deadline, data.completed_at) }</div>
                    </div>
                `
            }
        },

        // Action
        { 
            data: null,
            render: data => {
                const onboardingEmplyeeTaskID = data.onboarding_employee_task_id;

                const markAsCompletedLink = () => {
                    return data.status == "Pending" || data.status == "On Going"
                        ? `
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="changeProgressStatus('${ onboardingEmplyeeTaskID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                                <span>Change Task Progress</span>
                            </div>
                        `
                        : ''
                }

                const deleteTask = () => {
                    return data.status == "Pending"
                        ? `
                            <div class="dropdown-divider"></div>
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="deleteOnboardingEmployeeTask('${ onboardingEmplyeeTaskID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-trash-alt mr-1"></i></div>
                                <span>Delete Task</span>
                            </div>
                        `
                        : ''
                }

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewOnboardingEmployeeTaskDetails('${ onboardingEmplyeeTaskID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View Details</span>
                            </div>
                            ${ markAsCompletedLink() }
                            ${ deleteTask() }
                        </div>
                    </div>
                `
            }
        }
    ]
});

/** Get Onboarding Employee Details */
const getOnboardingEmployeeDetails = () => {
    GET_ajax(`${ DM_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }`, {
        success: result => {

            // Set Employee Full Name
            setContent('#employeeFullName', formatName('F M. L, S', {
                firstName: result.first_name,
                middleName: result.middle_name,
                lastName: result.last_name,
                suffixName: result.suffix_name
            }));

            // Set Employee Position
            setContent('#employeePosition', result.onboarding_employee_position.name);

            // Set Task Progress
            setContent('#taskProgress', () => {
                const tasks = result.onboarding_employee_tasks;

                let pending = 0;
                let onGoing = 0;
                let completed = 0;

                tasks.forEach(t => { 
                    if(t.status === 'Pending') pending++; 
                    if(t.status === 'On Going') onGoing++; 
                    if(t.status === 'Completed') completed++;
                });

                var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
                var donutData = {
                    labels: ['Pending','On Going', 'Completed'],
                    datasets: [
                        {
                            data: [pending, onGoing, completed],
                            backgroundColor : ['#ea580c', '#06b6d4', '#10b981'],
                        }
                    ]
                }
                var donutOptions = {
                    maintainAspectRatio : false,
                    responsive : true,
                }
                new Chart(donutChartCanvas, {
                    type: 'doughnut',
                    data: donutData,
                    options: donutOptions
                });
            });

            // Set Email
            setContent('#employeeEmail', result.email);

            // Set Contact Number
            setContent('#employeeContactNumber', result.contact_number);

            // Set Start of Employment
            setContent('#startOfEmploymentDate', formatDateTime(result.employment_start_date, 'Full Date'));
            setContent('#startOfEmploymentHumanized', fromNow(result.employment_start_date));

            // Remove loader and show container
            $('#onboardingEmployeeDetailsLoader').remove();
            showElement('#onboardingEmployeeDetails');
        },
        error: () => toastr.error('There was an error in getting onboarding employee details')
    });
}

/** Onboarding Employee Details */
ifSelectorExist('#onboardingEmployeeDetails', () => getOnboardingEmployeeDetails());

/** Mark as Completed */
const changeProgressStatus = (onboardingEmployeeTaskID) => {
    GET_ajax(`${ DM_API_ROUTE }onboarding-employee-tasks/${ onboardingEmployeeTaskID }`, {
        success: result => {
            const status = result.status;
            if(status === "Pending") checkElement('#pending');
            if(status === "On Going") checkElement('#onGoing');
            if(status === "Completed") checkElement('#completed');
            setValue('#onboardingEmployeeTaskID', onboardingEmployeeTaskID);
            showModal('#changeTaskStatusModal');
        },
        error: () => toastr.error('There was an error in getting onboarding task details')
    });
}

/** When confirm mark as completed modal was hidden */
onHideModal('#changeTaskStatusModal', () => resetForm('#updateTaskStatusForm'));

/** Validate Form */
validateForm('#updateTaskStatusForm', {
    submitHandler: () => {
        
        // Set buttons to loading state
        btnToLoadingState('#saveOnboardingTaskStatusBtn');
        disableElement('#cancelSaveOnboardingTaskStatusBtn');

        // Generate form data
        const formData = generateFormData('#updateTaskStatusForm');
        const status = formData.get('taskStatus');
        const onboardingEmployeeTaskID = formData.get('onboardingEmployeeTaskID');

        const data = { status: status }

        PUT_ajax(`${ DM_API_ROUTE }onboarding-employee-tasks/${ onboardingEmployeeTaskID }`, data, {
            success: result => {
                if(result) {
                    // Reload DataTable
                    reloadDataTable('#onboardingEmployeeTasksDT');

                    // Reload Onboarding Employee Details
                    getOnboardingEmployeeDetails()

                    // Hide Modal
                    hideModal('#changeTaskStatusModal');

                    // Set buttons to loading state
                    btnToUnloadState('#saveOnboardingTaskStatusBtn', `
                        <span>Save</span>
                        <i class="fas fa-check ml-1"></i>
                    `);
                    enableElement('#cancelSaveOnboardingTaskStatusBtn');

                    // Show alert
                    toastr.info('An onboarding task has been updated successfully')
                } else toastr.error('There was an error in updating onboarding task')
            },
            error: () => toastr.error('There was an error in updating onboarding task')
        });

        return false;
    }
})

/** View Onboarding Employee Task Details */
const viewOnboardingEmployeeTaskDetails = (onboardingEmployeeTaskID) => {
    GET_ajax(`${ DM_API_ROUTE }onboarding-employee-tasks/${ onboardingEmployeeTaskID }`, {
        success: result => {

            console.log(result);

            /** ONBOARDING EMPLOYEE TASK DETAILS */

            const onboardingTask = result.onboarding_task;

            // Task Title
            setContent('#taskTitle', onboardingTask.title);

            // Task Description
            setContent('#taskDescription', onboardingTask.description);

            // Asssigned for
            setContent('#taskType', onboardingTask.task_type);

            // Task Start
            setContent('#taskStart', `
                <div>${ formatDateTime(result.start_at, 'Full Date') }</div>
                <div>${ formatDateTime(result.start_at, 'Time') }</div>
                <div class="small text-secondary">${ fromNow(result.start_at) }</div>
            `);

            // Task End
            setContent('#taskEnd', `
                <div>${ formatDateTime(result.end_at, 'Full Date') }</div>
                <div>${ formatDateTime(result.end_at, 'Time') }</div>
                <div class="small text-secondary">${ fromNow(result.end_at) }</div>
            `);

            // Task Status
            setContent('#taskStatus', () => {
                const status = result.status;
                if(status === "Completed") {
                    return `
                        <div>Completed</div>
                        <div>${ formatDateTime(result.completed_at, 'Full DateTime') }</div>
                        <div class="small text-secondary">${ fromNow(result.completed_at) }</div>
                    `
                } else return status
            });

            // Progress
            setContent('#progress', getOnboardingEmployeeTaskStatus(result.status, result.start_at, result.end_at, result.completed_at));


            /** ONBOARDING EMPLOYEE TASK TIMELINE */
            setOnboardingEmployeeTaskTimeline('#onboardingEmployeeTaskTimeline', result);

            // Set Onboarding Employee Task
            hideElement('#onboardingEmployeeTaskTimelineLoader');
            showElement('#onboardingEmployeeTaskTimeline');
        },
        error: () => toastr.error('There was an error in getting onboarding employee task details')
    })
    showModal('#onboardingEmployeeTaskDetailsModal');
}

/** On Onboarding Employee Task Details Modal has been hidden */
onHideModal('#onboardingEmployeeTaskDetailsModal', () => {
    showElement('#onboardingEmployeeTaskTimelineLoader');
    hideElement('#onboardingEmployeeTaskTimeline');
    $('#taskDetailsTab').tab('show');
});


/** Delete Onboarding Employee Task */
const deleteOnboardingEmployeeTask = (onboardingEmplyeeTaskID) => {
    setValue('#onboardingEmployeeTaskIDForDelete', onboardingEmplyeeTaskID);
    showModal('#deleteOnboardingEmployeeTaskModal');
}

/** Validate Delete Onboarding Employee Task Form */
validateForm('#deleteOnbaordingEmployeeTaskForm', {
    submitHandler: () => {
        
        // Set buttons to loading state
        btnToLoadingState('#deleteOnboardingEmployeeTaskBtn');
        disableElement('#cancelDeleteOnboardingEmployeeTaskBtn');

        const onboardingEmplyeeTaskID = generateFormData('#deleteOnbaordingEmployeeTaskForm').get('onboardingEmployeeTaskID');

        DELETE_ajax(`${ DM_API_ROUTE }onboarding-employee-tasks/${ onboardingEmplyeeTaskID }`, {
            success: result => {
                if(result) {

                    // Reload DataTable
                    reloadDataTable('#onboardingEmployeeTasksDT');

                    // Reload Onboarding Employee Details
                    getOnboardingEmployeeDetails();

                    // Hide Modal
                    hideModal('#deleteOnboardingEmployeeTaskModal');

                    // Set buttons to unload state
                    btnToUnloadState('#deleteOnboardingEmployeeTaskBtn', `
                        <span>Yes, delete it.</span>
                        <i class="fas fa-trash-alt ml-1"></i>
                    `);
                    enableElement('#cancelDeleteOnboardingEmployeeTaskBtn');

                    // Show alert
                    toastr.info('A task is successfully deleted');

                } else toastr.error('There was an error in deleting onboarding employee task')
            },
            error: () => toastr.error('There was an error in deleting onboarding employee task')
        });

        return false;
    }
})



/**
 * ==============================================================================
 * ADD ONBOARDING EMPLOYEE TASKS
 * ==============================================================================
 */

// Validate Add Onboarding Employee Task Form
validateForm('#addOnboardingEmployeeTaskForm', {
    rules: {
        assignTaskTo: {
            required: true
        },
        taskTitle: {
            required: true
        },
        description: {
            required: true
        },
        startAt: {
            required: true,
            afterToday: true,
            beforeDateTime: '#deadline'
        },
        deadline: {
            required: true,
            afterToday: true,
            afterDateTime: '#startAt'
        }

    },
    messages: {
        assignTaskTo: {
            required: 'Please select for whom the task is'
        },
        taskTitle: {
            required: 'Task title is required'
        },
        description: {
            required: 'Task description is required'
        },
        startAt: {
            required: 'Start date and time is required',
            afterToday: 'It must be in the future',
            beforeDateTime: 'It must be before deadline'
        },
        deadline: {
            required: 'Deadline is required',
            afterToday: 'It must be in the future',
            afterDateTime: 'It must be after start date and time'
        }

    },
    submitHandler: () => {

        // Set buttons to loading state
        btnToLoadingState('#addOnboardingEmployeeTaskBtn');
        disableElement('#cancelAddOnboardingEmployeeTaskBtn');
    
        // For getting values in formData
        const get = (n) => { return generateFormData('#addOnboardingEmployeeTaskForm').get(n) }

        // Set Data
        const newOnboardingTaskData = {
            title: get('taskTitle'),
            description: get('description'),
            task_type: get('assignTaskTo'),
            is_general: false
        }
        
        // Add New Onboarding Task
        POST_ajax(`${ DM_API_ROUTE }onboarding-tasks`, newOnboardingTaskData, {
            success: result => {
                if(result) {
                    const onboardingTaskID = result.data.onboarding_task_id;

                    // Set Data
                    const newOnboardingEmployeeTaskData = {
                        onboarding_task_id: onboardingTaskID,
                        start_at: get('startAt'),
                        end_at: get('deadline')
                    }

                    // Add New Onboarding Employee Task
                    POST_ajax(
                        `${ DM_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`, 
                            newOnboardingEmployeeTaskData, {
                            success: result => {
                                if(result) {

                                    // Set buttons to unload state
                                    btnToUnloadState('#addOnboardingEmployeeTaskBtn', `
                                        <span>Add</span>
                                        <i class="fas fa-plus ml-1"></i>
                                    `);
                                    enableElement('#cancelAddOnboardingEmployeeTaskBtn');

                                    // Reload DataTable
                                    reloadDataTable('#onboardingEmployeeTasksDT');

                                    // Reload Onboarding Employee Details
                                    getOnboardingEmployeeDetails()

                                    // Hide Modal
                                    hideModal('#addOnboardingEmployeeTaskModal');

                                    // Show Alert
                                    toastr.success('A new onboarding task is successfully added');
                                } else toastr.error('There was an error in creating onbaording tasks to onboarding employee')
                            },
                            error: () => toastr.error('There was an error in creating onbaording tasks to onboarding employee')
                        }
                    );
                } else toastr.error('There was an error in adding new onboarding task')
            },
            error: () => toastr.error('There was an error in adding new onboarding task')
        });

        return false;
    }
});


// On Add Onboarding Employee Task Modal is going to be hidden
onHideModal('#addOnboardingEmployeeTaskModal', () => {
    $('#assignTaskTo').val('').trigger('change');
    resetForm('#addOnboardingEmployeeTaskForm');
});