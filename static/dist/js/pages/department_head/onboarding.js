/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */

/** Onboarding Employee ID */
const onboardingEmployeeID = window.location.pathname.split("/")[3];


/**
 * ==============================================================================
 * ONBOARDING EMPLOYEES
 * ==============================================================================
 */

/** Onboarding employees analytics */
ifSelectorExist('#onboardingEmployeesAnalyticsContainer', () => {
    GET_ajax(`${ DH_API_ROUTE }onboarding-employees/analytics`, {
        success: result => {

            // Set Total Onboarding Employees Count
            setContent('#totalOnboardingEmployeesCount', result.total);
        }, 
        error: () => toastr.error('There was an error in getting onboarding employee analytics')
    });
});

/** Initialize Onboarding Employees DataTable */
initDataTable('#onboardingEmployeesDT', {
    url: `${ DH_API_ROUTE }onboarding-employees`,
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
                                href="${ DH_WEB_ROUTE }onboarding-employees/${ data.onboarding_employee_id }/onboarding-tasks"
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

/** Initialize Onboarding Employee Tasks DataTable */
initDataTable('#onboardingEmployeeTasksDT', {
    url: `${ DH_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }/onboarding-tasks`,
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
                    var theme;
                    if(taskType === "For new employees") theme = "success"
                    else if(taskType === "For the team") theme = "info"
                    else if(taskType === "For department manager") theme = "warning"
                    return `<span class="badge border border-${ theme } text-${ theme }">${ taskType }</span>`
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
                        </div>
                    </div>
                `
            }
        }
    ]
});

/** Get Onboarding Employee Details */
const getOnboardingEmployeeDetails = () => {
    GET_ajax(`${ DH_API_ROUTE }onboarding-employees/${ onboardingEmployeeID }`, {
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
                
                new Chart(donutChartCanvas, {
                    type: 'doughnut',
                    data: donutData,
                    options: {
                        maintainAspectRatio : false,
                        responsive : true,
                    }
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

/** View Onboarding Employee Task Details */
const viewOnboardingEmployeeTaskDetails = (onboardingEmployeeTaskID) => {
    GET_ajax(`${ DH_API_ROUTE }onboarding-employee-tasks/${ onboardingEmployeeTaskID }`, {
        success: result => {

            /** ONBOARDING EMPLOYEE TASK DETAILS */

            const onboardingTask = result.onboarding_task;

            // Task Title
            setContent('#taskTitle', onboardingTask.title);

            // Task Description
            setContent('#taskDescription', onboardingTask.description);

            // Asssigned for
            setContent('#taskType', onboardingTask.task_type);

            // Task Status
            setContent('#taskStatus', result.status);

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
