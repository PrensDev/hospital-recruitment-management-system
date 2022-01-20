"use strict";

/**
 * ==============================================================================
 * VARIABLES
 * ==============================================================================
 */

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
const jobCategoryParam = urlParams.get('jobCategory');
const employmentTypeParam = urlParams.get('employmentType');
const page = urlParams.get('page') == null ? 1 : urlParams.get('page');


/**
 * ==============================================================================
 * FOR SEARCH INPUT SETUP
 * ==============================================================================
 */

ifSelectorExist('#searchJobForm', () => {

    // For job categories
    GET_ajax(`${ BASE_URL_API }home/job-categories`, {
        success: result => {
            let jobCategory = $('#jobCategory');
            jobCategory.empty();
            jobCategory.append(`<option></option>`);
            
            result.length > 0
                ? result.forEach(c => jobCategory.append(`<option value="${ c.job_category_id }">${ c.name }</option>`))
                : jobCategory.append(`<option disabled>No data</option>`)

            /** Employment Type For Add Select2 */
            $('#jobCategory').select2({
                placeholder: "Please select a category",
                minimumResultsForSearch: -1,
            });

            $('#jobCategory').val(jobCategoryParam).trigger('change');
        },
        error: () => toastr.error('There was an error in getting job categories')
    });


    const employmentTypes = [
        {"employement_type_id": '1', "name": "Full Time"},
        {"employement_type_id": '2', "name": "Part Time"},
        {"employement_type_id": '3', "name": "Intern/OJT"},
        {"employement_type_id": '4', "name": "Contract"},
    ]

    let employmentType = $('#employmentType');
    employmentType.empty();
    employmentType.append(`<option></option>`);
    
    employmentTypes.length > 0
        ? employmentTypes.forEach(t => employmentType.append(`<option value="${ t.employement_type_id }">${ t.name }</option>`))
        : employmentType.append(`<option disabled>No data</option>`)

    /** Job Category Select2 */
    $('#employmentType').select2({
        placeholder: "Choose employment type here",
        minimumResultsForSearch: -1,
    });

    $('#employmentType').val(employmentTypeParam).trigger('change');
});


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

                    const jobCategory = () => {
                        const jobCategorization = r.job_categorized_as;
                        return `
                            <div>
                                <i style="width: 1.25rem" class="fas fa-th-list text-center text-secondary mr-1"></i>
                                <span>${ jobCategorization.is_removed ? "Others" : jobCategorization.name }</span>
                            </div>
                        `
                    }

                    const salaryRange = r.salary_is_visible 
                        ? `<div>
                                <i style="width: 1.25rem" class="fas fa-handshake text-center text-secondary mr-1"></i>
                                <span>${ formatCurrency(manpowerRequest.min_monthly_salary) } - ${ formatCurrency(manpowerRequest.max_monthly_salary) }</span>
                            </div>`
                        : '';

                    const expirationDate = isEmptyOrNull(r.expiration_date) 
                        ? `<div>
                                <i style="width: 1.25rem" class="fas fa-clock text-center text-secondary mr-1"></i>
                                <span>Still open for all applicants</span>
                            </div>` 
                        : `<div>
                                <i style="width: 1.25rem" class="fas fa-clock text-center text-danger mr-1"></i>
                                <span>Open until ${ formatDateTime(r.expiration_date, 'Date') }</span>
                            </div>`

                    jobList += `
                        <div class="col-12 col-md-6 d-flex align-items-stretch flex-column">
                            <div class="card d-flex flex-fill">
                                <div class="card-body">

                                    <div>
                                        <div class="mb-3">
                                            <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="h5 text-primary mb-0 font-weight-bold">${ manpowerRequest.vacant_position.name }</a>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="small text-muted">
                                                    <span>Posted ${ formatDateTime(r.created_at, "Date") }</span>
                                                    <span class="mx-1">&middot;</span>
                                                    <span>${ fromNow(r.created_at) }</span>
                                                </div>
                                                <div class="small text-muted">
                                                    <i class="fas fa-eye mr-1"></i>
                                                    <span>${ r.views }</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            ${ jobCategory() }
                                            <div>
                                                <i style="width: 1.25rem" class="fas fa-briefcase text-center text-secondary mr-1"></i>
                                                <span>${ manpowerRequest.employment_type }</span>
                                            </div>
                                            ${ salaryRange }
                                            ${ expirationDate }
                                            <div class="pt-3 career-content-preview">
                                                ${ r.content }
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="card-footer text-right">
                                    <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="btn btn-sm btn-primary">
                                        ${ TEMPLATE.LABEL_ICON('View More', 'caret-right') }
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                jobList = `
                    <div class="col-12">
                        <div class="d-flex flex-column justify-content-center align-items-center text-center">
                            <div class="py-5 d-flex justify-content-center">
                                <img 
                                    draggable="false"
                                    src="${ BASE_URL_WEB }static/dist/img/careers_full.svg" 
                                    alt="Not found" 
                                    width="25%"
                                >
                            </div>
                            <h4>Oops! We are full now!</h4>
                            <p class="text-secondary">We don't have job posts yet. Please come back again soon.</p>
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
    });
});


/**
 * ==============================================================================
 * GET AVAILABLE JOB DETAILS
 * ==============================================================================
 */

/** Get Available Jobs Details */
ifSelectorExist('#availableJobDetails', () => {
    const jobPostID = window.location.pathname.split('/')[2];

    // Set Job Post Details
    $.ajax({
        url: `${ BASE_URL_API }home/job-posts/${ jobPostID }`,
        type: 'GET',
        success: result => {
            const manpowerRequest = result.manpower_request;

            // Set Job Post ID for the form
            setValue('#jobPostID', result.job_post_id);

            const datePosted = result.created_at;
            setContent({
                '#vacantPosition': manpowerRequest.vacant_position.name,
                '#datePosted': `Posted ${ formatDateTime(datePosted, "Date") }`,
                "#jobPostViews": () => {
                    const views = result.views;
                    return `This post was visited ${ views } ${ pluralize('time', views) }`
                },
                '#datePostedHumanized': fromNow(datePosted),
                '#jobDescription': result.content,
                '#employmentType': manpowerRequest.employment_type,
                '#jobCategory': result.job_categorized_as.name
            });

            // Set Salary Range
            result.salary_is_visible
                ? setContent('#salaryRange', `${ formatCurrency(manpowerRequest.min_monthly_salary) } - ${ formatCurrency(manpowerRequest.max_monthly_salary) }`)
                : hideElement('#salaryRangeDisplay')

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

    // For page views update
    const incrementPageViews = () => {
        PUT_ajax(`${ BASE_URL_API }home/job-posts/${ jobPostID }/increment-views`, null, {
            success: views => {
                setContent('#jobPostViews', `This post was visited ${ views } ${ pluralize('time', views) }`)
            },
            error: () => toastr.error('There was an error in updating page views')
        })
    }

    /**
     * Check if job post is already visited
     * 
     * Logic: The jobPostID is stored in an array, and that
     * array is stored in sessionStorage. If jobPostID is not yet
     * in array, the view counter will increment and the jobPostID
     * will be pushed  in array so even user will refresh the
     * page, it will not re-iterate even though user will visit it
     * multiple times, unless tab will close
     */
    let visitedJobPosts = JSON.parse(sessionStorage.getItem('visited_job_posts'))
    if(!visitedJobPosts) {
        sessionStorage.setItem('visited_job_posts', JSON.stringify([jobPostID]));
        incrementPageViews();
    } else {
        const isVisited = visitedJobPosts.includes(jobPostID)
        if(!isVisited) {
            visitedJobPosts.push(jobPostID)
            sessionStorage.setItem('visited_job_posts', JSON.stringify(visitedJobPosts));
            incrementPageViews();
        }
    }

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

        // Set Applicant details
        setContent({
            '#applicantFullName': formatName('F M. L, S', {
                firstName: formData.get('firstName'),
                middleName: formData.get('middleName'),
                lastName: formData.get('lastName'),
                suffixName: formData.get('suffixName') 
            }),
            '#applicantContactNumber': formData.get('contactNumber'),
            '#applicantEmail': formData.get('email')
        });

        // Show Modal
        showModal('#confirmApplicationModal');
        return false;
    }
});

/** If Confirm Application Modal is going to be hidden */
onHideModal('#confirmApplicationModal', () => {
    uncheckElement('#confirmReview');
    disableElement('#submitApplicationBtn');
    setContent({
        '#applicantFullName': '',
        '#applicantContactNumber': '',
        '#applicantEmail': ''
    });
});

/** If confirm review checkbox has been checked */
onChange('#confirmReview', () => isChecked('#confirmReview') 
    ? enableElement('#submitApplicationBtn') 
    : disableElement('#submitApplicationBtn')
);

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

            const ifError = () => {
                // Hide Confirm Application Modal
                hideModal('#confirmApplicationModal');

                // Set buttons to unload state
                setContent('#submitApplicationBtn', TEMPLATE.LABEL_ICON('Submit','file-export'));
                enableElement('#cancelApplicationBtn');
                enableElement('#confirmReview');

                // Uncheck Confirm Review
                uncheckElement('#confirmReview');
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
                        setContent('#submitApplicationBtn', TEMPLATE.LABEL_ICON('Submit','file-export'));
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
                    ifError();
                    toastr.error('There was a problem in submitting your application')
                }
            });
        },
        error: () => {
            ifError();
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
        const formData = generateFormData('#searchJobForm')
        const searchQuery = formData.get('searchQuery');
        const jobCategory = formData.get('jobCategory');
        const employmentType = formData.get('employmentType');

        if(isEmptyOrNull(searchQuery) && isEmptyOrNull(jobCategory) && isEmptyOrNull(searchQjobCategoryuery)) 
            location.assign(`${ BASE_URL_WEB }careers`)
        else {
            const queryParams = `?query=${ searchQuery }&jobCategory=${ jobCategory }&employmentType=${ employmentType }`
            location.assign(`${ BASE_URL_WEB }careers/search${ queryParams }`)
        }
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

                    const jobCategory = () => {
                        const jobCategorization = r.job_categorized_as;
                        return `
                            <div>
                                <i style="width: 1.25rem" class="fas fa-th-list text-center text-secondary mr-1"></i>
                                <span>${ jobCategorization.is_removed ? "Others" : jobCategorization.name }</span>
                            </div>
                        `
                    }

                    const salaryRange = r.salary_is_visible 
                        ? `<div>
                                <i style="width: 1.25rem" class="fas fa-handshake text-center text-secondary mr-1"></i>
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
                                            <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="h5 font-weight-bold text-primary mb-0">${ manpowerRequest.vacant_position.name }</a>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="small text-muted">
                                                    <span>Posted ${ formatDateTime(r.created_at, "Date") }</span>
                                                    <span class="mx-1">&middot;</span>
                                                    <span>${ fromNow(r.created_at) }</span>
                                                </div>
                                                <div class="small text-muted">
                                                    <i class="fas fa-eye mr-1"></i>
                                                    <span>${ r.views }</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            ${ jobCategory() }
                                            <div>
                                                <i style="width: 1.25rem" class="fas fa-briefcase text-center text-secondary mr-1"></i>
                                                <span>${ manpowerRequest.employment_type }</span>
                                            </div>
                                            ${ salaryRange }
                                            ${ expirationDate }
                                            <div class="pt-3 career-content-preview">
                                                ${ r.content }
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="card-footer text-right">
                                    <a href="${ BASE_URL_WEB }careers/${ r.job_post_id }" class="btn btn-sm btn-primary">
                                        ${ TEMPLATE.LABEL_ICON('View More', 'caret-right') }
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
                setContent({
                    '#rowsDisplay': `Showing ${ FETCH_ROWS } out of ${ total }`,
                    '#pageDisplay': `Page ${ page } out of ${ Math.ceil(total/FETCH_ROWS) }`
                });

                setPagination('#pagination', {
                    query: `${ BASE_URL_WEB }careers/search?query=${ query }&page=[page]`,
                    totalRows: total,
                    currentPage: page
                });
                showElement('#pagination');
            } else {
                setContent({
                    '#rowsDisplay': `No result`,
                    '#pageDisplay': `No pages to be displayed`
                });
            }
        }
    });
});