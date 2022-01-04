/**
 * ==============================================================================
 * VARIABLES
 * ==============================================================================
 */

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
const page = urlParams.get('page') == null ? 1 : urlParams.get('page');

/**
 * ==============================================================================
 * GET ALL AVAILABLE JOBS
 * ==============================================================================
 */

/** Get All Jobs */
ifSelectorExist('#availableJobList', () => {

    // Get all job post per page
    $.ajax({
        url: `${ BASE_URL_API }home/job-posts?page=${ page }`,
        type: 'GET',
        success: result => {
            let jobList = '';

            if(result.length > 0) {
                result.forEach(r => {
                    const manpowerRequest = r.manpower_request;

                    const salaryRange = r.salary_is_visible 
                        ? `<div>
                                <i style="width: 1.25rem" class="fas fa-money-bill-wave text-secondary mr-1"></i>
                                <span>${ formatCurrency(manpowerRequest.min_monthly_salary) } - ${ formatCurrency(manpowerRequest.max_monthly_salary) }</span>
                            </div>`
                        : '';

                    const expirationDate = isEmptyOrNull(r.expiration_date) 
                        ? `<div>
                                <i style="width: 1.25rem" class="fas fa-clock text-secondary mr-1"></i>
                                <span>Still open for all applicants</span>
                            </div>` 
                        : `<div>
                                <i style="width: 1.25rem" class="fas fa-clock text-danger mr-1"></i>
                                <span>Open until August 31, 2021</span>
                            </div>`

                    jobList += `
                        <div class="col-12 col-md-6 d-flex align-items-stretch flex-column">
                            <div class="card d-flex flex-fill">
                                <div class="card-body">

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
                                                <i style="width: 1.25rem" class="fas fa-user-tie text-secondary mr-1"></i>
                                                <span>${ manpowerRequest.employment_type }</span>
                                            </div>
                                            ${ salaryRange }
                                            ${ expirationDate }
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="card-footer text-right">
                                    <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="btn btn-sm btn-primary">
                                        ${ TEMPLATE.ICON_LABEL('list', 'View Details') }
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                jobList = `
                    <div class="col-12">
                        <div class="py-5 text-center">
                            <h3>Oops! We are full</h3>
                            <div>Sorry, but we don't have vacant job for now</div>
                        </div>
                    </div>
                `;
            }

            setContent('#availableJobList', jobList);
        },
        error: () => toastr.error('There was an error in getting all job posts')
    });

    // Get job post analytics
    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/analytics`,
        type: 'GET',
        success: result => {
            const total = result.total;

            if(total > 0) {
                setContent({
                    '#rowsDisplay': `Showing ${ FETCH_ROWS } out of ${ total }`,
                    '#pageDisplay': `Page ${ page } out of ${ Math.ceil(total/FETCH_ROWS) }`
                });
                setPagination('#pagination', {
                    query: `${ BASE_URL_WEB }careers?page=[page]`,
                    totalRows: total,
                    currentPage: page
                });
                showElement('#pagination');
            } else {
                setContent({
                    '#rowsDisplay': `No result`,
                    '#pageDisplay': `No pages to be display`
                });
            }
        }
    })
});


/**
 * ==============================================================================
 * GET AVAILABLE JOB DETAILS
 * ==============================================================================
 */

/** Get Available Jobs Details */
ifSelectorExist('#availableJobDetails', () => {
    const jobPostID = window.location.pathname.split('/')[2];

    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/${ jobPostID }`,
        type: 'GET',
        success: result => {
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
            if(result.salary_is_visible)
                setContent('#salaryRange', `${ formatCurrency(manpowerRequest.min_monthly_salary) } - ${ formatCurrency(manpowerRequest.max_monthly_salary) }`)
            else
                hideElement('#salaryRangeDisplay')

            // Set Open Until
            setContent('#openUntil', () => {
                const expiresAt = result.expiration_date;
                return isEmptyOrNull(expiresAt)
                    ? TEMPLATE.UNSET('No deadline')
                    : `
                        <div>${ formatDateTime(expiresAt, "Date") }</div>
                        ${ TEMPLATE.SUBTEXT(fromNow(expiresAt)) }
                    `
            });

            if(isBeforeToday(result.expiration_date)) {
                $('#applicationForm').remove();
                showElement('#applicationsNotAvailable');
            } else {
                $('#applicationsNotAvailable').remove();
            }

            $('#vacantPositionLoader').remove();
            $('#availableJobDetailsLoader').remove();

            showElement('#vacantPositionContainer');
            showElement('#availableJobDetails');
        },
        error: () => toastr.error('There was an error in getting job details')
    });
});


/**
 * ==============================================================================
 * JOB APPLICATION
 * ==============================================================================
 */

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
            required: true,
            accept: 'application/pdf'
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
            required: "Your resume is required to upload",
            accept: "Please upload your resume in PDF type"
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
});

/** If confirm review checkbox has been checked */
onChange('#confirmReview', () => isChecked('#confirmReview') ? enableElement('#submitApplicationBtn') : disableElement('#submitApplicationBtn'));

/** If submit application button is click */
onClick('#submitApplicationBtn', () => {
    
    // Set button in loading state
    btnToLoadingState('#submitApplicationBtn');
    disableElement('#cancelApplicationBtn');
    disableElement('#confirmReview');

    // Generate Form Data
    const formData = generateFormData('#applicationForm');
    const get = (name) => { return formData.get(name) }

    // Get resume file
    const resume = $('#resume')[0].files[0];
    const fd = new FormData();
    fd.append('file', resume);

    // Upload resume
    $.ajax({
        url: `${ BASE_URL_API }home/upload/resume`,
        type: 'POST',
        processData: false,
        contentType: false,
        data: fd,
        success: result => {

            // Get the data from form
            const data = {
                job_post_id: get('jobPostID'),
                first_name: get('firstName'),
                middle_name: get('middleName'),
                last_name: get('lastName'),
                suffix_name: get('suffixName'),
                contact_number: get('contactNumber'),
                email: get('email'),
                resume: result.new_file
            }

            // Record Applicant's Data
            $.ajax({
                url: `${ BASE_URL_API }home/apply`,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: result2 => {
                    if(result2) {

                        // Hide Confirm Application Modal
                        hideModal('#confirmApplicationModal');

                        // Set buttons to unload state
                        setContent('#submitApplicationBtn', `
                            <span>Submit</span>
                            <i class="fas fa-file-export ml-1"></i>
                        `);
                        enableElement('#cancelApplicationBtn');
                        enableElement('#confirmReview');

                        // Reset Form
                        resetForm('#applicationForm');

                        // Uncheck Confirm Review
                        uncheckElement('#confirmReview');

                        // Show Success Alert
                        toastr.success('Your application is successfully submitted. Please check your email.');
                    }
                },
                error: () => {
                    
                    // Hide Confirm Application Modal
                    hideModal('#confirmApplicationModal');

                    // Set buttons to unload state
                    setContent('#submitApplicationBtn', `
                        <span>Submit</span>
                        <i class="fas fa-file-export ml-1"></i>
                    `);
                    enableElement('#cancelApplicationBtn');
                    enableElement('#confirmReview');

                    // Uncheck Confirm Review
                    uncheckElement('#confirmReview');

                    // Show Error Alert
                    toastr.error('There was a problem in submitting your application')
                }
            });
        },
        error: () => {

            // Hide Confirm Application Modal
            hideModal('#confirmApplicationModal');

            // Set buttons to unload state
            btnToUnloadState('#submitApplicationBtn', `
                <span>Submit</span>
                <i class="fas fa-file-export ml-1"></i>
            `);
            enableElement('#cancelApplicationBtn');
            enableElement('#confirmReview');

            // Uncheck Confirm Review
            uncheckElement('#confirmReview');

            // Show error alert
            toastr.error('There was a problem in uploading your resume')
        }
    });
});


/**
 * ==============================================================================
 * SEARCH JOB
 * ==============================================================================
 */

/** Validate Form Search */
validateForm('#searchJobForm', {
    submitHandler: () => {
        const formData = generateFormData('#searchJobForm');
        const searchQuery = formData.get('searchQuery');
        isEmptyOrNull(searchQuery) 
            ? location.assign(`${ BASE_URL_WEB }careers`)
            : location.assign(`${ BASE_URL_WEB }careers/search?query=${ searchQuery }`)
        return false;
    }
});

/** For Search Result */
ifSelectorExist('#searchResultList', () => {
    setValue('#searchQuery', query);

    const data = JSON.stringify({query: query});

    // Get Search Results
    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/search?page=${ page }`,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: result => {
            let jobList = '';

            if(result.length > 0) {
                result.forEach(r => {
                    const manpowerRequest = r.manpower_request;

                    const salaryRange = r.salary_is_visible 
                        ? `<div>
                                <i style="width: 1.25rem" class="fas fa-money-bill-wave text-secondary mr-1"></i>
                                <span>${ formatCurrency(manpowerRequest.min_monthly_salary) } - ${ formatCurrency(manpowerRequest.max_monthly_salary) }</span>
                            </div>`
                        : '';

                    const expirationDate = isEmptyOrNull(r.expiration_date) 
                        ? `<div>
                                <i style="width: 1.25rem" class="fas fa-clock text-secondary mr-1"></i>
                                <span>Still open for all applicants</span>
                            </div>` 
                        : `<div>
                                <i style="width: 1.25rem" class="fas fa-clock text-danger mr-1"></i>
                                <span>Open until August 31, 2021</span>
                            </div>`

                    jobList += `
                        <div class="col-12 col-md-6 d-flex align-items-stretch flex-column">
                            <div class="card d-flex flex-fill">
                                <div class="card-body">

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
                                                <i style="width: 1.25rem" class="fas fa-user-tie text-secondary mr-1"></i>
                                                <span>${ manpowerRequest.employment_type }</span>
                                            </div>
                                            ${ salaryRange }
                                            ${ expirationDate }
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="card-footer text-right">
                                    <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="btn btn-sm btn-primary">
                                        <i class="fas fa-list mr-1"></i>
                                        <span>View Details</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                jobList = `
                    <div class="d-flex flex-column justify-content-center align-items-center text-center">
                        <div class="py-5 d-flex justify-content-center">
                            <img 
                                draggable="false"
                                src="${ BASE_URL_WEB }static/dist/img/not_found.svg" 
                                alt="Not found" 
                                width="25%"
                            >
                        </div>
                        <h4>Oops! We cannot find your request.</h4>
                        <p class="text-secondary">Please check if spelling is correct or try other keywords.</p>
                    </div>
                `;
            }

            setContent('#searchResultList', jobList);
        },
        error: () => toastr.error('There was an error in getting search results')
    });

    // Get Search Result Analytics
    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/search/analytics`,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: result => {
            const total = result.total;

            if(total > 0) {
                setContent('#rowsDisplay', `Showing ${ FETCH_ROWS } out of ${ total }`);
                setContent('#pageDisplay', `Page ${ page } out of ${ Math.ceil(total/FETCH_ROWS) }`);

                setPagination('#pagination', {
                    query: `${ BASE_URL_WEB }careers/search?query=${ query }&page=[page]`,
                    totalRows: total,
                    currentPage: page
                });
                showElement('#pagination');
            } else {
                setContent('#rowsDisplay', `No result`);
                setContent('#pageDisplay', `No pages to be displayed`);
            }
        }
    });
});