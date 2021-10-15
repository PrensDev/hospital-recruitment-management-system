/**
 * ==============================================================================
 * HIRED APPLICANTS
 * ==============================================================================
*/

initDataTable('#hiredApplicantsDT', {
    // debugMode: true,
    url: `${ DH_API_ROUTE }hired-applicants`,
    columns: [
        
        // Created at (for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                return formatName("F M. L, S", {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name
                })
            }
        },

        // Position
        {
            data: null,
            render: data => {
                return `Test`
            }
        },

        // Applied at
        {
            data: null,
            render: data => {
                const appliedAt = data.created_at;
                return `
                    <div>${ formatDateTime(appliedAt, 'MMM. D, YYYY') }</div>
                    <div>${ formatDateTime(appliedAt,'Time') }</div>
                    <div class="small text-secondary">${ fromNow(appliedAt) }</div>
                `
            }
        },

        // Hired at
        {
            data: null,
            render: data => {
                const hiredAt = data.hired_at;
                return `
                    <div>${ formatDateTime(hiredAt, 'MMM. D, YYYY') }</div>
                    <div>${ formatDateTime(hiredAt,'Time') }</div>
                    <div class="small text-secondary">${ fromNow(hiredAt) }</div>
                `
            }
        },

        // Action
        {
            data: null,
            class: 'text-center',
            render: data => {
                return `s`
            }
        }
    ]
})