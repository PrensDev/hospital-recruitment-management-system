/**
 * ==============================================================================
 * SUBMIT JOB POST
 * ==============================================================================
 */


/** Load Primary Input */
ifSelectorExist('#createJobPostForm', () => {
    
    /** Job Description For Add Summernote */
    $('#jobDescription').summernote({
        height: 750,
        placeholder: "Write the description of job here",
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
            ['para', ['ol', 'ul', 'paragraph']],
            ['table', ['table']]
        ]
    });

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
    submitHandler:() => {
        showModal('#confirmPostNewJobModal');
        return false;
    }
});


/** Submit Job Post */
onClick('#confirmPostNewJobPostBtn', () => {
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
        error: () => {
            hideModal('#confirmPostNewJobModal');
            toastr.error('There was an error in posting new job')
        }
    })
})


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

            const manpowerRequest = result.manpower_request;

            // Set Job Post Status
            const expiresAt = result.expiration_date;

            if(isEmptyOrNull(expiresAt) || isAfterToday(expiresAt))
                setContent('#jobPostStatus', dtBadge('info', 'On Going'))
            else if(isBeforeToday(expiresAt))
                setContent('#jobPostStatus', dtBadge('danger', 'Ended'))
            else
                setContent('#jobPostStatus', dtBadge('warning', 'Last Day Today'))

            // Set Posted At
            setContent('#postedAt', `Posted ${ formatDateTime(result.created_at, 'Date') }`);

            // Set Vacant Position
            setContent('#vacantPosition', manpowerRequest.vacant_position.name);

            // Set Employment Type
            setContent('#employmentType', manpowerRequest.employment_type);

            // Set Salary Range
            const minSalary = manpowerRequest.min_monthly_salary;
            const maxSalary = manpowerRequest.max_monthly_salary;

            const noSalaryRange = isEmptyOrNull(minSalary) && isEmptyOrNull(maxSalary)

            if(noSalaryRange || !result.salary_is_visible) {
                hideElement('#salaryRangeDisplay');
                setContent('#salaryRange', '');
            } else {
                showElement('#salaryRangeDisplay');
                setContent('#salaryRange', `P ${ minSalary } - P ${ maxSalary }`);
            }

            // Set Open Until
            const openUntil = result.expiration_date;
            if(isEmptyOrNull(openUntil)) {
                hideElement('#openUntilDisplay');
                setContent('#openUntil', '');
            } else {
                showElement('#openUntilDisplay');
                setContent('#openUntil', formatDateTime(openUntil, "Full Date"))
            }

            // Set Job Description
            setContent('#jobDescription', result.content);

            /** Show View Job Post Modal */
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


/** If Edit Job Post Form Exists */
ifSelectorExist('#editJobPostForm', () => {
    
    /** Job Description For Add Summernote */
    $('#jobDescription').summernote({
        height: 750,
        placeholder: "Write the description of job here",
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
            ['para', ['ol', 'ul', 'paragraph']],
            ['table', ['table']]
        ]
    });

    const jobPostID = window.location.pathname.split("/")[3];
    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            console.log(result)

            const manpowerRequest = result.manpower_request;

            const minSalary = manpowerRequest.min_monthly_salary;
            const maxSalary = manpowerRequest.max_monthly_salary;

            // Set Job Post ID
            setValue('#jobPostID', result.job_post_id);


            /** FOR MANPOWER REQUEST SUMMARY */

            // Set Vacant Position
            setContent('#vacantPositionForSummary', manpowerRequest.vacant_position.name);

            // Set Staffs Needed
            setContent('#staffsNeededForSummary', () => {
                const staffsNeeded = manpowerRequest.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' }`;
            });

            // Set Employment Type
            setContent('#employmentTypeForSummary', manpowerRequest.employment_type);

            // Set Salary Range
            setContent('#salaryRangeForSummary', () => {
                if(isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)) {
                    hideElement('#salaryRangeField');
                    return 'Unset';
                } else {
                    return `P ${minSalary} - P ${maxSalary}`;
                }
            });

            // Set Deadline
            setContent('#deadlineForSummary', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) ? 'Unset' : `
                    <div>${ formatDateTime(deadline, "Full Date") }</div>
                    <div class="small text-secondary">${ fromNow(deadline) }</div>
                `
            });


            /** FOR MANPOWER REQUEST MODAL */

            const requestedBy = manpowerRequest.manpower_request_by;

            // Set Requestor Name
            setContent('#requestorName', formatName('F M. L, S', {
                firstName: requestedBy.first_name,
                middleName: requestedBy.middle_name,
                lastName: requestedBy.last_name,
                suffixName: requestedBy.suffix_name
            }));

            // Set Requestor Department
            setContent('#requestorDepartment', requestedBy.position.name);

            // Set Date Requested
            setContent('#dateRequested', formatDateTime(manpowerRequest, "Date"));

            // Set Deadline
            setContent('#deadline', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) ? 'Unset' : formatDateTime(deadline, "Date");
            });

            // Set Requested Position
            setContent('#requestedPosition', manpowerRequest.vacant_position.name);

            // Set Staffs Needed
            setContent('#noOfStaffsNeeded', () => {
                const staffsNeeded = manpowerRequest.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' }`;
            });

            // Set Employment Type
            setContent('#employmentType', manpowerRequest.employment_type);

            // Set Request Nature
            setContent('#requestNaure', manpowerRequest.request_nature);

            // Set Suggested Salary
            setContent('#suggestedSalary', () => {
                if(isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)) {
                    return 'Unset';
                } else {
                    return `P ${minSalary} - P ${maxSalary}`;
                }
            });

            // Set Request Description
            setContent('#requestDescription', manpowerRequest.content);

            // Set Approved By
            setContent('#approvedBy', () => {
                const approvedBy = manpowerRequest.manpower_request_reviewed_by;

                const approvedByFullName = formatName("F M. L, S", {
                    firstName: approvedBy.first_name,
                    middleName: approvedBy.middle_name,
                    lastName: approvedBy.last_name,
                    suffixName: approvedBy.suffix_name
                });

                return `
                    <div>${ approvedByFullName }</div>
                `
            });

            // Set Approved At
            setContent('#approvedAt', formatDateTime(manpowerRequest.reviewed_at, "Date"));

            // Set Completed At
            setContent('#completedAt', () => {
                const completedAt = manpowerRequest.completed_at;
                isEmptyOrNull(completedAt) ? 'Not yet completed' : formatDateTime(completedAt, "Date");
            });


            /** FOR JOB POST DETAILS */

            // Set Posted At
            const createdAt = result.created_at;
            setContent("#postedAtDate", formatDateTime(createdAt, "Full Date"));
            setContent("#postedAtTime", formatDateTime(createdAt, "Time"));
            setContent("#postedAtHumanized", fromNow(createdAt));

            // Set Last Updated
            const lastUpdated = result.updated_at;
            setContent("#lastUpdatedDate", formatDateTime(lastUpdated, "Full Date"));
            setContent("#lastUpdatedTime", formatDateTime(lastUpdated, "Time"));
            setContent("#lastUpdatedHumanized", fromNow(lastUpdated));


            /** SET INPUTS */
            
            // Set Job Description
            $('#jobDescription').summernote('code', result.content);

            if(result.salary_is_visible) checkElement('#salaryRangeIsVisible');

            // Set Expiration Date
            if(!isEmptyOrNull(result.expiration_date)) {
                checkElement('#expirationDate');
                showElement('#openUntilField');
                setValue('#openUntil', formatDateTime(result.expiration_date, "YYYY-MM-DD"));
            }

        },
        error: () => toastr.error('There was an error in getting job post details')
    })
});


/** Validate Edit Job Post */
validateForm('#editJobPostForm', {
    rules: {
        jobPostID: {
            required: true
        },
        jobDescription: {
            required: true
        },
        openUntil: {
            required: true
        }
    },
    messages: {
        jobPostID: {
            required: "This must have a hidden value"
        },
        jobDescription: {
            required: "Job Description is required"
        },
        openUntil: {
            required: "Please select a date"
        }
    },
    submitHandler: () => {
        showModal('#confirmUpdateJobPostModal');
        return false;
    }
});


/** Update Job Post */
onClick('#confirmUpdateJobPostBtn', () => {
    const formData = generateFormData('#editJobPostForm');

    const expirationDate = isChecked('#expirationDate') ? formatDateTime(formData.get('openUntil')) : null;

    const data = {
        content: formData.get('jobDescription'),
        salary_is_visible: isChecked('#salaryRangeIsVisible'),
        expiration_date: expirationDate
    }

    const jobPostID = formData.get('jobPostID')

    PUT_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, data, {
        success: result => {
            if(result) {
                location.assign(`${ R_WEB_ROUTE }job-posts`)
            }
        },
        error: () => {
            hideModal('#confirmUpdateJobPostModal');
            toastr.error('There was an error in updating a job post');
        }
    });
});