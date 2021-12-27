/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */
const jobPostID = window.location.pathname.split('/')[3];


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
        toolbar: SUMMERNOTE_TOOLBAR
    });

    // Get the requisition ID from the URL
    const requisitionID = window.location.pathname.split('/')[3];

    /** Get Manpower Request Information */
    GET_ajax(`${ R_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            // console.log(result)

            const minSalary = result.min_monthly_salary;
            const maxSalary = result.max_monthly_salary;

            /** MANPOWER REQUEST SUMMARY */

            // Set Value for Requisition ID
            setValue('#requisitionID', result.requisition_id);

            // Set Content
            setContent('#vacantPositionForSummary', result.vacant_position.name);

            // Set Staffs Needed
            setContent('#staffsNeededForSummary', () => {
                const staffsNeeded = result.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' }`
            });

            // Set Employment Type
            setContent('#employmentTypeForSummary', result.employment_type);

            // Set Salary Range
            setContent('#salaryRangeForSummary', () => {
                if(isEmptyOrNull(minSalary) && isEmptyOrNull(maxSalary)) {
                    hideElement('#salaryRangeField');
                    return `<div class="text-secondary font-italic">Unset</div>`;
                } else {
                    return `${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}`;
                }
            });

            // Set Deadline
            setContent('#deadlineForSummary', () => {
                const deadline = result.deadline;

                return isEmptyOrNull(deadline)
                    ? `<div class="text-secondary font-italic">Unset</div>`
                    : `
                        <div>${ formatDateTime(deadline, "Full Date") }</div>
                        <div>${ formatDateTime(deadline, "Time") }</div>
                        <div class="small text-secondary">${ fromNow(deadline) }</div>
                    `
            });

            /** FOR MANPOWER REQUEST MODAL */

            const requestedBy = result.manpower_request_by;

            // Set Requestor Name
            setContent('#requestorName', formatName('F M. L, S', {
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
                return isEmptyOrNull(deadline) ? 'Unset' : formatDateTime(deadline, "DateTime");
            });

            // Set Requested Position
            setContent('#requestedPosition', result.vacant_position.name);

            // Set Staffs Needed
            setContent('#noOfStaffsNeeded', () => {
                const staffsNeeded = result.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' }`;
            });

            // Set Employment Type
            setContent('#employmentType', result.employment_type);

            // Set Request Nature
            setContent('#requestNature', result.request_nature);

            // Set Suggested Salary
            setContent('#suggestedSalary', () => {
                return isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)
                    ? `<div class="text-secondary font-italic"></div>`
                    : `${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}/month`
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
            setContent('#approvedAt', formatDateTime(result.reviewed_at, "DateTime"));

            // Set Completed At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : formatDateTime(completedAt, "DateTime");
            });
        },
        error: () => toastr.error('There was an error in getting requisition details')
    });
    
    /** Validate Summernote */
    $('#jobDescription').summernote().on('summernote.change', () => {
        if($('#jobDescription').summernote('isEmpty')) {
            $('#jobDescription').next().addClass('border-danger');
            showElement('#jobDescriptionInvalidFeedback');
            disableElement('#postBtn');
        } else {
            $('#jobDescription').next().removeClass('border-danger');
            hideElement('#jobDescriptionInvalidFeedback');
            enableElement('#postBtn');
        }
    });
});

/** Set Expriration Date On Change */
$('#expirationDate').on('change', () => isChecked('#expirationDate') ? showElement('#openUntilField') : hideElement('#openUntilField'));

/** Validate Add Job Post Form */
validateForm('#createJobPostForm', {
    rules: {
        requisitionID: { required: true },
        jobDescription: { required: true, },
        openUntil: {
            required: true,
            afterToday: true
        }
    },
    messages:{
        requisitionID: { required: 'This field must have value' },
        jobDescription: { required: 'Job Description is required', },
        openUntil: {
            required: 'Please select a date',
            afterToday: 'The date and time must be in the future'
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

    const expirationDate = isChecked('#expirationDate') 
        ? formatDateTime(formData.get('openUntil')) 
        : null

    const data = {
        requisition_id: formData.get('requisitionID'),
        salary_is_visible: isChecked('#salaryRangeIsVisible'),
        content: formData.get('jobDescription'),
        expiration_date: expirationDate,
    }

    const ifError = () => {
        hideModal('#confirmPostNewJobModal');
        toastr.error('There was an error in posting new job')
    } 

    POST_ajax(`${ R_API_ROUTE }job-posts`, data, {
        success: result => {
            if(result) setSessionedAlertAndRedirect({
                theme: 'success',
                message: 'A new available job is successfully posted',
                redirectURL: `${ R_WEB_ROUTE }job-posts`
            });
            else ifError()
        },
        error: () => ifError()
    })
});


/**
 * ==============================================================================
 * VIEW ALL JOB POSTS
 * ==============================================================================
 */

/** Initialize Job Posts DataTable */
initDataTable('#jobPostsDT', {
    // debugMode: true,
    url: `${ R_API_ROUTE }job-posts`,
    enableButtons: true,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // View Manpower Request
        { data: 'manpower_request.requisition_no', class: 'text-nowrap' },

        // Vacant Position
        { data: "manpower_request.vacant_position.name" },

        // Applicants
        {
            data: null,
            render: data => {
                const applicants = data.applicants.length;
                return applicants == 0 
                    ? `<div class="text-secondary font-italic">No applicants yet</div>` 
                    : `${ applicants } applicant${ applicants > 1 ? 's' : '' }`
            }
        },

        // Application Status
        {
            data: null,
            render: data => {
                const expirationDate = data.expiration_date;

                if(isAfterToday(expirationDate) || isEmptyOrNull(expirationDate))
                    return dtBadge('info', 'On Going');
                else if(isBeforeToday(expirationDate))
                    return dtBadge('danger', 'Ended');
                else
                    return dtBadge('warning', 'Last day today');
            }
        },

        // Open until
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const expirationDate = data.expiration_date;

                return isEmptyOrNull(expirationDate)
                    ? `<div class="text-secondary font-italic">No expiration</div>`
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

                const applicants = data.applicants.length > 0
                    ? `
                        <div class="dropdown-divider"></div>
                        <a 
                            class="dropdown-item d-flex"
                            href="${ R_WEB_ROUTE }job-posts/${ data.job_post_id }/applicants"
                        >
                            <div style="width: 2rem"><i class="fas fa-users mr-1"></i></div>
                            <div>View Applicants</div>
                        </a>
                    `
                    : '';

                const endJobPost = () => {
                    return isEmptyOrNull(data.expiration_date)
                        ? `
                            <div class="dropdown-divider"></div>
                            <div
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="endRecruiting('${ jobPostID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-hand-paper mr-1"></i></div>
                                <div>End recruiting</div>
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
                            <a 
                                class="dropdown-item d-flex"
                                href="${ R_WEB_ROUTE }job-posts/${ jobPostID }"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Job Post</div>
                            </a>
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="editJobPost('${ jobPostID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                                <div>Edit Job Post</div>
                            </div>
                            ${ applicants }
                            <div class="dropdown-divider"></div>
                            <a
                                class="dropdown-item d-flex"
                                href="${ R_WEB_ROUTE }manpower-requests/${ requisitionID }"
                            >
                                <div style="width: 2rem"><i class="fas fa-file-alt mr-1"></i></div>
                                <div>View Manpower Request</div>
                            </a>
                            ${ endJobPost() }
                        </div>
                    </div>
                `
            }
        }
    ]
});


/**
 * ==============================================================================
 * JOB POSTS ANALYTICS
 * ==============================================================================
 */

// Job Post Analytics
const jobPostsAnalytics = () => {
    GET_ajax(`${ R_API_ROUTE }job-posts/analytics`, {
        success: result => {
            
            // Set Total Job Posts Count
            setContent('#totalJobPostsCount', formatNumber(result.total));

            // Set On Going Job Posts Count
            setContent('#ongoingJobPostsCount', formatNumber(result.on_going));

            // Set Ended Job Posts Count
            setContent('#endedJobPostsCount', formatNumber(result.ended));
        },
        error: () => toastr.error('There was an error while getting job post analytics')
    });
}

ifSelectorExist('#jobPostsAnalytics', () => jobPostsAnalytics())


/**
 * ==============================================================================
 * VIEW JOB POST DETAILS
 * ==============================================================================
*/

/** Get Job Post Details */
const getJobPostDetails = () => {
    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            
            /** JOB POST DETAILS */

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
            setContent('#employmentTypeForJobPost', manpowerRequest.employment_type);

            // Set Salary Range
            const minSalary = manpowerRequest.min_monthly_salary;
            const maxSalary = manpowerRequest.max_monthly_salary;

            if((isEmptyOrNull(minSalary) && isEmptyOrNull(maxSalary)) || !result.salary_is_visible) {
                hideElement('#salaryRangeDisplay');
                setContent('#salaryRange', '');
            } else {
                showElement('#salaryRangeDisplay');
                setContent('#salaryRange', `${ formatCurrency(minSalary) } - ${ formatCurrency(maxSalary) }`);
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

            /** Job Post Options */
            setContent('#jobPostOptions', () => {
                const endRecruiting = `
                    <button class="btn btn-sm btn-danger btn-block" onclick="endRecruiting('${ jobPostID }')">
                        <i class="fas fa-hand-paper mr-1"></i>
                        <span>End recruiting</span>
                    </button>
                `
            
                return `
                    <a class="btn btn-sm btn-secondary btn-block" target="_blank" href="${ BASE_URL_WEB }careers/${ jobPostID }">
                        <i class="fas fa-eye mr-1"></i>
                        <span>View post in public portal</span>
                    </a>
                    <a class="btn btn-sm btn-secondary btn-block" href="${ R_WEB_ROUTE }job-posts/${ jobPostID }/applicants">
                        <i class="fas fa-users mr-1"></i>
                        <span>View applicants</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="btn btn-sm btn-info btn-block" href="${ R_WEB_ROUTE }edit-job-post/${ jobPostID }">
                        <i class="fas fa-edit mr-1"></i>
                        <span>Edit this post</span>
                    </a>

                    ${ isEmptyOrNull(result.expiration_date) ? endRecruiting : ''}
                `
            });


            /** MANPOWER REQUEST SUMMARY */

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
                return isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)
                    ? () => {
                        hideElement('#salaryRangeField');
                        return `<div class="text-secondary font-italic">Unset</div>`
                    }
                    : `${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}`;
            });

            // Set Deadline
            setContent('#deadlineForSummary', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) 
                    ? `<div class="text-secondary font-italic">Unset</div>` 
                    : `
                        <div>${ formatDateTime(deadline, "Full Date") }</div>
                        <div>${ formatDateTime(deadline, "Time") }</div>
                        <div class="small text-secondary">${ fromNow(deadline) }</div>
                    `
            });
            
            /** FOR JOB POST TIMELINE */
            setJobPostTimeline('#jobPostTimeline', result);

            /** SET MANPOWER REQUEST CONTENTS */

            const requestedBy = manpowerRequest.manpower_request_by;

            // Set Requisition No
            setContent('#requisitionNo', manpowerRequest.requisition_no);

            // Set Requisition ID
            setValue('#requisitionID', manpowerRequest.requisition_id)
            
            // Set Requestor Name
            setContent('#requestorName', formatName("F M. L, S", {
                firstName: requestedBy.first_name,
                middleName: requestedBy.middle_name,
                lastName: requestedBy.last_name,
                suffixName: requestedBy.suffix_name
            }));
            
            // Set Requestor Department
            setContent('#requestorDepartment', `${ requestedBy.position.name }, ${ requestedBy.position.department.name }`);
            
            // Set Date Requested
            setContent('#dateRequested', formatDateTime(manpowerRequest.created_at, "DateTime"));
            
            // Set Deadline
            setContent('#deadline', () => {
                const deadline = manpowerRequest.deadline;
                if(isEmptyOrNull(deadline)) return `<div class="text-secondary font-italic">No deadline</div>`
                else return formatDateTime(manpowerRequest.deadline, "DateTime")
            });

            // Set Requested Position
            setContent('#requestedPosition', manpowerRequest.vacant_position.name);
            
            // Set No. of Staffs Needed
            setContent('#noOfStaffsNeeded', () => {
                const staffsNeeded = manpowerRequest.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }`
            });

            // Set Employment Type
            setContent('#employmentType', manpowerRequest.employment_type);

            // Set Request Nature
            setContent('#requestNature', manpowerRequest.request_nature);

            // Set Suggested Salary
            setContent('#suggestedSalary', () => {
                const minMonthlySalary = manpowerRequest.min_monthly_salary;
                const maxMonthlySalary = manpowerRequest.max_monthly_salary;
                return isEmptyOrNull(minMonthlySalary) && isEmptyOrNull(maxMonthlySalary) 
                    ? `<div class="text-secondary font-italic">Unset</div>` 
                    : `${ formatCurrency(minMonthlySalary) } - ${ formatCurrency(maxMonthlySalary) }/month`;
            });

            // Set Request Description
            setContent('#requestDescription', manpowerRequest.content);

            // Set Approved By
            setContent('#approvedBy', () => {
                const approvedBy = manpowerRequest.manpower_request_reviewed_by;
                return isEmptyOrNull(approvedBy)
                    ? `<div class="text-secondary font-italic">Not yet approved</div>`
                    : () => {
                        if(manpowerRequest.request_status === "Rejected") {
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

            // Set Signed By
            setContent('#signedBy', () => {
                const signedBy = manpowerRequest.manpower_request_signed_by;
                
                if(manpowerRequest.request_status === "Rejected for signing")
                    return `<div class="text-danger">This request has been rejected for signing</div>`
                else if(isEmptyOrNull(signedBy))
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
                const signedAt = manpowerRequest.signed_at;
                return isEmptyOrNull(signedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : `
                        <div class="text-nowrap">${ formatDateTime(signedAt, "Date") }</div>
                        <div class="text-nowrap">${ formatDateTime(signedAt, "Time") }</div>
                    `
            });

            // Set Approved At
            setContent('#approvedAt', () => {
                const approvedAt = manpowerRequest.reviewed_at;
                return (isEmptyOrNull(approvedAt) || manpowerRequest.request_status === 'Rejected') 
                    ? `<div class="text-secondary font-italic">No status</div>`
                    : formatDateTime(approvedAt, "DateTime")
            });

            // Set Approved At
            setContent('#completedAt', () => {
                const completedAt = manpowerRequest.completed_at;
                return isEmptyOrNull(completedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>`
                    : formatDateTime(completedAt, "Date")
            });

            /** Remove Preloaders */
            $('#jobPostDetailsLoader').remove();
            showElement('#jobPostDetailsContainer');

            $('#optionsLoader').remove();
            showElement('#optionsContainer');
        },
        error: () => toastr.error('There was a problem in getting job post details')
    });
}

/** View Job Post */
ifSelectorExist('#jobPostDetails', () => getJobPostDetails());


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
        toolbar: SUMMERNOTE_TOOLBAR
    });

    /** Get Job Post ID from the URL */
    const jobPostID = window.location.pathname.split("/")[3];

    /** Get Job Post Information */
    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {

            /** SET JOB POST CONTENT */

            const manpowerRequest = result.manpower_request;
            const minSalary = manpowerRequest.min_monthly_salary;
            const maxSalary = manpowerRequest.max_monthly_salary;

            // Set Job Post ID for form submission
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
                return isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)
                    ? () => {
                        hideElement('#salaryRangeField');
                        return `<div class="text-secondary font-italic">Unset</div>`
                    }
                    : `${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}`;
            });

            // Set Deadline
            setContent('#deadlineForSummary', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) 
                    ? `<div class="text-secondary font-italic">Unset</div>` 
                    : `
                        <div>${ formatDateTime(deadline, "Full Date") }</div>
                        <div>${ formatDateTime(deadline, "Time") }</div>
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
            setContent('#dateRequested', formatDateTime(manpowerRequest, "DateTime"));

            // Set Deadline
            setContent('#deadline', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) ? 'Unset' : formatDateTime(deadline, "DateTime");
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
            setContent('#requestNature', manpowerRequest.request_nature);

            // Set Suggested Salary
            setContent('#suggestedSalary', () => {
                return isEmptyOrNull(minSalary) && isEmptyOrNull(minSalary)
                    ? `<div class="text-secondary font-italic">Unset</div>`
                    : `${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}`;
            });

            // Set Request Description
            setContent('#requestDescription', manpowerRequest.content);

            
            // Set Signed By
            setContent('#signedBy', () => {
                const signedBy = manpowerRequest.manpower_request_signed_by;
                
                if(manpowerRequest.request_status === "Rejected for signing")
                    return `<div class="text-danger">This request has been rejected for signing</div>`
                else if(isEmptyOrNull(signedBy))
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
                const signedAt = manpowerRequest.signed_at;
                return isEmptyOrNull(signedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>` 
                    : `
                        <div class="text-nowrap">${ formatDateTime(signedAt, "Date") }</div>
                        <div class="text-nowrap">${ formatDateTime(signedAt, "Time") }</div>
                    `
            });

            // Set Approved By
            setContent('#approvedBy', () => {
                const approvedBy = manpowerRequest.manpower_request_reviewed_by;
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
            setContent('#approvedAt', formatDateTime(manpowerRequest.reviewed_at, "DateTime"));

            // Set Completed At
            setContent('#completedAt', () => {
                const completedAt = manpowerRequest.completed_at;
                return isEmptyOrNull(completedAt) 
                    ? `<div class="text-secondary font-italic">No status</div>`
                    : formatDateTime(completedAt, "Date");
            });


            /** FOR JOB POST TIMELINE */
            setJobPostTimeline('#jobPostTimeline', result);


            /** SET INPUTS */
            
            // Set Job Description
            $('#jobDescription').summernote('code', result.content);

            if(result.salary_is_visible) checkElement('#salaryRangeIsVisible');

            // Set Expiration Date
            if(!isEmptyOrNull(result.expiration_date)) {
                checkElement('#expirationDate');
                showElement('#openUntilField');
                setValue('#openUntil', result.expiration_date);
            }

            /** Remove Loaders */
            $('#editJobPostFormLoader').remove();
            showElement('#editJobPostFormContainer');
        },
        error: () => toastr.error('There was an error in getting job post details')
    });
    
    /** Validate Summernote */
    $('#jobDescription').summernote().on('summernote.change', () => {
        if($('#jobDescription').summernote('isEmpty')) {
            $('#jobDescription').next().addClass('border-danger');
            showElement('#jobDescriptionInvalidFeedback');
            disableElement('#saveBtn');
        } else {
            $('#jobDescription').next().removeClass('border-danger');
            hideElement('#jobDescriptionInvalidFeedback');
            enableElement('#saveBtn');
        }
    });
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
            required: true,
            afterToday: true
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
            required: "Please select a date",
            afterToday: "Date and Time must be in the future"
        }
    },
    submitHandler: () => {
        showModal('#confirmUpdateJobPostModal');
        return false;
    }
});

/** Update Job Post */
onClick('#confirmUpdateJobPostBtn', () => {

    // Set buttons to loading state
    btnToLoadingState('#confirmUpdateJobPostBtn');
    disableElement('#cancelUpdateJobPostBtn');

    // Generate form Data
    const formData = generateFormData('#editJobPostForm');

    // Get expiration date
    const expirationDate = isChecked('#expirationDate') ? formatDateTime(formData.get('openUntil')) : null;

    // Set Data
    const data = {
        content: formData.get('jobDescription'),
        salary_is_visible: isChecked('#salaryRangeIsVisible'),
        expiration_date: expirationDate
    }

    // Call if error
    const ifError = () => {
        hideModal('#confirmUpdateJobPostModal');
        toastr.error('There was an error in updating a job post');
    }

    // Update Job Post
    PUT_ajax(`${ R_API_ROUTE }job-posts/${ formData.get('jobPostID') }`, data, {
        success: result => {
            if(result) {
                setSessionedAlertAndRedirect({
                    theme: 'info',
                    message: 'A posted job is successfully updated',
                    redirectURL: `${ R_WEB_ROUTE }job-posts`
                });
            } else ifError()
        },
        error: () => ifError()
    });
});


/**
 * ==============================================================================
 * END RECRUITING
 * ==============================================================================
*/


/** End Recruiting */
const endRecruiting = (jobPostID) => {
    setValue('#jobPostID', jobPostID);
    showModal('#endRecruitingModal');
}

/** Validate Form */
validateForm('#endRecruitingForm', {
    submitHandler: () => {

        // Set Buttons to loading state
        btnToLoadingState('#confirmEndRecruitingBtn');
        disableElement('#cancelEndRecruitingBtn');

        const jobPostID = generateFormData('#endRecruitingForm').get('jobPostID');

        PUT_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }/end-recruiting`, {}, {
            success: result => {
                if(result) {

                    // Hide Modal
                    hideModal('#endRecruitingModal');

                    // Reload DataTable
                    ifSelectorExist('#jobPostsDT', () => reloadDataTable('#jobPostsDT'));

                    // Reload Job Post Details
                    ifSelectorExist('#jobPostDetails', () => getJobPostDetails());

                    // Set Buttons to loading state
                    btnToUnloadState('#confirmEndRecruitingBtn', `
                        <span>Yes, end it!</span>
                        <i class="fas fa-check ml-1"></i>
                    `);
                    enableElement('#cancelEndRecruitingBtn');

                    // Show Alert
                    toastr.info('A job post has been ended its recruiment');
                }
            },
            error: () => toastr.error('There was an error in ')
        });

        return false;
    }
});

onHideModal('#endRecruitingModal', () => resetForm('#endRecruitingForm'));
