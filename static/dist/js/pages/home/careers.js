/** Get Available Jobs Details */
ifSelectorExist('#availableJobDetails', () => {
    const jobPostID = window.location.pathname.split('/')[2];

    console.log(jobPostID);

    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/${ jobPostID }`,
        type: 'GET',
        success: result => {
            // console.log(result)

            const manpowerRequest = result.manpower_request;

            // Set Vacant Position
            setContent('#vacantPosition', manpowerRequest.vacant_position.name);

            // Set Date Posted
            const datePosted = result.created_at;
            setContent('#datePosted', `Posted ${ formatDateTime(datePosted, "Date") }`);
            setContent('#datePostedHumanized', fromNow(datePosted))

            // Set Content
            setContent('#jobDescription', result.content);

            // Set Employment Type
            setContent('#employmentType', manpowerRequest.employment_type);

            // Set Salary Range
            if(result.salary_is_visible) {
                setContent('#salaryRange', `
                    P ${ manpowerRequest.min_monthly_salary } - P ${ manpowerRequest.max_monthly_salary }
                `)
            } else {
                hideElement('#salaryRangeDisplay')
            }

            // Set Open Until
            setContent('#openUntil', () => {
                const expiresAt = result.expiration_date;
                if(isEmptyOrNull(expiresAt)) {
                    return `No deadline`
                } else  {
                    return `
                        <div>${ formatDateTime(expiresAt, "Date") }</div>
                        <div class="small text-secondary">${ fromNow(expiresAt) }</div>
                    `
                }
            })
        },
        error: () => {
            toastr.error('There was an error in getting job details')
        }
    });
});


/** Get All Jobs */
$(() => {
    $.ajax({
        url: `${ BASE_URL_API }home/job-posts`,
        type: 'GET',
        success: result => {
            console.log(result)
        },
        error: () => toastr.error('There was an error in getting all job posts')
    })
});


/** Search Job */
$(() => {
    const query = "Recruiter"

    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/search`,
        type: "POST",
        data: {query: query},
        success: result => {
            console.log(result)
        },
        error: () => toastr.error('There was an error in getting search results')
    })
})