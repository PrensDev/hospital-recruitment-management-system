"use strict";

// Set Date Range Filter
const setDateRangeFilter = (start, end, label) => { 
    setContent('#selectedFilter', label)
    setContent('#selectedDate', `From <b>${ formatDateTime(start, 'MMM. D, YYYY; hh:mm A') }</b> to <b>${ formatDateTime(end, 'MMM. D, YYYY; hh:mm A') }</b>`)
}


/** Initialize Charts */

// Manpower Requests Bar Chart
const manpowerRequestBarChart = new Chart($('#manpowerRequestsBarChart').get(0).getContext('2d'), {
    type: 'bar',
    data: {
        datasets: [{
            label: "Manpower Requests",
            backgroundColor: '#68c389',
            borderColor: '#16a34a',
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM. d, yyyy'
                    },
                },
                min: START_DATE_RANGE.format("YYYY-MM-DD"),
                max: END_DATE_RANGE.format("YYYY-MM-DD"),
            },
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        },
        parsing: {
            xAxisKey: 'created_at',
            yAxisKey: 'total',
        }
    },
});

// Manpower Request Pie Chart
const manpowerRequestPieChart = new Chart($('#manpowerRequestsPieChart').get(0).getContext('2d'), {
    type: 'pie',
    data: CHART_CONFIG.NO_DATA
});


/** Render data content */
const renderData = (start, end) => {

    const DATE_RANGE = TEMPLATE.URL_QUERY_PARAM.DATE_RANGE(start.format(), end.format());

    /** Manpower Requests Count */
    GET_ajax(`${ ROUTE.API.DM }requisitions/analytics${ DATE_RANGE }`, {
        success: result => {

            // Update info box
            setContent('#manpowerRequestsCountForInfoBox', formatNumber(result.total));
            
            // Update footer manpower request data
            setContent({
                '#totalRequests': formatNumber(result.total),
                '#totalOnGoingRequests': formatNumber(result.on_going.total),
                '#totalCompletedRequests': formatNumber(result.completed),
                '#totalRejectedRequests': formatNumber(result.rejected.total),
            });

            // Configure Pie Chart
            const chartConfig = manpowerRequestPieChart.config;

            if(result.total > 0) chartConfig.data = {
                labels: ['On Going','Completed','Rejected',],
                datasets: [{
                    data: [
                        result.on_going.total,
                        result.completed, 
                        result.rejected.total
                    ],
                    backgroundColor : [
                        CHART_BG.SUCCESS,
                        CHART_BG.INFO,
                        CHART_BG.DANGER
                    ],
                    borderColor:  [
                        CHART_BD.SUCCESS,
                        CHART_BD.INFO,
                        CHART_BD.DANGER
                    ],
                    borderWidth: 2
                }]
            }
            else chartConfig.data = CHART_CONFIG.NO_DATA

            // Commit Update
            manpowerRequestPieChart.update();

            // Hide Chart Loader
            hideElement('#manpowerRequestsBarChartLoader');
            showElement('#manpowerRequestsBarChart');
        },
        error: () => toastr.error('There was an error in getting completed manpower requests count')
    });
    
    /** Hired Applicants Count */
    GET_ajax(`${ ROUTE.API.DM }hired-applicants/analytics`, {
        success: result => setContent('#hiredApplicantsCount', formatNumber(result.hired_applicants)),
        error: () => toastr.error('There was an error in getting hired applicants count')
    });
    
    /** Onboarding Employees Count */
    GET_ajax(`${ ROUTE.API.DM }onboarding-employees/analytics`, {
        success: result => setContent('#onboardingEmployeesCount', formatNumber(result.total)),
        error: () => toastr.error('There was an error in getting onboarding employees count')
    });

    /** Manpower Requests Data */
    GET_ajax(`${ ROUTE.API.DM }requisitions/data${ DATE_RANGE }`, {
        success: result => {

            // Configure Bar Chart
            const chartConfig = manpowerRequestBarChart.config;
            
            // Update minimum and maximum x axis
            chartConfig.options.scales.x.min = start.format("YYYY-MM-DD");
            chartConfig.options.scales.x.max = end.format("YYYY-MM-DD");
            
            // Update days labels
            chartConfig.data.labels = daysLabels(start, end);

            // Update datasets
            chartConfig.data.datasets[0].data = result;

            // Commit update
            manpowerRequestBarChart.update();
        },
        error: () => toastr.error('There was an error in getting manpower requests data')
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