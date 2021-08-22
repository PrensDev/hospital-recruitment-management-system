/**
 * ==============================================================================
 * SUBMIT JOB POST
 * ==============================================================================
 */

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
validateForm('#addJobPostForm', {
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
