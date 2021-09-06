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
    
    GET_ajax(`${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/analytics`, {
        success: result => {

            // Show Count or Hide Element
            const a = (s, c) => { if(c > 0) {
                setContent(s, formatNumber(c));
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

            // Set Resume
            $('#viewResumeBtn').attr('href', `${ URL_RESUME_FILES }${ result.resume }`);

            // Set Applicant Date Applied
            setContent("#applicantDateApplied", `
                <div>${ formatDateTime(result.created_at, "Full Date") }</div>
                <div>${ formatDateTime(result.created_at, "Time") }</div>
                <div class="small text-secondary">${  fromNow(result.created_at) }</div>
            `);

            // Set Evaluated By
            setContent('#applicantEvaluatedBy', () => {
                const evaluatedBy = result.evaluation_done_by;

                const evaluatorName = formatName('F M. L, S', {
                    firstName: evaluatedBy.first_name,
                    middleName: evaluatedBy.middle_name,
                    lastName: evaluatedBy.last_name,
                    suffixName: evaluatedBy.suffix_name
                });

                const evaluatorPosition = evaluatedBy.position;

                return `
                    <div>${ evaluatorName }</div>
                    <div class="small text-secondary">${ evaluatorPosition.name }, ${ evaluatorPosition.department.name }</div>
                `
            });

            // Set Evauated At
            setContent('#applicantEvaluatedAt', () => {
                const evaluatedAt = result.evaluated_at;

                return `
                    <div>${ formatDateTime(evaluatedAt, "Full Date") }</div>
                    <div>${ formatDateTime(evaluatedAt, "Time") }</div>
                    <div class="small text-secondary">${ fromNow(evaluatedAt) }</div>
                `
            });

            // Show Applicants Details Modal
            showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting applicant details')
    })
}


/**
 * ==============================================================================
 * FOR SCREENING APPLICANTS
 * ==============================================================================
*/

/** Applicants for Screening DataTable */
initDataTable('#applicantsForScreeningDT', {
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
 * SCREEN APPLICANTS
 * ==============================================================================
*/

/** If user select reject for evaluation */
$("#approveForInterview, #rejectFromScreening").on('change', () => {
    const requestStatus = $(`input[name="applicantStatus"]:checked`).val();
    if(requestStatus == "For interview") hideElement("#remarksField");
    if(requestStatus == "Rejected from screening") showElement("#remarksField");
    ifSelectorExist('#submitBtn', () => enableElement('#submitBtn'));
});

/** On Applicant details modal is going to be hidden  */
onHideModal('#applicantDetailsModal', () => {
    resetForm('#applicantScreeningForm');
    hideElement("#remarksField");
    disableElement('#submitBtn');
});

/** Validate Applicant Screening Form */
validateForm('#applicantScreeningForm', {
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
            required: "You must insert remarks here for rejected this applicant from screening"
        }
    },
    submitHandler: () => screenApplicant()
});

/** Screen Applicant */
const screenApplicant = () => {

    btnToLoadingState('#submitBtn');
    disableElement('#closeApplicantDetailsModalBtn');

    const formData = generateFormData('#applicantScreeningForm');
    const get = (name) => { return formData.get(name) }

    const applicantStatus = get('applicantStatus');
    const isRejected = applicantStatus === 'Rejected from screening';

    const screenedAt = isRejected ? null : formatDateTime(moment());
    const remarks = isRejected ? get('remarks') : null;

    const data = {
        screened_at: screenedAt,
        status: applicantStatus,
        remarks: remarks
    }

    PUT_ajax(`${ H_API_ROUTE }applicants/${ get('applicantID') }/screen`, data, {
        success: result => {
            if(result) {

                // Show Info Alert
                isChecked('#approveForInterview')
                    ? toastr.success('An applicant is screened and approved for interview')
                    : toastr.info('An applicant is rejected from screening')

                // Hide Applicant Details Modal
                hideModal('#applicantDetailsModal');

                // Set to default
                setContent('#submitBtn', `
                    <span>Submit</span>
                    <i class="fas fa-check ml-1"></i>
                `);
                enableElement('#closeApplicantDetailsModalBtn');

                // Reload Applicants Per Job Analytics
                applicantsPerJobAnalytics();

                // Reload DataTable
                reloadDataTable('#applicantsForScreeningDT');
            }
        },
        error: () => {
            hideModal('#applicantDetailsModal');
            toastr.error('There was an error while updating applicant evaluation');
        }
    });
}


/**
 * ==============================================================================
 * FOR INTERVIEW APPLICANTS
 * ==============================================================================
*/

/** Applicants for Interview DataTable */
initDataTable('#applicantsForInterviewDT', {
    debugMode: true,
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
 * CREATE SCHEDULE
 * ==============================================================================
*/

let selectApplicant = $('#selectApplicant');
let selectedApplicants = [];

/** If Create Interview Schedule Form Exist */
ifSelectorExist('#createInterviewScheduleForm', () => {
    GET_ajax(`${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/for-interview`, {
        success: result => {
            selectApplicant.empty();
            selectApplicant.append(`<option></option>`);

            if(result.length > 0) {
                result.forEach(i => {
                    const intervieweeInfo = i.interviewee_info;

                    if(isEmptyOrNull(intervieweeInfo)) {
                        const applicantName = formatName('F M. L, S', {
                            firstName: i.first_name,
                            middleName: i.middle_name,
                            lastName: i.last_name,
                            suffixName: i.suffix_name
                        });

                        selectApplicant.append(`<option value="${ i.applicant_id }">${ applicantName }</option>`);
                    }
                });

                $('#selectApplicant').select2({
                    placeholder: "Please select applicant here and add",
                });
            }
            
        },
        error: () => toastr.error('There was an error in getting applicants')
    });

    selectApplicant.on('change', () => isEmptyOrNull(selectApplicant.val()) ? disableElement('#addApplicantBtn') : enableElement('#addApplicantBtn'));

    $('#addApplicantBtn').on('click', () => {
        btnToLoadingState('#addApplicantBtn');
        disableElement('#selectApplicant');

        const selectedApplicant = selectApplicant.val();

        GET_ajax(`${ H_API_ROUTE }interviewee/${ selectedApplicant }`, {
            success: result => {
                const intervieweeFullName = formatName('F M. L, S', {
                    firstName: result.first_name,
                    middleName: result.middle_name,
                    lastName: result.last_name,
                    suffixName: result.suffix_name
                });

                const dtBody = $('#selectedApplicantsDTBody');

                if(selectedApplicants.length == 0) dtBody.empty();

                dtBody.append(`
                    <tr id="interviewee-${ result.applicant_id }">
                        <td>${ intervieweeFullName }</td>
                        <td class="text-center">
                            <a 
                                href="${ BASE_URL_WEB }static/app/files/resumes/${ result.resume }" 
                                class="btn btn-sm btn-secondary"
                                target="_blank"
                            >
                                <span>View Resume</span>
                                <i class="fas fa-file-alt ml-1"></i>
                            </a>
                        </td>
                        <td class="text-center">
                            <button type="button" class="btn btn-sm btn-danger" onclick="removeApplicant('${ result.applicant_id }')">
                                <span>Remove</span>
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `);

                selectedApplicants.push(`${ result.applicant_id }`);

                if(selectedApplicants.length > 0) enableElement('#saveBtn');

                $(`#selectApplicant option[value='${ result.applicant_id }']`).prop('disabled', true).trigger('change');

                selectApplicant.val('').trigger('change');

                setContent('#addApplicantBtn', `
                    <span>Add</span>
                    <i class="fas fa-plus ml-1"></i>
                `);
                enableElement('#selectApplicant');
            },
            error: () => {
                toastr.error('There was na error in getting applicant details');
                btnToUnloadState('#addApplicantBtn', `
                    <span>Add</span>
                    <i class="fas fa-plus ml-1"></i>
                `);
            }
        });
    });
});

/** Remove Applicant */
const removeApplicant = (applicantID) => {
    showModal('#confirmRemoveApplicantModal');
    setValue('#applicantID', applicantID);
}

/** Validate Confirm Remove Applicant Form */
validateForm('#confirmRemoveApplicantForm', {
    rules: {
        applicantID: {
            required: true
        }
    },
    messages: {
        applicantID: {
            required: 'This must have a value'
        }
    },
    submitHandler: () => {
        const applicantID = generateFormData('#confirmRemoveApplicantForm').get('applicantID');

        selectedApplicants = jQuery.grep(selectedApplicants, value => { return value != applicantID });
        $(`#interviewee-${ applicantID }`).remove();
        $(`#selectApplicant option[value='${ applicantID }']`).prop('disabled', false).trigger('change');

        if(selectedApplicants.length == 0) {
            setContent('#selectedApplicantsDTBody', `
                <tr>
                    <td colspan="3">
                        <div class="py-5 text-center">
                            <h5 class="text-secondary my-3">Added applicants will be display here</h5>
                        </div>
                    </td>
                </tr>
            `);
            disableElement('#saveBtn');
        }

        hideModal('#confirmRemoveApplicantModal');
        return false;
    }
});

/** When Confirm Remove Applicant Modal is hidden */
onHideModal('#confirmRemoveApplicantModal', () => resetForm('#confirmRemoveApplicantForm'));

/** Validate Create Schedule Form */
validateForm('#createInterviewScheduleForm', {
    rules: {
        scheduledDate: {
            required: true,
            afterToday: true
        },
        startSession: {
            required: true,
            beforeTime: '#endSession'
        },
        endSession: {
            required: true,
            afterTime: '#startSession'
        }
    },
    messages: {
        scheduledDate: {
            required: 'Please select the date for your schedule',
            afterToday: 'This must be in the future'
        },
        startSession: {
            required: 'Please select the time where session starts',
            beforeTime: 'Start session must be before the set end session'
        },
        endSession: {
            required: 'Please select the time where session end',
            afterTime: 'End session must be after the set start session'
        }
    },
    submitHandler: () => {
        showModal('#confirmCreateInterviewScheduleModal');
        return false;
    }
});

/** Create Schedule Button */
onClick('#createScheduleBtn', () => {
    const formData = generateFormData('#createInterviewScheduleForm');
    const get = (n) => { return formData.get(n) }

    let interviewees = [];
    selectedApplicants.forEach(a => interviewees.push({applicant_id: a}));
 
    const data = {
        scheduled_date: get('scheduledDate'),
        start_session: get('startSession'),
        end_session: get('endSession'),
        interviewees: interviewees
    }

    console.log(data);

    POST_ajax(`${ H_API_ROUTE }interview-schedule`, data, {
        suceess: result => {
            console.log(result)
        },
        error: () => {
            hideModal('#confirmCreateInterviewScheduleModal');
            toastr.error('There was an error in creating an interview schedule');
        }
    });
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