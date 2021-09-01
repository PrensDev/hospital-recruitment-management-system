/**
 * ==============================================================================
 * VIEW ALL APPLICANTS
 * ==============================================================================
*/

/** Initialize Applicants DataTable */
initDataTable('#applicantsDT', {
    // debugMode: true,
    url: `${ R_API_ROUTE }applicants`,
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
                    <div>${ formatDateTime(dateApplied, "Date") }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                `;
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const status = data.status;
                if(status === "For evaluation") {
                    return dtBadge('warning', `
                        <i class="fas fa-redo mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(status === "For screening") {
                    return dtBadge('secondary', `
                        <i class="fas fa-search mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(status === "For interview") {
                    return dtBadge('info', `
                        <i class="fas fa-file-alt mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(status === "Hired") {
                    return dtBadge('success', `
                        <i class="fas fa-check mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else if(
                    status === "Rejected from evaluation" || 
                    status === "Rejected from screnning"  || 
                    status === "Rejected from interview"
                ) {
                    return dtBadge('danger', `
                        <i class="fas fa-times mr-1"></i>
                        <span>${ status }</span>
                    `);
                } else {
                    return dtBadge('light', `<span>Invalid data</span>`);
                }
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
 * APPLICANTS ANALYTICS
 * ==============================================================================
*/

// Applicants Analytics
const applicantsAnalytics = () => {
    GET_ajax(`${ R_API_ROUTE }applicants/analytics`, {
        success: result => {

            // Set Total Applicants
            setContent('#totalApplicantsCount', formatNumber(result.total));

            // Set For Evaluation Applicants
            setContent('#forEvaluationCount', formatNumber(result.for_evaluation));

            // Set For Screening 
            setContent('#forScreeningCount', formatNumber(result.for_screening));

            // Set For Interview
            setContent('#forInterviewCount', formatNumber(result.for_interview));

            // Set Rejected Applicants
            setContent('#rejectedApplicantsCount', formatNumber(result.rejected.total));
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
    GET_ajax(`${ R_API_ROUTE }applicants/${ applicantID }`, {
        success: result => {
            // console.log(result);

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

            // Display evluation field
            if(result.status === "For evaluation") {
                showElement('#evaluationField');
                showElement('#submitBtn')
            } else {
                hideElement('#evaluationField');
                hideElement('#submitBtn')
            }

            showModal('#applicantDetailsModal');
        },
        error: () => {
            toastr.error('There was an error in getting applicant details')
        }
    })
}


/**
 * ==============================================================================
 * VIEW APPLICANTS PER JOB POST
 * ==============================================================================
*/

/** For Applicants Per Jobs Page */
ifSelectorExist('#applicantsPerJobDT', () => {

    const jobPostID = window.location.pathname.split("/")[3]

    // Get Job Post Details
    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }`, {
        success: result => {
            // console.log(result);

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
            })
        },
        error: () => toastr.error('There was an error in getting job post details')
    });

    // Initialize Applicant Per Job DataTable
    initDataTable('#applicantsPerJobDT', {
        // debugMode: true,
        url: `${ R_API_ROUTE }job-posts/${ jobPostID }/applicants`,
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
                        <div>${ formatDateTime(dateApplied, "Date") }</div>
                        <div class="small text-secondary">${ fromNow(dateApplied) }</div>                
                    `
                }
            },

            // Status
            {
                data: null,
                render: data => {
                    const status = data.status;
                    if(status === "For evaluation") {
                        return dtBadge('warning', `
                            <i class="fas fa-redo mr-1"></i>
                            <span>${ status }</span>
                        `);
                    } else if(status === "For screening") {
                        return dtBadge('secondary', `
                            <i class="fas fa-user mr-1"></i>
                            <span>${ status }</span>
                        `);
                    } else if(status === "For interview") {
                        return dtBadge('info', `
                            <i class="fas fa-file-alt mr-1"></i>
                            <span>${ status }</span>
                        `);
                    } else if(status === "Hired") {
                        return dtBadge('success', `
                            <i class="fas fa-check mr-1"></i>
                            <span>${ status }</span>
                        `);
                    } else if(
                        status === "Rejected from evaluation" || 
                        status === "Rejected from screnning"  || 
                        status === "Rejected from interview"
                    ) {
                        return dtBadge('danger', `
                            <i class="fas fa-times mr-1"></i>
                            <span>${ status }</span>
                        `);
                    } else {
                        return dtBadge('light', `<span>Invalid data</span>`);
                    }
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
    })
});


/**
 * ==============================================================================
 * APPLICANTS PER JOB ANALYTICS
 * ==============================================================================
*/


// Applicants Per Job Analytics
const applicantsPerJobAnalytics = () => {
    
    const jobPostID = window.location.pathname.split("/")[3]

    GET_ajax(`${ R_API_ROUTE }job-posts/${ jobPostID }/applicants/analytics`, {
        success: result => {

            // Set Total Applicants
            setContent('#totalApplicantsCount', formatNumber(result.total));

            // Set For Evaluation Applicants
            setContent('#forEvaluationCount', formatNumber(result.for_evaluation));

            // Set For Screening 
            setContent('#forScreeningCount', formatNumber(result.for_screening));

            // Set For Interview
            setContent('#forInterviewCount', formatNumber(result.for_interview));

            // Set Rejected Applicants
            setContent('#rejectedApplicantsCount', formatNumber(result.rejected.total));
        },
        error: () => toastr.error('There was an error in getting applciants analytics')
    });
}

ifSelectorExist('#applicantsPerJobAnalytics', () => applicantsPerJobAnalytics());


/**
 * ==============================================================================
 * APPLICANT EVALUATION
 * ==============================================================================
*/

/** If user select reject for manpower request */
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
            required: "Please insert remarks here"
        }
    },
    submitHandler: () => evaluateApplicant()
});

/** Evaluate Applicant */
const evaluateApplicant = () => {
    const formData = generateFormData('#applicantEvaluationForm');
    const get = (name) => { return formData.get(name) }

    const applicantStatus = get('applicantStatus');
    const remarks = applicantStatus === 'Rejected from evaluation' ? get('remarks') : null;

    const data = {
        status: applicantStatus,
        remarks: remarks
    }

    const applicantID = get('applicantID');

    // console.log(data);

    PUT_ajax(`${ R_API_ROUTE }applicants/${ applicantID }`, data, {
        success: result => {
            if(result) {
                hideModal('#applicantDetailsModal');
                reloadDataTable('#applicantsPerJobDT');
                applicantsPerJobAnalytics();
                toastr.success('An applicant is successfully evaluated');

            }
        },
        error: () => {
            hideModal('#applicantDetailsModal');
            toastr.error('There was an error while updating applicant evaluation');
        }
    })
}