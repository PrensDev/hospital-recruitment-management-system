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
const checkIfNoTasks = () => {
    generalOnboardingTasks.length == 0 && addedOnboardingTasks.length == 0
        ? disableElement('#addOnboardingEmployeeSubmitBtn')
        : enableElement('#addOnboardingEmployeeSubmitBtn')
}

// Get the applicantID from the URL
const applicantID = window.location.pathname.split('/')[3];

/** Get Hired Applicant Details */
ifSelectorExist('#addOnboardingEmployeeForm', () => {

    // Get applicant information
    GET_ajax(`${ D_API_ROUTE }hired-applicants/${ applicantID }`, {
        success: result => {

            const applicant = result.applicant;

            // Set Position
            setContent('#position', result.position.name);
            setValue('#positionID', result.position.position_id);

            // Set First Name
            setValue('#firstName', applicant.first_name);
            
            // Set Middle Name
            setValue('#middleName', applicant.middle_name);

            // Set Last Name
            setValue('#lastName', applicant.last_name);

            // Set Suffix Name
            setValue('#suffixName', applicant.suffix_name);

            // Set Contact Number
            setValue('#contactNumber', applicant.contact_number);

            // Set Email
            setValue('#email', applicant.email);

            $('#applicantInfoFormLoader').remove();
            showElement('#applicantInfoForm');
        },
        error: () => toastr.error('There was an error in getting hired applicant details')
    });

    // Get general onboarding tasks
    GET_ajax(`${ D_API_ROUTE }onboarding-tasks/general`, {
        success: result => {
            $('#generalOnboardingTasksDTBody').empty();

            if(result.length > 0) {
                result.forEach(t => {

                    const uniqueSuffix = `${Math.floor(Math.random() * 26)}${Date.now()}`;
                    
                    const startAtInputName = `startAt${ uniqueSuffix }`;
                    const endAtInputName = `endAt${ uniqueSuffix }`;

                    $('#generalOnboardingTasksDTBody').append(`
                        <tr id="generalTaskRow${ uniqueSuffix }">
                            <td>
                                <div>${ t.title }</div>
                                <div class="small text-secondary">${ t.description }</div>
                            </td>
                            <td>
                                <input 
                                    type="datetime-local" 
                                    class="form-control form-control-border"
                                    style="width: 15rem"
                                    name="${ startAtInputName }"
                                    required
                                >
                            </td>
                            <td>
                                <input 
                                    type="datetime-local" 
                                    class="form-control form-control-border"
                                    style="width: 15rem"
                                    name="${ endAtInputName }"
                                    required
                                >
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

                    addOnboardingEmployeeFormRules[startAtInputName] = {
                        required: true
                    }
                    
                    addOnboardingEmployeeFormMessages[startAtInputName] = {
                        required: 'Start Date is required'
                    }

                    addOnboardingEmployeeFormRules[endAtInputName] = {
                        required: true
                    }

                    addOnboardingEmployeeFormMessages[endAtInputName] = {
                        required: 'Deadline is required'
                    }

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
});

/** Remove General Task */
const removeGeneralTask = (id) => {
    setValue('#generalTaskID', id);
    showModal('#confirmRemoveGeneralTaskModal');
}

/** Validate Confirm Remove General Task Form */
validateForm('#confirmRemoveGeneralTaskForm', {
    rules: {
        generalTaskID: {
            required: true
        }
    },
    messages: {
        generalTaskID: {
            required: 'These filed must have value'
        }
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
    document.addEventListener('DOMContentLoaded', function () {
        window.stepper = new Stepper(document.querySelector('.bs-stepper'))
    });
});

/** If next button in applicant information is clicked */
onClick('#nextBtnForApplicantInformation', () => {
    if($('#addOnboardingEmployeeForm').valid()) stepper.next()
});

/** Validate Add Onboarding Task Form */
validateForm('#addOnboardingTaskForm', {
    rules: {
        taskTitle: {
            required: true
        },
        description: {
            required: true
        }
    },
    messages: {
        taskTitle: {
            required: 'Task title is required'
        },
        description: {
            required: "Description is required"
        }
    },
    submitHandler: () => {
        const formData = generateFormData('#addOnboardingTaskForm');
        const taskTitle = formData.get('taskTitle');
        const taskDescription = formData.get('description');

        const uniqueSuffix = `${Math.floor(Math.random() * 26)}${Date.now()}`;

        const startAtInputName = `startAt${ uniqueSuffix }`;
        const endAtInputName = `endAt${ uniqueSuffix }`;

        if(addedOnboardingTasks.length == 0) $('#addedOnboardingTasksDTBody').empty();

        $('#addedOnboardingTasksDTBody').append(`
            <tr id="addedTaskRow${ uniqueSuffix }">
                <td>
                    <div>${ taskTitle }</div>
                    <div class="small text-secondary">${ taskDescription }</div>
                </td>
                <td>
                    <input 
                        type="datetime-local" 
                        class="form-control form-control-border"
                        style="width: 15rem"
                        name="${ startAtInputName }"
                        required
                    >
                </td>
                <td>
                    <input 
                        type="datetime-local" 
                        class="form-control form-control-border"
                        style="width: 15rem"
                        name="${ endAtInputName }"
                        required
                    >
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

        addOnboardingEmployeeFormRules[startAtInputName] = {
            required: true
        }

        addOnboardingEmployeeFormMessages[startAtInputName] = {
            required: 'Start Date is reqired'
        }

        addOnboardingEmployeeFormRules[endAtInputName] = {
            required: true
        }

        addOnboardingEmployeeFormMessages[endAtInputName] = {
            required: 'Deadline is required'
        }

        addedOnboardingTasks.push({
            id: uniqueSuffix,
            task_title: taskTitle,
            description: taskDescription
        });

        checkIfNoTasks();

        hideModal('#addOnboardingTaskModal');

        return false;
    }
});

/** When add onbaording task modal is hidden */
onHideModal('#addOnboardingTaskModal', () => resetForm('#addOnboardingTaskForm'));

/** Remove Added Task */
const removeAddedTask = (id) => {
    setValue('#addedTaskID', id);
    showModal('#confirmRemoveAddedTaskModal');
}

/** On Confirm Remove Added Task Modal is going to be hidden */
onHideModal('#confirmRemoveAddedTaskModal', () => resetForm('#confirmRemoveAddedTaskModal'));

/** Validate Confirm Remove Task Form */
validateForm('#confirmRemoveAddedTaskForm', {
    rules: {
        addedTaskID: {
            required: true
        }
    },
    messages: {
        addedTaskID: {
            required: 'These filed must have value'
        }
    },
    submitHandler: () => {

        // Get added task ID from the form
        const addedTaskID = generateFormData('#confirmRemoveAddedTaskForm').get('addedTaskID');
        
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

    const formData = generateFormData('#addOnboardingEmployeeForm');
    const get = (n) => { return formData.get(n) }

    const onboardingEmployeeData = {
        first_name: get('firstName'),
        middle_name: get('middleName'),
        last_name: get('lastName'),
        suffix_name: get('suffixName'),
        contact_number: get('contactNumber'),
        email: get('email'),
        position_id: get('positionID'),
        employment_start_date: get('employmentStartDate')
    }

    // Add onboarding employee
    POST_ajax(`${ D_API_ROUTE }onboarding-employees`, onboardingEmployeeData, {
        success: result => {
            if(result) {
                const onboardingEmployeeID = result.data.onboarding_employee_id;
                
                // Add general tasks to employee
                if(generalOnboardingTasks.length > 0) generalOnboardingTasks.forEach(t => {
                    let generalTasksData = {
                        onboarding_employee_id: onboardingEmployeeID,
                        onboarding_task_id: t.onboarding_task_id,
                        start_at: get(`startAt${ t.id }`),
                        end_at: get(`endAt${ t.id }`)
                    }
    
                    POST_ajax(`${ D_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`, generalTasksData, {
                        success: () => {},
                        error: () => {
                            toastr.error('There was an error in creating onbaording tasks to onboarding employee')
                        }
                    });
                });

                // Create and add onboarding tasks to employee
                if(addedOnboardingTasks.length > 0) addedOnboardingTasks.forEach(t => {
                    const addedTasksData = {
                        title: t.task_title,
                        description: t.description,
                        task_type: 'Added'
                    }
                    
                    POST_ajax(`${ D_API_ROUTE }onboarding-tasks`, addedTasksData, {
                        success: result2 => {
                            const onboardingTaskID = result2.data.onboarding_task_id;

                            const addedOnboardingTaskData = {
                                onboarding_employee_id: onboardingEmployeeID,
                                onboarding_task_id: onboardingTaskID,
                                start_at: get(`startAt${ t.id }`),
                                end_at: get(`endAt${ t.id }`)
                            }

                            POST_ajax(`${ D_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`, addedOnboardingTaskData, {
                                success: () => {},
                                error: () => {
                                    toastr.error('There was an error in creating onbaording tasks to onboarding employee')
                                }
                            });
                        },
                        error: () => {
                            toastr.error('There was an error in adding onboarding task');
                        }
                    });
                });

                // Update applicant status
                PUT_ajax(`${ D_API_ROUTE }applicants/${ applicantID }`, {status: 'Onboarding'}, {
                    success: () => {},
                    error: () => toastr.error('There was an error in updating applicant status')
                });

                // Set sessioned alert and redirect
                setSessionedAlertAndRedirect({
                    theme: 'success',
                    message: 'A new onboarding employee has been added',
                    redirectURL: `${ D_WEB_ROUTE }onboarding-employees`
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

/** Validate Add General Task Form */
validateForm('#addGeneralTaskForm', {
    rules: {
        taskTitle: {
            required: true
        },
        description: {
            required: true
        }
    },
    messages: {
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

    const formData = generateFormData('#addGeneralTaskForm');
    const get = (n) => { return formData.get(n) }

    const data = {
        title: get('taskTitle'),
        description: get('description'),
        task_type: 'General'
    }

    POST_ajax(`${ D_API_ROUTE }onboarding-tasks`, data, {
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
                reloadDataTable('#generalTasksDT');

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

/** General Tasks DataTable */
initDataTable('#generalTasksDT', {
    // debugMode: true,
    url: `${ D_API_ROUTE }onboarding-tasks/general`,
    columns: [

        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Task Title
        { data: 'title' },

        // Date Added
        {
            data: null,
            render: data => {
                const dateAdded = data.created_at;
                return `
                    <div>${ formatDateTime(dateAdded, 'MMM. D, YYYY') }</div>
                    <div class="small text-secondary">${ fromNow(dateAdded) }</div>
                `
            }
        },

        // Added By
        {
            data: null,
            render: data => {
                const addedBy = data.onboarding_task_added_by;

                return formatName('F M. L, S', {
                    firstName: addedBy.first_name,
                    middleName: addedBy.middle_name,
                    lastName: addedBy.last_name,
                    suffixName: addedBy.suffix_name
                });
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

/** View Onaborading Task Details */
const viewOnboardingTaskDetails = (onboardingTaskID) => {
    GET_ajax(`${ D_API_ROUTE }onboarding-tasks/${ onboardingTaskID }`, {
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

/** Initialize Onboarding Employees DataTable */
initDataTable('#onboardingEmployeesDT', {
    url: `${ D_API_ROUTE }onboarding-employees`,
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
                        <small>${ taskProgress }% Complete</small>
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
                                href="${ D_WEB_ROUTE }onboarding-employees/${ data.onboarding_employee_id }/onboarding-tasks"
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


// Get the onboardingEmployeeID from the URL
const onboardingEmployeeID = window.location.pathname.split('/')[3];

/** Initialize Onboarding Employee Tasks DataTable */
initDataTable('#onboardingEmployeeTasksDT', {
    url: `${ D_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`,
    columns: [

        // Start at (Hidden for default sorting)
        { data: 'start_at', visible: false },

        // Tasks
        {
            data: null,
            render: data => {
                const task = data.onboarding_task;
                return `
                    <div>${ task.title }</div>
                    <div class="small text-secondary">${ task.description }</div>
                `
            }
        },

        // Start
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const startAt = data.start_at;
                return `
                    <div>${ formatDateTime(startAt, 'MMM. D, YYYY') }</div>
                    <div>${ formatDateTime(startAt, 'Time') }</div>
                    <div class="small text-secondary">${ fromNow(startAt) }</div>
                `
            }
        },

        // Deadline
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const endAt = data.end_at;
                return `
                    <div>${ formatDateTime(endAt, 'MMM. D, YYYY') }</div>
                    <div>${ formatDateTime(endAt, 'Time') }</div>
                    <div class="small text-secondary">${ fromNow(endAt) }</div>
                `
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const status = data.status;
                if(status == "On Going") return dtBadge('info', `
                    <i class="fas fa-redo mr-1"></i>
                    <span>${ status }<span>
                `)
                else if(status == "Completed") return dtBadge('success', `
                    <i class="fas fa-check mr-1"></i>
                    <span>${ status }<span>
                `)
                else return dtBadge('light', 'Invalid data')
            }
        },

        // Action
        { 
            data: null,
            render: data => {
                const onboardingEmplyeeTaskID = data.onboarding_employee_task_id;

                const markAsCompletedLink = () => {
                    return data.status == "On Going"
                        ? `
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="markAsCompleted('${ onboardingEmplyeeTaskID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-check mr-1"></i></div>
                                <span>Mark as Completed</span>
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
                                onclick="viewOnboardingTaskDetails('${ onboardingEmplyeeTaskID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View Details</span>
                            </div>
                            ${ markAsCompletedLink() }
                        </div>
                    </div>
                `
            }
        }
    ]
});

/** Get Onboarding Employee Details */
const getOnboardingEmployeeDetails = () => {
    GET_ajax(`${ D_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }`, {
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

                let completed = 0;

                tasks.forEach(t => { if(t.status === 'Completed') completed++ });

                var taskProgress = ((completed/tasks.length) * 100).toFixed(2);

                var bgColor;
                if(taskProgress <= 25) bgColor = 'danger';
                else if(taskProgress <= 75) bgColor = 'warning';
                else if(taskProgress < 100) bgColor = 'info';
                else if(taskProgress == 100) bgColor = 'success';

                return `
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
                    <small>${ taskProgress }% Complete</small>
                `
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
        error: () => {
            toastr.error('There was an error in getting onboarding employee details')
        }
    });
}

/** Onboarding Employee Details */
ifSelectorExist('#onboardingEmployeeDetails', () => getOnboardingEmployeeDetails());

/** Mark as Completed */
const markAsCompleted = (onboardingEmployeeTaskID) => {
    setValue('#onboardingEmployeeTaskID', onboardingEmployeeTaskID);
    showModal('#confirmMarkAsCompletedModal');
}

/** When confirm mark as completed modal was hidden */
onHideModal('#confirmMarkAsCompletedModal', () => resetForm('#markAsCompletedForm'));

/** Validate Makr As Completed Form */
validateForm('#markAsCompletedForm', {
    submitHandler: () => markTaskAsCompleted()
});

/** Mark Task As Completed */
const markTaskAsCompleted = () => {

    // Set buttons to loading state
    btnToLoadingState('#confimMarkAsCompletedBtn');
    disableElement('#cancelConfimMarkAsCompletedBtn');

    const onboardingEmployeeTaskID = generateFormData('#markAsCompletedForm').get('onboardingEmployeeTaskID');

    const data = {status: 'Completed'}

    PUT_ajax(`${ D_API_ROUTE }onboarding-employee-tasks/${ onboardingEmployeeTaskID }`, data, {
        success: result => {

            // Hide Modal
            hideModal('#confirmMarkAsCompletedModal');

            // Reload DataTable
            reloadDataTable('#onboardingEmployeeTasksDT');

            // Reload Onboarding Employee Details
            getOnboardingEmployeeDetails();

            // Set buttons to unload state
            btnToUnloadState('#confimMarkAsCompletedBtn', `
                <span>Yes, mark it!</span>
                <i class="fas fa-check ml-1"></i>
            `);
            enableElement('#cancelConfimMarkAsCompletedBtn');

            toastr.success('An onboarding task is successfully completed');
        },
        error: () => {
            // Set buttons to unload state
            btnToUnloadState('#confimMarkAsCompletedBtn', `
                <span>Yes, mark it!</span>
                <i class="fas fa-check ml-1"></i>
            `);
            enableElement('#cancelConfimMarkAsCompletedBtn');

            toastr.error('There was an error in updating onboarding employee task status');
        }
    })
}