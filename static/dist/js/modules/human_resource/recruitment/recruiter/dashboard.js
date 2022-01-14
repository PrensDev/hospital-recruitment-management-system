"use strict";

// Set Date Range Filter
const setDateRangeFilter = (start, end, label) => { 
    setContent('#selectedFilter', label)
    setContent('#selectedDate', `From <b>${ formatDateTime(start, 'MMM. D, YYYY; hh:mm A') }</b> to <b>${ formatDateTime(end, 'MMM. D, YYYY; hh:mm A') }</b>`)
}


/** Initialize Charts */
/**
 * TODO: Initialize Charts here
 */


const renderData = (start, end) => {

    const DATE_RANGE = TEMPLATE.URL_QUERY_PARAM.DATE_RANGE(start.format(), end.format());
    
    /** On Going Job Posts */
    GET_ajax(`${ ROUTE.API.R }job-posts/analytics${ DATE_RANGE }`, {
        success: result => setContent('#onGoingJobPostsCount', formatNumber(result.on_going)),
        error: () => toastr.error('There was an error in getting on going job posts count')
    });

    /** Applicants for Evaluation Count */
    GET_ajax(`${ ROUTE.API.R }applicants/analytics${ DATE_RANGE }`, {
        success: result => setContent('#applicantsForEvaluationCount', formatNumber(result.for_evaluation)),
        error: () => toastr.error('There was an error in getting applicants for evaluation count')
    });
}


(() => {

/** Initialize DateRange Filter */
setDateRangeFilter(START_DATE_RANGE, END_DATE_RANGE, DEFAULT_FILTER_RANGE);

/** Initialize DateRangeFilter for Filter Date */
$('#filterDate').daterangepicker({
    timePicker: true,
    startDate: START_DATE_RANGE,
    endDate: END_DATE_RANGE,
    ranges: DATE_RANGES
}, (start, end, label) => {

    // Change DateRange Filter
    setDateRangeFilter(start, end, label);

    // Refresh charts and quantitive data
    renderData(start, end);
});

// Initialize charts and quantitative data
renderData(START_DATE_RANGE, END_DATE_RANGE);

})();