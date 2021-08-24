/**
 * ==============================================================================
 * SUBMIT JOB POST
 * ==============================================================================
 */


/** Load Primary Input */
ifSelectorExist('#createJobPostForm', () => {
    const requisitionID = window.location.pathname.split("/")[3];
    GET_ajax(`${ R_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            console.log(result)

            // Set Value for Requisition ID
            setValue('#requisitionID', result.requisition_id);

            // Set Content
            setContent('#vacantPosition', result.vacant_position.name);

            // Set Staffs Needed
            setContent('#staffsNeeded', () => {
                const staffsNeeded = result.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' }`
            });

            // Set Employment Type
            setContent('#employmentType', result.employment_type);

            // Set Salary Range
            setContent('#salaryRange', () => {
                const minSalary = result.min_monthly_salary;
                const maxSalary = result.max_monthly_salary;

                if(isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)) {
                    hideElement('#salaryRangeField');
                    return 'Unset';
                } else {
                    return `P ${minSalary} - P ${maxSalary}`;
                }
            });

            // Set Deadline
            setContent('#deadline', () => {
                const deadline = result.deadline;
                return `
                    <div>${ formatDateTime(deadline, "Date") }</div>
                    <div class="small text-secondary">${ fromNow(deadline) }</div>
                `
            })
        },
        error: () => toastr.error('There was an error in getting requisition details')
    })
});


/** Job Description For Add Summernote */
$('#jobDescription').summernote({
    height: 500,
    placeholder: "Write the description of job here",
    toolbar: [
        ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
        ['para', ['ol', 'ul', 'paragraph']],
        ['table', ['table']]
    ]
});


/** Set Expriration Date On Change */
$('#expirationDate').on('change', () => isChecked('#expirationDate') ? showElement('#openUntilField') : hideElement('#openUntilField'))


/** Validate Add Job Post Form */
validateForm('#createJobPostForm', {
    rules: {
        requisitionID: {
            required: true
        },
        jobDescription: {
            required: true
        },
        openUntil: {
            required: true
        }
    },
    messages:{
        requisitionID: {
            required: 'This field must have value'
        },
        jobDescription: {
            required: 'Job Description is required'
        },
        openUntil: {
            required: 'Please select a date'
        }
    },
    submitHandler:() => submitJobPost()
});


/** Submit Job Post */
const submitJobPost = () => {
    const formData = generateFormData('#createJobPostForm');

    const expirationDate = isChecked('#expirationDate') ? formatDateTime(formData.get('openUntil')) : null;

    const data = {
        requisition_id: formData.get('requisitionID'),
        salary_is_visible: isChecked('#salaryRangeIsVisible'),
        content: formData.get('jobDescription'),
        expiration_date: expirationDate,
    }

    POST_ajax(`${ R_API_ROUTE }job-posts`, data, {
        success: result => {
            if(result) {
                location.assign(`${ R_WEB_ROUTE }job-posts`);
            }
        },
        eroor: () => toastr.error('There was an error in posting new job')
    })
}


/**
 * ==============================================================================
 * VIEW ALL JOB POSTS
 * ==============================================================================
 */

/** Initialize Job Posts DataTable */
initDataTable('#jobPostsDT', {
    // debugMode: true,
    url: `${ R_API_ROUTE }job-posts`,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // View Manpower Request
        {
            data: null,
            render: data => {
                return `
                    <button class="btn btn-sm btn-light btn-block">
                        <i class="fas fa-file-alt mr-1"></i>
                        <span>View request</span>
                    </button
                `
            }
        },

        // Vacant Position
        { data: "manpower_request.vacant_position.name" },

        // Applicants
        {
            data: null,
            render: data => {
                const applicants = data.applicants.length;
                return applicants == 0 ? 'No applicants yet' : `${ applicants } applicant{ applicant > 1 ? 's' : '' }`
            }
        },

        // Application Status
        {
            data: null,
            render: data => {
                const expirationDate = data.expiration_date;

                if(isAfterToday(expirationDate) || isEmptyOrNull(expirationDate)) {
                    return dtBadge('info', 'On Going');
                } else if(isBeforeToday(expirationDate)) {
                    return dtBadge('danger', 'Ended');
                } else {
                    return dtBadge('warning', 'Last day today');
                }
            }
        },

        // Until at
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const expirationDate = data.expiration_date;

                return isEmptyOrNull(expirationDate)
                    ? `<div>No expiration date</div>`
                    : `
                        <div>${ formatDateTime(expirationDate, "MMM. D, YYYY") }</div>
                        <div class="small text-secondary">${ fromNow(expirationDate) }</div>
                    `
            }
        },

        // Actions
        {
            data: null,
            render: data => {
                const jobPostID = data.job_post_id;
                const requisitionID = data.manpower_request.requisition_id;

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-light" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewJobPostDetails('${ jobPostID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Job Post</div>
                            </div>
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="editJobPost('${ jobPostID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                                <div>Edit Job Post</div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewManpowerRequestDetails('${ requisitionID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-file-alt mr-1"></i></div>
                                <div>View Manpower Request</div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    ]
});


/**
 * ==============================================================================
 * VIEW JOB POST DETAILS
 * ==============================================================================
*/

/** View Job Post */
const viewJobPostDetails = (jobPostID) => {
    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            console.log(result)

            showModal('#viewJobPostModal');
        },
        error: () => toastr.error('There was a problem in getting job post details')
    })
}


/**
 * ==============================================================================
 * EDIT JOB POST
 * ==============================================================================
*/


/** Edit Job Post */
const editJobPost = (jobPostID) => location.assign(`${ R_WEB_ROUTE }edit-job-post/${ jobPostID }`)


/** If Selector Exists */
ifSelectorExist('#editJobPostForm', () => {
    const jobPostID = window.location.pathname.split("/")[3];
    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            console.log(result)

            const manpowerRequest = result.manpower_request;

            // Set Job Description
            setValue('#jobDescription', result.content);

            // Set Vacant Position
            setContent('#vacantPosition', manpowerRequest.vacant_position.name);

            // Set Staffs Needed
            setContent('#staffsNeeded', () => {
                const staffsNeeded = manpowerRequest.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' }`;
            });

            // Set Employment Type
            setContent('#employmentType', manpowerRequest.employment_type);

            // Set Salary Range
            setContent('#salaryRange', () => {
                const minSalary = manpowerRequest.min_monthly_salary;
                const maxSalary = manpowerRequest.max_monthly_salary;

                if(isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)) {
                    hideElement('#salaryRangeField');
                    return 'Unset';
                } else {
                    return `P ${minSalary} - P ${maxSalary}`;
                }
            });

            // Set Deadline
            setContent('#deadline', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) ? 'Unset' : `
                    <div${ formatDateTime(deadline) }></div>
                    <div class="small text-secondary">${ fromNow(deadline) }</div>
                `
            })
        },
        error: () => toastr.error('There was an error in getting job post details')
    })
})