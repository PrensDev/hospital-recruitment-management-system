/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
*/

/** Job Post ID from the URL */
const jobPostID = window.location.pathname.split("/")[3];


/**
 * ==============================================================================
 * VIEW ALL APPLICANTS
 * ==============================================================================
*/

/** Initialize Applicants DataTable */
initDataTable('#applicantsDT', {
    // debugMode: true,
    url: `${ ROUTE.API.R }applicants`,
    enableButtons: true,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            class: 'w-100',
            render: data => {
                const applicantFullName = formatName('F M. L, S', {
                    firstName  : data.first_name,
                    middleName : data.middle_name,
                    lastName   : data.last_name,
                    suffixName : data.suffix_name,
                });
                return `
                    <div>${ applicantFullName }</div>
                    ${ TEMPLATE.SUBTEXT(data.email) }
                    ${ TEMPLATE.SUBTEXT(data.contact_number) }
                `
            }
        },

        // Position
        { data: 'applied_job.manpower_request.vacant_position.name' },

        // Employment Type
        { data: 'applied_job.manpower_request.employment_type' },

        // Date Applied
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, "MMM. D, YYYY") }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                `;
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const status = data.status;
                switch(status) {
                    case "For evaluation":
                        return TEMPLATE.DT.BADGE('warning', TEMPLATE.ICON_LABEL('sync-alt', status))
                    case "For screening":
                        return TEMPLATE.DT.BADGE('secondary', TEMPLATE.ICON_LABEL('search', status))
                    case "For interview":
                        return TEMPLATE.DT.BADGE('info', TEMPLATE.ICON_LABEL('user-friends', status))
                    case "Hired":
                        return TEMPLATE.DT.BADGE('success', TEMPLATE.ICON_LABEL('handshake', status))
                    case "Contract signed":
                        return TEMPLATE.DT.BADGE('primary', TEMPLATE.ICON_LABEL('file-signature', status))
                    case "Rejected from evaluation":
                    case "Rejected from screening":
                    case "Rejected from interview":
                        return TEMPLATE.DT.BADGE('danger', TEMPLATE.ICON_LABEL('times', status))
                    default:
                        return TEMPLATE.DT.BADGE('light', "Invalid data")
                }
            }
        },

        // User Actions
        {
            data: null,
            render: data => {
                return TEMPLATE.DT.OPTIONS(`
                    <div 
                        class="dropdown-item d-flex" 
                        role="button" 
                        onclick="viewApplicantDetails('${ data.applicant_id }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                        <div>View Details</div>
                    </div>
                `);
            }
        }
    ]
});


/**
 * ==============================================================================
 * APPLICANTS ANALYTICS
 * ==============================================================================
*/

// Applicants Analytics
const applicantsAnalytics = () => {
    GET_ajax(`${ ROUTE.API.R }applicants/analytics`, {
        success: result => {
            setContent({
                '#totalApplicantsCount': formatNumber(result.total),
                '#forEvaluationCount': formatNumber(result.for_evaluation),
                '#forScreeningCount': formatNumber(result.for_screening),
                '#forInterviewCount': formatNumber(result.for_interview),
                '#rejectedApplicantsCount': formatNumber(result.rejected.total)
            });
        },
        error: () => toastr.error('There was an error in getting applciants analytics')
    });
}

ifSelectorExist('#applicantsAnalytics', () => applicantsAnalytics());


/**
 * ==============================================================================
 * VIEW APPLICANT DETAILS
 * ==============================================================================
*/

/** View Applicant Details */
const viewApplicantDetails = (applicantID) => {
    GET_ajax(`${ ROUTE.API.R }applicants/${ applicantID }`, {
        success: result => {

            /** APPLICANT DETAILS */

            // Set Applicant ID
            setValue('#applicantID', result.applicant_id)

            const applicantFullName = formatName('F M. L, S', {
                firstName  : result.first_name,
                middleName : result.middle_name,
                lastName   : result.last_name,
                suffixName : result.suffixName
            });

            // Set Applicant Full Name
            setContent('#applicantFullName', applicantFullName);

            // Set Applicant Contact Number
            setContent("#applicantContactNumber", result.contact_number);

            // Set Applicant Email
            setContent("#applicantEmail", result.email);

            // Set Resume Link
            $('#viewResumeBtn').attr('href', `${ URL_RESUME_FILES }${ result.resume }`);


            /** APPLICANT TIMELINE */
            setApplicantTimeline('#applicantTimeline', result);

            // Remove Applicant Timeline Loader
            hideElement('#applicantTimelineLoader');
            showElement('#applicantTimeline');

            /** Show Modal */
            showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting applicant details')
    });
}


/**
 * ==============================================================================
 * JOB POST SUMMARY
 * ==============================================================================
*/

/** Set Job Post Summary */
ifSelectorExist('#jobPostSummary', () => {
    GET_ajax(`${ ROUTE.API.R }job-posts/${ jobPostID }`, {
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
            
            $('#jobPostSummaryLoader').remove();
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
    GET_ajax(`${ ROUTE.API.R }job-posts/${ jobPostID }/applicants/analytics`, {
        success: result => {

            // Show Count or Hide Element
            const a = (s, c) => { if(c > 0) {
                setContent(s, formatNumber(c));
                showElement(s);
            }}

            // Set Total Applicants
            a('#totalApplicantsCount', result.total);

            // Set For Evaluation Count
            a('#forEvaluationCount', result.for_evaluation);

            // Set Evaluated Applicants Count
            const evaluatedCount = 
                result.for_screening 
                + result.for_interview 
                + result.hired 
                + result.contract_signed 
                + result.rejected.from_screening 
                + result.rejected.from_interview
            ;
            
            a('#evaluatedCount', evaluatedCount);

            // Set Rejected From Evaluation Count
            a('#rejectedCount', result.rejected.from_evaluation);

            // Remove Loader
            $('#menuLoader').remove();
            showElement('#menu');
        },
        error: () => toastr.error('There was an error in getting applciants analytics')
    });
}

ifSelectorExist('#applicantsMenu', () => applicantsPerJobAnalytics());


/**
 * ==============================================================================
 * APPLICANTS FOR EVALUATION
 * ==============================================================================
*/

/** Applicants for Evaluation DataTable */
initDataTable('#applicantsForEvaluationDT', {
    url: `${ ROUTE.API.R }job-posts/${ jobPostID }/applicants/for-evaluation`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                const applicantFullName = formatName('F M. L, S', {
                    firstName  : data.first_name,
                    middleName : data.middle_name,
                    lastName   : data.last_name,
                    suffixName : data.suffix_name,
                });
                return `
                    <div>${ applicantFullName }</div>
                    ${ TEMPLATE.SUBTEXT(data.email) }
                    ${ TEMPLATE.SUBTEXT(data.contact_number) }
                `
            }
        },

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
                return TEMPLATE.DT.OPTIONS(`
                    <div 
                        class="dropdown-item d-flex" 
                        role="button" 
                        onclick="viewApplicantDetails('${ data.applicant_id }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-user-cog mr-1"></i></div>
                        <div>Evaluate applicant</div>
                    </div>
                `);
            }
        }
    ]
});


/**
 * ==============================================================================
 * EVALUATED APPLICANTS
 * ==============================================================================
*/

/** Applicants For Evaluation DataTable */
initDataTable('#evaluatedApplicantsDT', {
    // debugMode: true,
    url: `${ ROUTE.API.R }job-posts/${ jobPostID }/applicants/evaluated`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                const applicantFullName = formatName('F M. L, S', {
                    firstName  : data.first_name,
                    middleName : data.middle_name,
                    lastName   : data.last_name,
                    suffixName : data.suffix_name,
                });
                return `
                    <div>${ applicantFullName }</div>
                    <div class="small text-secondary">${ data.email }</div>
                    <div class="small text-secondary">${ data.contact_number }</div>
                `
            }
        },

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
                return TEMPLATE.DT.OPTIONS(`
                    <div 
                        class="dropdown-item d-flex" 
                        role="button" 
                        onclick="viewApplicantDetails('${ data.applicant_id }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                        <div>View Details</div>
                    </div>
                `)
            }
        }
    ]
});


/**
 * ==============================================================================
 * APPLICANTS REJECTED FROM EVALUATION
 * ==============================================================================
*/

/** Applicants For Evaluation DataTable */
initDataTable('#rejectedApplicantsDT', {
    // debugMode: true,
    url: `${ ROUTE.API.R }job-posts/${ jobPostID }/applicants/rejected`,
    columns: [
        
        // Created at (Hidden for default sorting)
        { data: 'created_at', visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                const applicantFullName = formatName('F M. L, S', {
                    firstName  : data.first_name,
                    middleName : data.middle_name,
                    lastName   : data.last_name,
                    suffixName : data.suffix_name,
                });
                return `
                    <div>${ applicantFullName }</div>
                    ${ TEMPLATE.SUBTEXT(data.email) }
                    ${ TEMPLATE.SUBTEXT(data.contact_number) }
                `
            }
        },

        // Date Applied
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, "MMM. D, YYYY") }</div>
                    ${ TEMPLATE.SUBTEXT(fromNow(dateApplied)) }               
                `
            }
        },

        // User Actions
        {
            data: null,
            render: data => {
                return TEMPLATE.DT.OPTIONS(`
                    <div 
                        class="dropdown-item d-flex" 
                        role="button" 
                        onclick="viewApplicantDetails('${ data.applicant_id }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                        <div>View Details</div>
                    </div>
                `)
            }
        }
    ]
});


/**
 * ==============================================================================
 * APPLICANT EVALUATION
 * ==============================================================================
*/

/** If user select reject for evaluation */
$("#approveForScreening, #rejectFromEvaluation").on('change', () => {
    const requestStatus = $(`input[name="applicantStatus"]:checked`).val();
    if(requestStatus == "For screening") hideElement("#remarksField");
    if(requestStatus == "Rejected from evaluation") showElement("#remarksField");
    ifSelectorExist('#submitBtn', () => enableElement('#submitBtn'));
});

/** On Applicant details modal is going to be hidden  */
onHideModal('#applicantDetailsModal', () => {
    resetForm('#applicantEvaluationForm');
    hideElement("#remarksField");
    disableElement('#submitBtn');
    showElement('#applicantTimelineLoader');
    hideElement('#applicantTimeline');
    $('#applicantDetailsTab').tab('show');
});

/** Validate Applicant Evaluation Form */
validateForm('#applicantEvaluationForm', {
    rules: {
        applicantID: {
            required: true
        },
        applicantStatus: {
            required: true
        },
        remarks: {
            required: true
        }
    },
    messages: {
        applicantID: {
            required: "This must have a value"
        },
        applicantStatus: {
            required: "Please select a status for this applicant"
        },
        remarks: {
            required: "You must insert remarks here for rejected this applicant from evaluation"
        }
    },
    submitHandler: () => evaluateApplicant()
});

/** Evaluate Applicant */
const evaluateApplicant = () => {
    
    // Buttons to loading state
    btnToLoadingState('#submitBtn');
    disableElement('#applicationDetailsCloseModalBtn');

    // Get Form Data
    const formData = generateFormData('#applicantEvaluationForm');
    const get = (name) => { return formData.get(name) }

    // Get Data
    const applicantStatus = get('applicantStatus');
    const data = {
        status: applicantStatus,
        remarks: applicantStatus === 'Rejected from evaluation' ? get('remarks') : null
    }

    // If error
    const ifError = () => {

        // Hide Applicant Details Modal
        hideModal('#applicantDetailsModal');

        // Set modal buttons to unload state
        btnToUnloadState('#submitBtn', `
            <span>Submit</span>
            <i class="fas fa-check ml-1"></i>
        `);
        enableElement('#applicationDetailsCloseModalBtn');

        // Show error alert
        toastr.error('There was an error while updating applicant evaluation');
    }

    // Evaluate applicant
    PUT_ajax(`${ ROUTE.API.R }applicants/${ get('applicantID') }`, data, {
        success: result => {
            if(result) {

                // Hide Applicant Details Modal
                hideModal('#applicantDetailsModal');

                // Set modal buttons to unload state
                btnToUnloadState('#submitBtn', TEMPLATE.LABEL_ICON("Submit", "check"));
                enableElement('#applicationDetailsCloseModalBtn');

                // Reload Applicants Per Job Analytics
                applicantsPerJobAnalytics();

                // Reload DataTable
                reloadDataTable('#applicantsForEvaluationDT');

                // Show Info Alert
                toastr.info('An applicant is successfully evaluated');
            } else ifError()
        },
        error: () => ifError()
    });
}

