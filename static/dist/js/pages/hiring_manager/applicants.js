/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
*/

// Get Job Post ID from the URL
const jobPostID = window.location.pathname.split("/")[3];


/**
 * ==============================================================================
 * JOB POST SUMMARY
 * ==============================================================================
*/

/** Set Job Post Summary */
ifSelectorExist('#jobPostSummary', () => {
    GET_ajax(`${ H_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            const manpowerRequest = result.manpower_request

            // Set Job Post Position
            setContent('#position', manpowerRequest.vacant_position.name);

            // Set Job Post Status
            setContent('#jobPostStatus', () => {
                const expiresAt = result.expiration_date;
                if(isEmptyOrNull(expiresAt) || isAfterToday(expiresAt))
                    return dtBadge('info', 'On Going');
                else if(isBeforeToday(expiresAt))
                    return dtBadge('danger', 'Ended');
                else
                    return dtBadge('warning', 'Last day today');
            });

            //  Set Job Posted At
            setContent('#jobPostedAt',`Posted ${ formatDateTime(result.created_at, 'Date') }`);

            // Set Staff needed
            setContent('#staffsNeeded', () => {
                const staffsNeeded = manpowerRequest.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' } `;
            });
            
            // Set Employment Type
            setContent('#employmentType', manpowerRequest.employment_type);

            // Set Deadline
            setContent('#deadline', () => {
                const deadline = manpowerRequest.deadline;
                return isEmptyOrNull(deadline) ? 'No deadline' : `Until ${ formatDateTime(deadline, "Date") }`
            });

            hideElement('#jobPostSummaryLoader');
            showElement('#jobPostSummary');
        },
        error: () => toastr.error('There was an error in getting job post details')
    });

});


/**
 * ==============================================================================
 * APPLICANTS PER JOB ANALYTICS
 * ==============================================================================
*/

// Applicants Per Job Analytics
const applicantsPerJobAnalytics = () => {
    
    const jobPostID = window.location.pathname.split("/")[3];

    GET_ajax(`${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/analytics`, {
        success: result => {

            // Show Count or Hide Element
            const a = (s, c) => { if(c > 0) {
                setContent(s, formatNumber(c))
                showElement(s);
            }}

            // Set Total Applicants
            a('#totalApplicantsCount', formatNumber(result.total));

            // Set For Screening Count
            a('#forScreeningCount', formatNumber(result.for_screening));

            // Set For Evaluation Count
            a('#forInterviewCount', formatNumber(result.for_interview));

            // Set Hired Count
            a('#hiredCount', formatNumber(result.hired));

            // Set Rejected Count
            const rejected = result.rejected.from_screening + result.rejected.from_interview;
            a('#rejectedCount', formatNumber(rejected));
        },
        error: () => toastr.error('There was an error in getting applciants analytics')
    });
}

ifSelectorExist('#applicantsMenu', () => applicantsPerJobAnalytics());


/**
 * ==============================================================================
 * VIEW APPLICANT DETAILS
 * ==============================================================================
*/

/** View Applicant Details */
const viewApplicantDetails = (applicantID) => {
    GET_ajax(`${ H_API_ROUTE }applicants/${ applicantID }`, {
        success: result => {
            console.log(result);

            // Set Applicant ID
            setValue('#applicantID', result.applicant_id)

            // Set Applicant Full Name
            setContent('#applicantFullName', formatName('F M. L, S', {
                firstName: result.first_name,
                middleName: result.middle_name,
                lastName: result.last_name,
                suffixName: result.suffixName
            }));

            // Set Applicant Contact Number
            setContent("#applicantContactNumber", result.contact_number);

            // Set Applicant Email
            setContent("#applicantEmail", result.email);

            // Set Applicant Date Applied
            setContent("#applicantDateApplied", `
                <div>${  formatDateTime(result.created_at, "Date") }</div>
                <div class="small text-secondary">${  fromNow(result.created_at) }</div>
            `);

            // Set Applicants Details Modal
            showModal('#applicantDetailsModal');
        },
        error: () => {
            toastr.error('There was an error in getting applicant details')
        }
    })
}


/**
 * ==============================================================================
 * FOR SCREENING APPLICANTS
 * ==============================================================================
*/

/** Applicants for Screening DataTable */
initDataTable('#applicantsForScreeningDT', {
    // debugMode: true,
    url: `${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/for-screening`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                return formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name,
                })
            }
        },

        // Contact Number
        { data: 'contact_number' },

        // Email
        { data: 'email' },

        // Date Applied
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, "MMM. D, YYYY") }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                `
            }
        },

        // User Actions
        {
            data: null,
            render: data => {
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex" 
                                role="button" 
                                onclick="viewApplicantDetails('${ data.applicant_id }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Details</div>
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
 * FOR INTERVIEW APPLICANTS
 * ==============================================================================
*/

/** Applicants for Interview DataTable */
initDataTable('#applicantsForInterviewDT', {
    // debugMode: true,
    url: `${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/for-interview`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                return formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name,
                })
            }
        },

        // Contact Number
        { data: 'contact_number' },

        // Email
        { data: 'email' },

        // Date Applied
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, "MMM. D, YYYY") }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                `
            }
        },

        // User Actions
        {
            data: null,
            render: data => {
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex" 
                                role="button" 
                                onclick="viewApplicantDetails('${ data.applicant_id }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Details</div>
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
 * HIRED APPLICANTS
 * ==============================================================================
*/

/** Hired Applicants DataTable */
initDataTable('#hiredApplicantsDT', {
    // debugMode: true,
    url: `${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/hired`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                return formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name,
                })
            }
        },

        // Contact Number
        { data: 'contact_number' },

        // Email
        { data: 'email' },

        // Date Applied
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, "MMM. D, YYYY") }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                `
            }
        },

        // User Actions
        {
            data: null,
            render: data => {
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex" 
                                role="button" 
                                onclick="viewApplicantDetails('${ data.applicant_id }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Details</div>
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
 * REJECTED APPLICANTS
 * ==============================================================================
*/

/** Rejected Applicants DataTable */
initDataTable('#rejectedApplicantsDT', {
    // debugMode: true,
    url: `${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/rejected`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                return formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name,
                })
            }
        },

        // Contact Number
        { data: 'contact_number' },

        // Email
        { data: 'email' },

        // Date Applied
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, "MMM. D, YYYY") }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                `
            }
        },

        // User Actions
        {
            data: null,
            render: data => {
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex" 
                                role="button" 
                                onclick="viewApplicantDetails('${ data.applicant_id }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Details</div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    ]
});