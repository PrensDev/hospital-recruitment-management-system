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
            a('#totalApplicantsCount', result.total);

            // Set For Screening Count
            a('#forScreeningCount', result.for_screening);

            // Set For Evaluation Count
            a('#forInterviewCount', result.for_interview);

            // Set Interviewed Count
            a('#interviewedApplicantsCount', result.interviewed);

            // Set Hired Count
            a('#hiredCount', result.hired);

            // Set Rejected Count
            const rejected = result.rejected.from_screening + result.rejected.from_interview;
            a('#rejectedCount', formatNumber(rejected));

            // Remove Loader in the menus
            $('#menuLoader').remove();
            showElement('#menu');
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

/** Set Applicant Details */
const setApplicantDetailsAndTimeline = (result) => {


    /** APPLICANT DETAILS */

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


    /** APPLICANT TIMELINE */

    let timelineData = [];

    // Applied
    const createdAt = result.created_at;
    timelineData.push({
        icon: "file-export",
        iconTheme: "primary",
        dateTime: createdAt,
        timelineTitle: 'Applied',
        timelineBody: `
            <div class="small mb-3">Application was submitted by <b>${ applicantFullName }</b></div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Full Date") }</div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Time") }</div>
        `
    });

    // Evaluated
    const evaluatedAt = result.evaluated_at;
    const evaluatedBy = result.evaluation_done_by;
    if(!isEmptyOrNull(evaluatedAt) && !isEmptyOrNull(evaluatedBy)) {
        const evaluatedByFullName = formatName('F M. L, S', {
            firstName: evaluatedBy.first_name,
            middleName: evaluatedBy.middle_name,
            lastName: evaluatedBy.last_name,
            suffixName: evaluatedBy.suffix_name
        });
        timelineData.push({
            icon: "check",
            iconTheme: "success",
            dateTime: evaluatedAt,
            timelineTitle: 'Evaluated',
            timelineBody: `
                <div class="small mb-3">Evaluation was done by <b>${ evaluatedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(evaluatedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(evaluatedAt, "Time") }</div>
            `
        });
    }

    // Screened
    const screenedAt = result.screened_at;
    const screenedBy = result.screening_done_by;
    if(!isEmptyOrNull(screenedAt) && !isEmptyOrNull(screenedBy)) {
        const screenedByFullName = formatName('F M. L, S', {
            firstName: screenedBy.first_name,
            middleName: screenedBy.middle_name,
            lastName: screenedBy.last_name,
            suffixName: screenedBy.suffix_name
        });
        timelineData.push({
            icon: "check",
            iconTheme: "warning",
            dateTime: screenedAt,
            timelineTitle: 'Screened',
            timelineBody: `
                <div class="small mb-3">Screening was done by <b>${ screenedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(screenedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(screenedAt, "Time") }</div>
            `
        });
    }

    // Hired
    const hiredAt = result.hired_at;
    const hiredBy = result.hiring_done_by;
    if(!isEmptyOrNull(hiredAt) && !isEmptyOrNull(hiredBy)) {
        const hiredByFullName = formatName('F M. L, S', {
            firstName: hiredBy.first_name,
            middleName: hiredBy.middle_name,
            lastName: hiredBy.last_name,
            suffixName: hiredBy.suffix_name
        });
        timelineData.push({
            icon: "handshake",
            iconTheme: "success",
            dateTime: hiredAt,
            timelineTitle: 'Hired',
            timelineBody: `
                <div class="small mb-3">Hiring was done by <b>${ hiredByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(hiredAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(hiredAt, "Time") }</div>
            `
        });
    }

    // Rejected
    const status = result.status;
    if(
        status === "Rejected from evaluation" || 
        status === "Rejected from screening"  || 
        status === "Rejected from interview" 
    ) {
        const rejectedAt = result.rejected_at;
        const rejectedBy = result.rejection_done_by;
        if(!isEmptyOrNull(rejectedAt) && !isEmptyOrNull(rejectedBy)) {
            const rejectedByFullName = formatName('F M. L, S', {
                firstName: rejectedBy.first_name,
                middleName: rejectedBy.middle_name,
                lastName: rejectedBy.last_name,
                suffixName: rejectedBy.suffix_name
            });
            timelineData.push({
                icon: "times",
                iconTheme: "danger",
                dateTime: rejectedAt,
                timelineTitle: status,
                timelineBody: `
                    <div class="small mb-3">Applicant was ${ status.toLowerCase() } by <b>${ rejectedByFullName }</b></div>
                    <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                    <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
                `
            });
        }
    }

    // Set Applicant Timeline
    setTimeline('#applicantTimeline', {
        title: "Applicant Timeline",
        timelineData: timelineData
    });

    // Remove Applicant Timeline Loader
    hideElement('#applicantTimelineLoader');
    showElement('#applicantTimeline');
}

/** View Screening Applicant Details */
const viewScreeningApplicantDetails = (applicantID) => {
    GET_ajax(`${ H_API_ROUTE }applicants/${ applicantID }`, {
        success: result => {

            // Set Applicant ID
            setValue('#applicantID', result.applicant_id)

            // Set Applicants Details and Timeline
            setApplicantDetailsAndTimeline(result);

            // Show Applicants Details Modal
            showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting applicant details')
    });
}

/** View For Interview Applicant Details */
const viewForInterviewApplicantDetails = (applicantID) => {
    GET_ajax(`${ H_API_ROUTE }applicants/${ applicantID }`, {
        success: result => {

            // Set Applicant ID
            setValue('#applicantID', result.applicant_id);

            // Set Applicant Details and Timeline
            setApplicantDetailsAndTimeline(result);

            // Show Applicants Details Modal
            showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting applicant details')
    });
}

/** View Interviewed Applicant Details */
const viewInterviewedApplicantDetails = (applicantID) => {
    GET_ajax(`${ H_API_ROUTE }applicants/${ applicantID }/interviewee-info`, {
        success: result => {
            
            // Set Applicant ID
            setValue('#applicantID', result.applicant_id);

            // Set Applicant Details and Timeline
            setApplicantDetailsAndTimeline(result);

            // Set ScoreSheet
            setContent('#applicantScoresheet', '');
            const scores = result.interviewee_info[0].interviewee_score;
            let sum = 0;
            let count = 1;
            scores.forEach(s => {
                const score = s.score;
                sum+=score;
                $('#applicantScoresheet').append(`
                    <tr>
                        <td class="text-right">${ count }</td>
                        <td>${ s.interview_question.question }</td>
                        <td class="text-right">${ formatNumber(score) }%</td>
                    </tr>
                `);
                count++;
            });

            $('#applicantScoresheet').append(`
                <tr>
                    <td colspan="2" class="text-right font-weight-bold">Average</td>
                    <td class="text-right font-weight-bold">${ formatNumber(sum/scores.length) }%</td>
                </tr>
            `);

            showModal('#applicantDetailsModal');
        },
        error: () => {
            toastr.error('There was a problem in getting the applicant details');
        }
    })
}

/** View Hired Applicant Details */
const viewHiredApplicantDetails = (applicantID) => {
    GET_ajax(`${ H_API_ROUTE }applicants/${ applicantID }`, {
        success: result => {
            
            // Set Applicant Details and Timeline
            setApplicantDetailsAndTimeline(result);

            // Show Applicants Details Modal
            showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting hired applicant details')
    })
}

/** View Rejected Applicant Details */
const viewRejectedApplicantDetails = (applicantID) => {
    GET_ajax(`${ H_API_ROUTE }applicants/${ applicantID }`, {
        success: result => {

            // Set Applicant Details and Timeline
            setApplicantDetailsAndTimeline(result);

            // Show Applicants Details Modal
            showModal('#applicantDetailsModal');
        },
        error: () => toastr.error('There was an error in getting rejected applicants details')
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
                                onclick="viewScreeningApplicantDetails('${ data.applicant_id }')"
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

    // Set Buttons to loading state
    btnToLoadingState('#submitBtn');
    disableElement('#closeApplicantDetailsModalBtn');

    // Generate form data
    const formData = generateFormData('#applicantScreeningForm');
    const get = (name) => { return formData.get(name) }

    // Get data
    const applicantStatus = get('applicantStatus');
    const remarks = applicantStatus === 'Rejected from screening' ? get('remarks') : null;

    // Set Data
    const data = {
        status: applicantStatus,
        remarks: remarks
    }

    // If error
    const ifError = () => {
        hideModal('#applicantDetailsModal');
        toastr.error('There was an error while updating applicant evaluation');
    }

    // Update applicant status
    PUT_ajax(`${ H_API_ROUTE }applicants/${ get('applicantID') }/screen`, data, {
        success: result => {
            if(result) {

                // Show Info Alert
                isChecked('#approveForInterview')
                    ? toastr.success('An applicant is screened and approved for interview')
                    : toastr.info('An applicant is rejected from screening')

                // Hide Applicant Details Modal
                hideModal('#applicantDetailsModal');

                // Set buttons to default
                setContent('#submitBtn', `
                    <span>Submit</span>
                    <i class="fas fa-check ml-1"></i>
                `);
                enableElement('#closeApplicantDetailsModalBtn');

                // Reload Applicants Per Job Analytics
                applicantsPerJobAnalytics();

                // Reload DataTable
                reloadDataTable('#applicantsForScreeningDT');
            } else ifError()
        },
        error: () => ifError()
    });
}


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

        // Contact Information
        {
            data: null,
            render: data => {
                return `
                    <div>${ data.email }</div>
                    <div>${ data.contact_number }</div>
                `
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const intervieweeInfo = data.interviewee_info;
                if(isEmptyOrNull(intervieweeInfo)) {
                    return `
                        <div class="badge bg-warning p-2 w-100">
                            <span>No schedule yet</span>
                        </div>
                    `
                } else {
                    if(intervieweeInfo[0].interviewee_schedule != [] && isEmptyOrNull(intervieweeInfo[0].is_interviewed)) {
                        return `
                            <div class="badge bg-info p-2 w-100">
                                <span>Schedule is set</span>
                            </div>
                        `
                    }
                }
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
                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex" 
                                role="button" 
                                onclick="viewForInterviewApplicantDetails('${ data.applicant_id }')"
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

/** Get Interview Schedules Per Job Post */
const getInterviewSchedulesPerJobPost = () => {
    GET_ajax(`${ H_API_ROUTE }job-posts/${ jobPostID }/interview-schedules`, {
        success: result => {
            if(result) {

                // Set Schedules
                let schedules = '';
                if(result.length > 0) {
                    
                    // Set number of schedules
                    setContent('#scheduleCountDetails', () => {
                        const c = result.length;
                        return `You already have ${ c } schedule${ c > 1 ? 's' : '' } in total.`
                    });

                    result.forEach(r => {
                        const startSession = moment(`${ r.scheduled_date } ${ r.start_session }`);
                        const endSession = moment(`${ r.scheduled_date } ${ r.end_session }`);
                        
                        const momentDetails = () => {
                            if(moment().isSame(r.scheduled_date, 'date')) {
                                if(isAfterToday(startSession) && isAfterToday(endSession)) {
                                    return `
                                        <div class="badge badge-warning mr-2">Will happen soon</div>
                                        <div class="small text-secondary">Started ${ fromNow(startSession) }</div>
                                    `
                                } else if(isBeforeToday(startSession) && isAfterToday(endSession)) {
                                    return `
                                        <div class="badge badge-info mr-2">On going</div>
                                        <div class="small text-secondary">Started ${ fromNow(startSession) }</div>
                                    `
                                } else {
                                    return `
                                        <div class="badge badge-danger mr-2">Ended today</div>
                                        <div class="small text-secondary">${ fromNow(endSession) }</div>
                                    `
                                }
                            } else if(isAfterToday(startSession)) {
                                return `<div class="small text-secondary">${ fromNow(startSession) }</div>`
                            } else {
                                return `
                                    <div class="badge badge-danger mr-2">Ended</div>
                                    <div class="small text-secondary">${ fromNow(endSession) }</div>
                                `
                            }
                        }

                        const intervieweesCount = r.interviewees.length;

                        schedules += `
                            <div class="callout callout-info">
                                <h5 class="mb-0">${ formatDateTime(r.scheduled_date, 'Full Date') }</h5>
                                <h5 class="mb-0">${ formatDateTime(startSession, 'Time') } - ${ formatDateTime(endSession, 'Time') }</h5>
                                <div class="d-flex align-items-center">
                                    ${momentDetails()}
                                </div>
    
                                <div class="row mt-2">
                                    <div class="col">
                                        <div>${ intervieweesCount } applicant${ intervieweesCount > 1 ? 's' : '' } are scheduled</div>
                                    </div>
                                    <div class="col">
                                        <div class="text-right">
                                            <a 
                                                class="btn btn-sm btn-secondary text-white" style="text-decoration: none" 
                                                href="${ H_WEB_ROUTE }interview-schedules/${ r.interview_schedule_id }"
                                            >
                                                <i class="fas fa-list mr-1"></i>
                                                <span>View Details</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    });
                } else {
                    setContent('#scheduleCountDetails', 'No schedule has been set yet');

                    schedules = `
                        <div class="py-5 text-center">
                            <h3>There are no schedules yet</h3>
                            <p class="text-secondary">You may create by clicking the button above</p>
                        </div>
                    `
                }
                setContent('#interviewSchedules', schedules);
            } else toastr.error('There was an error in getting interview schedules')
        },
        error: () => toastr.error('There was an error in getting interview schedules')
    });
}

/** For Interview Schedules */
ifSelectorExist('#interviewSchedules', () => getInterviewSchedulesPerJobPost());

onClick('#custom-content-below-applicants-tab', () => reloadDataTable('#applicantsForInterviewDT'));
onClick('#custom-content-below-schedules-tab', () => getInterviewSchedulesPerJobPost());


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
            } else selectApplicant.append(`<option disabled>No applicants were found</option>`);
            
            $('#selectApplicant').select2({
                placeholder: "Please select applicant here and add",
            });
        },
        error: () => toastr.error('There was an error in getting applicants')
    });

    selectApplicant.on('change', () => isEmptyOrNull(selectApplicant.val()) ? disableElement('#addApplicantBtn') : enableElement('#addApplicantBtn'));

    $('#addApplicantBtn').on('click', () => {
        btnToLoadingState('#addApplicantBtn');
        disableElement('#selectApplicant');

        const selectedApplicant = selectApplicant.val();

        GET_ajax(`${ H_API_ROUTE }applicants/${ selectedApplicant }/interviewee-info`, {
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
    btnToLoadingState('#createScheduleBtn');
    disableElement('#cancelConfirmCreateInterviewScheduleBtn');

    const formData = generateFormData('#createInterviewScheduleForm');
    const get = (n) => { return formData.get(n) }

    let interviewees = [];
    selectedApplicants.forEach(a => interviewees.push({applicant_id: a}));
 
    const data = {
        job_post_id: jobPostID,
        scheduled_date: get('scheduledDate'),
        start_session: get('startSession'),
        end_session: get('endSession'),
        interviewees: interviewees
    }

    POST_ajax(`${ H_API_ROUTE }interview-schedule`, data, {
        success: result => {
            if(result) {
                setSessionedAlertAndRedirect({
                    theme: "success",
                    message: "A new schedule is successfully created",
                    redirectURL: `${ H_WEB_ROUTE }job-posts/${ jobPostID }/applicants/for-interview`
                });
            }
        },
        error: () => {
            hideModal('#confirmCreateInterviewScheduleModal');

            btnToUnloadState('#createScheduleBtn', `
                <span>Yes, create it!</span>
                <i class="fas fa-check ml-1"></i>
            `);
            enableElement('#cancelConfirmCreateInterviewScheduleBtn');

            toastr.error('There was an error in creating an interview schedule');
        }
    });
});


/**
 * ==============================================================================
 * INTERVIEWED APPLICANTS
 * ==============================================================================
*/

/** Initalize Interviewed Applicants DataTable */
initDataTable('#interviewedApplicantsDT', {
    // debugMode: true,
    url: `${ H_API_ROUTE }job-posts/${ jobPostID }/applicants/interviewed`,
    columns: [

        // Created At (Hidden for default sorting)
        { data: 'created_at', visible: false},

        // Applicant Name
        {
            data: null,
            render: data => {
                return formatName('F M. L, S', {
                    firstName: data.first_name,
                    middleName: data.middle_name,
                    lastName: data.last_name,
                    suffixName: data.suffix_name
                });
            }
        },

        // Contact Information
        {
            data: null,
            render: data => {
                return `
                    <div>${ data.email }</div>
                    <div>${ data.contact_number }</div>
                `
            }
        },

        // Date Applied
        {
            data: null,
            render: data => {
                const dateApplied = data.created_at;
                return `
                    <div>${ formatDateTime(dateApplied, 'MMM. D, YYYY') }</div>
                    <div class="small text-secondary">${ fromNow(dateApplied) }</div>
                `
            }
        },

        // Average Score
        {
            data: null,
            render: data => {
                const scores = data.interviewee_info[0].interviewee_score;
                let sum = 0;
                scores.forEach(s => sum += s.score);
                const ave = sum/scores.length;
                return `<div class="text-right">${ formatNumber(ave) }%</div>`;
            }
        },

        // Actions
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
                                onclick="viewInterviewedApplicantDetails('${ data.applicant_id }')"
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

/** If reject interview or hide applicant has been selected */
$('#rejectFromInterview, #hiredApplicant').on('change', () => {
    const requestStatus = $(`input[name="applicantStatus"]:checked`).val();
    if(requestStatus == "Hired") hideElement("#remarksField");
    if(requestStatus == "Rejected from interview") showElement("#remarksField");
    ifSelectorExist('#submitBtn', () => enableElement('#submitBtn'));
});

/** On Applicant Details Modal has been hidden */
onHideModal('#applicantDetailsModal', () => {
    resetForm('#applicantHiringForm');
    hideElement('#remarksField');
    disableElement('#submitBtn');
});

/** Validate Appicant Hiring Form */
validateForm('#applicantHiringForm', {
    rules: {
        applicantStatus: {
            required: true
        },
        remarks: {
            required: true
        }
    },
    messages: {
        applicantStatus: {
            required: 'Please select a status'
        },
        remarks: {
            required: 'Please insert remarks for rejecting this applicant'
        }
    },
    submitHandler: () => {
        hireOrRejectApplicant();
        return false;
    }
});

/** Hire or reject applicant */
const hireOrRejectApplicant = () => {

    // Set buttons to loading state
    btnToLoadingState('#submitBtn');
    disableElement('#cancelApplicantHiringBtn');

    // Get form data
    const formData = generateFormData('#applicantHiringForm');
    const get = (n) => { return formData.get(n) }

    // Get applicant data
    const applicantStatus = get('applicantStatus');
    const isRejected = applicantStatus === 'Rejected from interview';

    const rejectedAt = isRejected ? formatDateTime(moment()) : null;
    const remarks = isRejected ? get('remarks') : null;

    const data = {
        status: applicantStatus,
        rejected_at: rejectedAt,
        remarks: remarks
    }

    PUT_ajax(`${ H_API_ROUTE }applicants/${ get('applicantID') }/hire`, data, {
        success: result => {
            if(result) {

                //  Hide Applicant Details Modal
                hideModal('#applicantDetailsModal');

                // Reload DataTable
                reloadDataTable('#interviewedApplicantsDT');
                
                // Set buttons to unload state
                btnToUnloadState('#submitBtn', `
                    <span>Submit</span>
                    <i class="fas fa-check ml-1"></i>
                `);
                enableElement('#cancelApplicantHiringBtn');

                // Reload analytics
                applicantsPerJobAnalytics();

                // Show alert
                isRejected 
                    ? toastr.info('An applicant has been rejected from interview')
                    : toastr.success('An applicant is successfully hired')
            }
        },
        error: () => {
            
            //  Hide Applicant Details Modal
            hideModal('#applicantDetailsModal');

            // Set buttons to unload state
            btnToUnloadState('#submitBtn', `
                <span>Submit</span>
                <i class="fas fa-check ml-1"></i>
            `);
            enableElement('#cancelApplicantHiringBtn');

            // Show error alert
            toastr.error('There was an error in updating applicant status')
        }
    })
}

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
                                onclick="viewHiredApplicantDetails('${ data.applicant_id }')"
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

        // Contact Information
        {
            data: null,
            render: data => {
                return `
                    <div>${ data.email }</div>
                    <div>${ data.contact_number }</div>
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

        
        // Status
        {
            data: null,
            render: data => {
                return `
                    <div class="badge bg-danger p-2 w-100">
                        <i class="fas fa-times mr-1"></i>
                        <span>${ data.status }</span>
                    </div>
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
                                onclick="viewRejectedApplicantDetails('${ data.applicant_id }')"
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