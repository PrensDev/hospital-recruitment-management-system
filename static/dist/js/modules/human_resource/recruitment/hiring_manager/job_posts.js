"use strict";

/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */
const jobPostID = window.location.pathname.split('/')[3];


/**
 * ==============================================================================
 * JOB POST ANALYTICS
 * ==============================================================================
 */

/** Job Post Analytics */
ifSelectorExist('#jobPostsAnalytics', () => {
    GET_ajax(`${ ROUTE.API.H }job-posts/analytics`, {
        success: result => {
            if(result) {
                setContent({
                    '#totalJobPostsCount': result.total,
                    '#ongoingJobPostsCount': result.on_going,
                    '#endedJobPostsCount': result.ended
                });
            } else toastr.error('There was an error in getting job posts analytics')
        },
        error: () => toastr.error('There was an error in getting job posts analytics')
    })
});


/**
 * ==============================================================================
 * VIEW ALL JOB POSTS
 * ==============================================================================
 */

/** Initialize Job Posts DataTable */
initDataTable('#jobPostsDT', {
    url: `${ ROUTE.API.H }job-posts`,
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
                const applicants = data.applicants;
                let applicantsCounter = 0;
                applicants.forEach(a => {
                    if(!(a.status == "For evaluation" || a.status == "Rejected from evaluation")) applicantsCounter++;
                });
                return applicantsCounter == 0 
                    ? TEMPLATE.UNSET('No applicants yet')
                    : `${ applicantsCounter } applicant${ applicantsCounter > 1 ? 's' : '' }`
            }
        },

        // Application Status
        {
            data: null,
            render: data => {
                const expirationDate = data.expiration_date;
                if(isAfterToday(expirationDate) || isEmptyOrNull(expirationDate))
                    return TEMPLATE.DT.BADGE('info', 'On Going');
                else if(isBeforeToday(expirationDate))
                    return TEMPLATE.DT.BADGE('danger', 'Ended');
                else
                    return TEMPLATE.DT.BADGE('warning', 'Last day today');
            }
        },

        // Open until
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const expirationDate = data.expiration_date;
                return isEmptyOrNull(expirationDate)
                    ? TEMPLATE.UNSET('No expiration')
                    : `
                        <div>${ formatDateTime(expirationDate, "MMM. D, YYYY") }</div>
                        ${ TEMPLATE.SUBTEXT(fromNow(expirationDate)) }
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
                        <a 
                            class="dropdown-item d-flex"
                            href="${ ROUTE.WEB.H }job-posts/${ data.job_post_id }/applicants"
                        >
                            <div style="width: 2rem"><i class="fas fa-users mr-1"></i></div>
                            <div>View Applicants</div>
                        </a>
                    `
                    : '';

                return TEMPLATE.DT.OPTIONS(`
                    <a 
                        class="dropdown-item d-flex"
                        href="${ ROUTE.WEB.H }job-posts/${ jobPostID }"
                    >
                        <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                        <div>View Job Post</div>
                    </a>
                    ${ applicants }
                    <a 
                        class="dropdown-item d-flex"
                        href="${ ROUTE.WEB.H }manpower-requests/${ requisitionID }"
                    >
                        <div style="width: 2rem"><i class="fas fa-file-alt mr-1"></i></div>
                        <div>View Manpower Request</div>
                    </a>
                `)
            }
        }
    ]
});


/**
 * ==============================================================================
 * VIEW JOB POST DETAILS
 * ==============================================================================
 */

/** View Job Post Details */
ifSelectorExist('#jobPostDetails', () => {
    GET_ajax(`${ ROUTE.API.H }job-posts/${ jobPostID }`, {
        success: result => {
            const manpowerRequest = result.manpower_request;

            /** JOB POST DETAILS */

            // Set Job Post Status
            const expiresAt = result.expiration_date;

            if(isEmptyOrNull(expiresAt) || isAfterToday(expiresAt))
                setContent('#jobPostStatus', TEMPLATE.BADGE('info', 'On Going'))
            else if(isBeforeToday(expiresAt))
                setContent('#jobPostStatus', TEMPLATE.BADGE('danger', 'Ended'))
            else
                setContent('#jobPostStatus', TEMPLATE.BADGE('warning', 'Last Day Today'))

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
            setContent('#jobPostOptions', `
                <a class="btn btn-sm btn-secondary btn-block" target="_blank" href="${ BASE_URL_WEB }careers/${ jobPostID }">
                    ${ TEMPLATE.ICON_LABEL('eye', 'View post in public portal') }
                </a>
                <a class="btn btn-sm btn-secondary btn-block" href="${ ROUTE.WEB.H }job-posts/${ jobPostID }/applicants">
                    ${ TEMPLATE.ICON_LABEL('users', 'View applicants') }
                </a>
            `);


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
                        return TEMPLATE.UNSET('Mo salary has been set')
                    }
                    : `${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}`;
            });

            // Set Deadline
            setContent('#deadlineForSummary', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) 
                    ? TEMPLATE.UNSET('No deadline has been set') 
                    : `
                        <div>${ formatDateTime(deadline, "Full Date") }</div>
                        <div>${ formatDateTime(deadline, "Time") }</div>
                        ${ TEMPLATE.SUBTEXT(fromNow(deadline)) }
                    `
            });

            setContent('#manpowerRequestSummaryBtnContainer', `
                <a 
                    class="btn btn-sm btn-secondary btn-block"
                    href="${ ROUTE.WEB.H }manpower-requests/${ manpowerRequest.requisition_id }"
                >View Full Details</button>
            `)

            /** JOB POST TIMELINE */
            setJobPostTimeline('#jobPostTimeline', result);

            /** Remove Loaders */
            $('#jobPostDetailsLoader').remove();
            showElement('#jobPostDetailsContainer');
        },
        error: () => toastr.error('There was an error in getting job post details')
    });
});