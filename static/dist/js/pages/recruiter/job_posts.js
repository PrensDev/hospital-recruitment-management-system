/**
 * ==============================================================================
 * SUBMIT JOB POST
 * ==============================================================================
 */


/** Load Primary Input */
ifSelectorExist('#createJobPostForm', () => {
    const requisitionID = window.location.pathname.split("/")[3]
    GET_ajax(`${ R_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            console.log(result)
        },
        error: () => toastr.error('There was an error in getting requisition details')
    })
})


/** Vacant Position For Add Select2 */
$('#vacantPositionForAdd').select2({
    placeholder: "Please the vacant position",
})


/** Job Nature For Add Select 2 */
$('#jobNatureForAdd').select2({
    placeholder: "Please select the nature of job",
    minimumResultsForSearch: -1,
});


/** Employment Type For Add Select2 */
$('#employmentTypeForAdd').select2({
    placeholder: "Please select an employment type",
    minimumResultsForSearch: -1,
});


/** Job Description For Add Summernote */
$('#jobDescriptionForAdd').summernote({
    height: 500,
    placeholder: "Write the description of job here",
    toolbar: [
        ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
        ['para', ['ol', 'ul', 'paragraph']],
        ['table', ['table']]
    ]
})


/** Validate Add Job Post Form */
validateForm('#createJobPostForm', {
    rules: {
        vacantPosition: {
            required: true,
        },
        jobNature: {
            required: true
        },
        staffsNeeded: {
            min: 1,
            required: true
        },
        employmentType: {
            required: true
        },
        jobDescription: {
            required: true
        },
    },
    messages:{
        vacantPosition: {
            required: 'Position is required',
        },
        jobNature: {
            required: 'Nature of request is required'
        },
        staffsNeeded: {
            min: 'The number of staffs must at least 1',
            required: 'No. of vacany is required'
        },
        employmentType: {
            required: 'Employment type is required'
        },
        jobDescription: {
            required: 'Job description is required'
        },
    },
    submitHandler:() => submitJobPost()
});


/** Submit Job Post */
const submitJobPost = () => {
    alert('Submitted')
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

                if(isAfterToday(expirationDate)) {
                    return dtBadge('info', 'On Going');
                } else if(isBeforeToday(expirationDate)) {
                    return dtBadge('danger', 'Ended');
                } else {
                    return dtBadge('warning', 'Last day today');
                }
            }
        },

        // Exprires at
        {
            data: null,
            render: data => {
                const expirationDate = data.expiration_date;

                return `
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
                                onclick="viewManpowerRequestDetails('${ requisitionID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
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
const viewJobPost = (jobPostID) => {
    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            console.log(result)
        },
        error: () => toastr.error('There was a problem in getting job post details')
    })
}