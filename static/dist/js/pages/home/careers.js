/** Get Available Jobs Details */
ifSelectorExist('#availableJobDetails', () => {
    const jobPostID = window.location.pathname.split('/')[2];

    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/${ jobPostID }`,
        type: 'GET',
        success: result => {
            // console.log(result)

            const manpowerRequest = result.manpower_request;

            // Set Job Post ID for the form
            setValue('#jobPostID', result.job_post_id);

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


/** Validate Application Form */
validateForm('#applicationForm', {
    rules: {
        jobPostID: {
            required: true
        },
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
        resume: {
            required: true
        }
    },
    messages: {
        jobPostID: {
            required: "This must have a value"
        },
        firstName: {
            required: "Your first name is required"
        },
        lastName: {
            required: "Your last name is required"
        },
        contactNumber: {
            required: "Your contact number is required"
        },
        email: {
            required: "Your email is required",
            email: "This must be a valid email"
        },
        resume: {
            required: "Please upload your resume in PDF type"
        }
    },
    submitHandler: () => {
        const formData = generateFormData('#applicationForm');
        const get = (name) => { return formData.get(name) }

        // Set Applicant Full Name
        setContent('#applicantFullName', formatName('F M. L, S', {
            firstName: get('firstName'),
            middleName: get('middleName'),
            lastName: get('lastName'),
            suffixName: get('suffixName') 
        }));

        // Set Applicant Contact Number
        setContent('#applicantContactNumber', get('contactNumber'));

        // Set Applicant Email
        setContent('#applicantEmail', get('email'));

        // Show Modal
        showModal('#confirmApplicationModal');
        return false;
    }
});


/** If Confirm Application Modal is going to be hidden */
onHideModal('#confirmApplicationModal', () => {
    uncheckElement('#confirmReview');
    disableElement('#submitApplicationBtn');

    setContent('#applicantFullName', '');
    setContent('#applicantContactNumber', '');
    setContent('#applicantEmail', '');
})


/**  */
// onChange('#contactNumber', () => {
//     const contactNumber = $('#contactNumber');
//     if(!isEmptyOrNull(contactNumber.val())) {
//         if(contactNumber.inputmask("isComplete")) {
//             contactNumber.remmoveClass('is-invalid');
//             hideElement('#contactNumber-error');
//             setContent('#contactNumber-error', '');
//         } else {
//             contactNumber.addClass('is-invalid');
//             showElement('#contactNumber-error');
//             setContent('#contactNumber-error', 'Please fill up all the blanks');
//         }
//     }
// })


/** If confirm review checkbox has been checked */
onChange('#confirmReview', () => isChecked('#confirmReview') ? enableElement('#submitApplicationBtn') : disableElement('#submitApplicationBtn'));


/** If submit application bbutton is click */
onClick('#submitApplicationBtn', () => {
    const formData = generateFormData('#applicationForm');
    const get = (name) => { return formData.get(name) }

    const data = {
        job_post_id: get('jobPostID'),
        first_name: get('firstName'),
        middle_name: get('middleName'),
        last_name: get('lastName'),
        suffix_name: get('suffixName'),
        contact_number: get('contactNumber'),
        email: get('email'),
        resume: "resume.pdf"
    }

    $.ajax({
        url: `${ BASE_URL_API }home/apply`,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: result => {
            if(result) {
                hideModal('#confirmApplicationModal');
                resetForm('#applicationForm');
                uncheckElement('#confirmReview');
                toastr.success('Your application is successfulyy submitted');
            }
        },
        error: () => {
            hideModal('#confirmApplicationModal');
            uncheckElement('#confirmReview');
            toastr.error('There was a problem in submitting your application')
        }
    });
})


/** Get All Jobs */
ifSelectorExist('#availableJobList', () => {
    $.ajax({
        url: `${ BASE_URL_API }home/job-posts`,
        type: 'GET',
        success: result => {
            console.log(result)

            let jobList = '';

            result.forEach(r => {
                const manpowerRequest = r.manpower_request;

                const salaryRange = r.salary_is_visible 
                    ? `
                        <div>
                            <i style="width: 2rem" class="fas fa-money-bill-wave text-success"></i>
                            <span>P 20000 - P 50000</span>
                        </div>
                    `
                    : '';

                const expirationDate = isEmptyOrNull(r.expiration_date) 
                    ? `
                        <div>
                            <i style="width: 2rem" class="fas fa-clock text-danger"></i>
                            <span>Still open for all applicants</span>
                        </div>
                    ` 
                    : `
                        <div>
                            <i style="width: 2rem" class="fas fa-clock text-danger"></i>
                            <span>Open until August 31, 2021</span>
                        </div>
                    `

                jobList += `
                    <div class="col-md-6 col-12">
                        <div class="card card-primary card-outline h-100 mb-3">
                            <div class="card-body d-flex flex-column justify-content-between h-100">

                                <div>
                                    <div class="mb-3">
                                        <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="h5 text-primary mb-0">${ manpowerRequest.vacant_position.name }</a>
                                        <div class="small text-muted">
                                            <span>Posted ${ formatDateTime(r.created_at, "Date") }</span>
                                            <span class="mx-1">&middot;</span>
                                            <span>${ fromNow(r.created_at) }</span>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <div>
                                            <i style="width: 2rem" class="fas fa-user-tie text-success"></i>
                                            <span>${ manpowerRequest.employment_type }</span>
                                        </div>
                                        ${ salaryRange }
                                        ${ expirationDate }
                                    </div>
                                </div>
                                
                                <div class="text-right">
                                    <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="btn btn-secondary">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            setContent('#availableJobList', jobList);
        },
        error: () => toastr.error('There was an error in getting all job posts')
    })
});


/** Search */
validateForm('#searchJobForm', {
    submitHandler: () => {
        const formData = generateFormData('#searchJobForm');

        const searchQuery = formData.get('searchQuery');

        if(!isEmptyOrNull(searchQuery)) {
            location.assign(`${ BASE_URL_WEB }careers/?query=${ searchQuery }`);
        }

        return false;
    }
});


ifSelectorExist('#searchResultList', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const query = urlParams.get('query');

    setValue('#searchQuery', query);

    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/search`,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({query: query}),
        success: result => {
            console.log(result)
        },
        error: () => toastr.error('There was an error in getting search results')
    })
});