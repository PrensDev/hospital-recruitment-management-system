"use strict";

// Set Date Range Filter
const setDateRangeFilter = (start, end, label) => { 
    setContent('#selectedFilter', label)
    setContent('#selectedDate', `From <b>${ formatDateTime(start, 'MMM. D, YYYY; hh:mm A') }</b> to <b>${ formatDateTime(end, 'MMM. D, YYYY; hh:mm A') }</b>`)
}


/** INITIALIZE CHARTS */
/**
 * TODO: initialize charts here
 */

/** RENDER DATA */

const renderData = () => {
    /**
     * TODO: create functions to call data from api
     */
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