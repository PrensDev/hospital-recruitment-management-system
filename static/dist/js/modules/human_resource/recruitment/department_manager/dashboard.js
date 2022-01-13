"use strict";

(() => {

/** Complete Manpower Requests Count */
GET_ajax(`${ ROUTE.API.DM }requisitions/analytics`, {
    success: result => setContent('#completedManpowerRequestsCount', formatNumber(result.completed)),
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

/** Manpower Requests Chart */
var manpowerRequestChart = new Chart($('#manpowerRequestsChart').get(0).getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(234,123,123)'
            }
        ]
    },
});
manpowerRequestChart.render();

})();