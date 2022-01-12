"use strict";

(() => {

    /** On Going Job Posts */
    GET_ajax(`${ ROUTE.API.R }job-posts/analytics`, {
        success: result => setContent('#onGoingJobPostsCount', formatNumber(result.on_going)),
        error: () => toastr.error('There was an error in getting on going job posts count')
    });

    /** Applicants for Evaluation Count */
    GET_ajax(`${ ROUTE.API.R }applicants/analytics`, {
        success: result => setContent('#applicantsForEvaluationCount', formatNumber(result.for_evaluation)),
        error: () => toastr.error('There was an error in getting applicants for evaluation count')
    })
})();