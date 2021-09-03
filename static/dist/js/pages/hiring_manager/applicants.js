/**
 * ==============================================================================
 * JOB POST SUMMARY
 * ==============================================================================
*/

/** Set Job Post Summary */
ifSelectorExist('#jobPostSummary', () => {

    const jobPostID = window.location.pathname.split("/")[3];

    GET_ajax(`${ H_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            const manpowerRequest = result.manpower_request

            // Set Job Post Position
            setContent('#position', manpowerRequest.vacant_position.name);

            // Set Job Post Status
            setContent('#jobPostStatus', () => {
                const expiresAt = result.expiration_date;
                if(isEmptyOrNull(expiresAt) || isAfterToday(expiresAt))
                    return dtBadge('info', 'On Going');
                else if(isBeforeToday(expiresAt))
                    return dtBadge('danger', 'Ended');
                else
                    return dtBadge('warning', 'Last day today');
            });

            //  Set Job Posted At
            setContent('#jobPostedAt',`Posted ${ formatDateTime(result.created_at, 'Date') }`);

            // Set Staff needed
            setContent('#staffsNeeded', () => {
                const staffsNeeded = manpowerRequest.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' } `;
            });
            
            // Set Employment Type
            setContent('#employmentType', manpowerRequest.employment_type);

            // Set Deadline
            setContent('#deadline', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) ? 'No deadline' : `Until ${ formatDateTime(deadline, "Date") }`
            })
        },
        error: () => toastr.error('There was an error in getting job post details')
    });

});


/**
 * ==============================================================================
 * APPLICANTS PER JOB ANALYTICS
 * ==============================================================================
*/

// Applicants Per Job Analytics
const applicantsPerJobAnalytics = () => {
    
    const jobPostID = window.location.pathname.split("/")[3];

    GET_ajax(`${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/analytics`, {
        success: result => {

            // Show Count or Hide Element
            const a = (s, c) => c > 0 ? setContent(s, formatNumber(c)) : hideElement(s);

            // Set Total Applicants
            a('#totalApplicantsCount', formatNumber(result.total));

            // Set For Screening Count
            a('#forScreeningCount', formatNumber(result.for_screening));

            // Set For Evaluation Count
            a('#forInterviewCount', formatNumber(result.for_interview));

            // Set Hired Count
            a('#hiredCount', formatNumber(result.hired));

            // Set Rejected Count
            const rejected = result.rejected.from_screening + result.rejected.from_interview;
            a('#rejectedCount', formatNumber(rejected));
        },
        error: () => toastr.error('There was an error in getting applciants analytics')
    });
}

ifSelectorExist('#applicantsMenu', () => applicantsPerJobAnalytics());
