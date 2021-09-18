/**
 * ==============================================================================
 * CONSTANTS
 * ==============================================================================
 */

// Get interview schedule ID from URL
const interviewScheduleID = window.location.pathname.split("/")[3];

// Get interviewee ID form URL
const intervieweeID = window.location.pathname.split("/")[3];


/**
 * ==============================================================================
 * GET ALL GENERAL INTERVIEW QUESTIONS
 * ==============================================================================
 */

// Initialize General Interview Questions DataTable
initDataTable('#generalInterviewQuestionsDT', {
    url: `${ H_API_ROUTE }interview-questions/general`,
    columns: [
        
        // Created At (For default sorting)
        { data: 'created_at' , visible: false },

        // Question
        { data: 'question' },

        // Added By
        {
            data: null,
            class: 'text-nowrap',
            render: data => {
                const addedBy = data.interview_question_added_by;

                const addedByFullName = formatName('F M. L, S', {
                    firstName: addedBy.first_name,
                    middleName: addedBy.middle_name,
                    lastName: addedBy.last_name,
                    suffixName: addedBy.suffix_name
                });

                const addedByPosition = addedBy.position;

                return `
                    <div>${ addedByFullName }</div>
                    <div class="small text-secondary">${ addedByPosition.name }, ${ addedByPosition.department.name }</div>
                `
            }
        },

        // Added At
        {
            data: null,
            render: data => {
                const addedAt = data.created_at;
                
                return `
                    <div>${ formatDateTime(addedAt, 'MMM. D, YYYY') }</div>
                    <div class="small text-secondary">${ fromNow(addedAt) }</div>
                `
            }
        },

        // Actions
        {
            data: null,
            render: data => {
                const interviewQuestionID = data.interview_question_id;
                
                return `
                    <div class="dropdown text-center">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="viewGenInterviewQuestionDetails('${ interviewQuestionID }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <div>View Details</div>
                            </div>
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick=""
                            >
                                <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                                <div>Edit Question</div>
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
 * CREATE GENERAL INTERVIEW QUESTIONS
 * ==============================================================================
 */

// Validate Add General Interviwe Question Form
validateForm('#addGeneralInterviewQuestionForm', {
    rules: {
        question: {
            required: true
        }
    },
    messages: {
        question: {
            required: 'General interview question is required'
        }
    },
    submitHandler: () => addGeneralInterviewQuestion()
});

// Add General Interview Question
const addGeneralInterviewQuestion = () => {

    // Set buttons to loading state
    btnToLoadingState('#addGeneralInterviewQuestionBtn');
    disableElement('#cancelGeneralInterviewQuestionBtn');

    const formData = generateFormData('#addGeneralInterviewQuestionForm');

    const data = {
        question: formData.get('question'),
        type: "General"
    }

    POST_ajax(`${ H_API_ROUTE }interview-questions`, data, {
        success: result => {
            if(result) {

                // Hide modal
                hideModal('#addGeneralInterviewQuestionModal');

                // Set buttons to unload state
                btnToUnloadState('#addGeneralInterviewQuestionBtn', `
                    <span>Add</span>
                    <i class="fas fa-plus ml-1"></i>
                `);
                enableElement('#cancelGeneralInterviewQuestionBtn');

                // Reload DataTable
                reloadDataTable('#generalInterviewQuestionsDT');

                // Alert success message
                toastr.success('A new general interview question is successfully added');
            }
        },
        error: () => {
            
            // Hide Modal
            hideModal('#addGeneralInterviewQuestionModal');

            // Set buttons to unload state
            btnToUnloadState('#addGeneralInterviewQuestionBtn', `
                <span>Add</span>
                <i class="fas fa-plus ml-1"></i>
            `);
            enableElement('#cancelGeneralInterviewQuestionBtn');

            // Alert error message
            toastr.error('There was an error in creating a general interview question');
        }
    })
}

// When add general interview question modal is going to be hidden
onHideModal('#addGeneralInterviewQuestionModal', () => resetForm('#addGeneralInterviewQuestionForm'));


/**
 * ==============================================================================
 * GET ONE GENERAL INTERVIEW QUESTIONS
 * ==============================================================================
 */

/** View Interview Question Details */
const viewGenInterviewQuestionDetails = (interviewQuestionID) => {
    GET_ajax(`${ H_API_ROUTE }interview-questions/${ interviewQuestionID }`, {
        success: result => {
            if(result) {
                
                // Set Interview Question
                setContent('#interviewQuestion', result.question)
                
                // Set Added By
                setContent('#interviewQuestionAddedBy', () => {
                    const addedBy = result.interview_question_added_by;

                    const fullName = formatName('F M. L, S', {
                        firstName: addedBy.first_name,
                        middleName: addedBy.middle_name,
                        lastName: addedBy.last_name,
                        suffixName: addedBy.suffix_name
                    });

                    const position = addedBy.position;

                    return `
                        <div>${ fullName }</div>
                        <div class="small text-secondary">${ position.name }, ${ position.department.name }</div>
                    `
                })
                
                // Set Added At
                setContent('#interviewQuestionAddedAt', () => {
                    const addedAt = result.added_at;

                    return `
                        <div>${ formatDateTime(addedAt, 'Full Date') }</div>
                        <div>${ formatDateTime(addedAt, 'Time') }</div>
                        <div class="small text-secondary">${ fromNow(addedAt) }</div>
                    `
                })
                
                // Set Updated By
                setContent('#interviewQuestionUpdatedBy', () => {
                    const updatedBy = result.interview_question_updated_by;

                    const fullName = formatName('F M. L, S', {
                        firstName: updatedBy.first_name,
                        middleName: updatedBy.middle_name,
                        lastName: updatedBy.last_name,
                        suffixName: updatedBy.suffix_name
                    });

                    const position = updatedBy.position;

                    return `
                        <div>${ fullName }</div>
                        <div class="small text-secondary">${ position.name }, ${ position.department.name }</div>
                    `
                })
                
                // Set Updated At
                setContent('#interviewQuestionUpdatedAt', () => {
                    const updatedAt = result.updated_at;

                    return `
                        <div>${ formatDateTime(updatedAt, 'Full Date') }</div>
                        <div>${ formatDateTime(updatedAt, 'Time') }</div>
                        <div class="small text-secondary">${ fromNow(updatedAt) }</div>
                    `
                });

                showModal('#genInterviewQuestionDetailsModal');
            }
        },
        error: () => toastr.error('There was an error in getting a general interview question details')
    })
}


/**
 * ==============================================================================
 * INTERVIEW SCHEDULE DETAILS
 * ==============================================================================
 */

/** Interview Schedule Details */
ifSelectorExist('#interviewScheduleDetails', () => {
    GET_ajax(`${ H_API_ROUTE }interview-schedules/${ interviewScheduleID }`, {
        success: result => {

            /**
             * ==============================================================================
             * SCHEDULE DETAILS
             * ==============================================================================
             */

            const scheduledDate = result.scheduled_date;
            const startSession = moment(`${ scheduledDate } ${ result.start_session }`);
            const endSession = moment(`${ scheduledDate } ${ result.end_session }`);

            // Set Scheduled Date
            setContent('#scheduledDate', formatDateTime(scheduledDate, 'Full Date'));

            // Set Session Range
            setContent('#sessionRange', `${ formatDateTime(startSession, 'Time') } - ${ formatDateTime(endSession, 'Time') }`)

            // Set Session Humanized
            setContent('#scheduledDateHumanized', `${ fromNow(startSession) }`)

            $('#interviewScheduleDetailsLoader').remove();
            showElement('#interviewScheduleDetails');

            /**
             * ==============================================================================
             * JOB POST DETAILS
             * ==============================================================================
             */

            const jobPost = result.schedule_for;

            // Set Vacant Position
            setContent('#vacantPosition', jobPost.manpower_request.vacant_position.name);

            // Set Posted At
            setContent('#jobPostedAt', `Posted ${ formatDateTime(jobPost.created_at, 'Full Date') }`);

            const staffsNeeded = jobPost.manpower_request.staffs_needed;
            
            // Set Staffs Needed
            setContent('#staffsNeeded', `${ staffsNeeded } new staff${ staffsNeeded > 1 ? 's' : '' }`);

            // Set Employment Type
            setContent('#employmentType', jobPost.manpower_request.employment_type);

            // Set Deadline
            const deadline = jobPost.manpower_request.deadline;
            isEmptyOrNull(deadline)
                ? setContent('#deadline', `<div class="text-secondary font-italic">No deadline</div>`)
                : setContent('#deadline', formatDateTime(deadline, 'Full DateTime'))

            $('#jobPostSummaryLoader').remove();
            showElement('#jobPostSummary');
        },
        error: () => {
            toastr.error('There was an error in getting interview schedule details')
        }
    });
});

/** Scheduled Interviewees DataTable */
initDataTable('#intervieweesDT', {
    // debugMode: true,
    url: `${ H_API_ROUTE }interview-schedules/${ interviewScheduleID }/interviewees`,
    columns: [

        // Created At (Hidden for default)
        { data: "created_at", visible: false },

        // Applicant
        {
            data: null,
            render: data => {
                const applicant = data.applicant_info;

                return formatName('F M. L, S', {
                    firstName: applicant.first_name,
                    middleName: applicant.middle_name,
                    lastName: applicant.last_name,
                    suffixName: applicant.suffixName
                });
            }
        },

        // Email
        { data: 'applicant_info.email'},

        // Contact Number
        { data: 'applicant_info.contact_number'},

        // Date Applied
        {
            data: null,
            render: data => {
                const appliedAt = data.applicant_info.created_at;
                return `
                    <div>${ formatDateTime(appliedAt, 'MMM. D, YYYY') }<div>
                    <div class="small text-secodary">${ fromNow(appliedAt) }<div>
                `
            }
        },

        // Status
        {
            data: null,
            render: data => {
                const isInterviewed = data.is_interviewed;
                if(isEmptyOrNull(isInterviewed))
                    return `<div class="badge bg-warning p-2 w-100">Not interviewed yet</div>`
                else if(isInterviewed)
                    return `
                        <div class="badge bg-success p-2 w-100">
                            <i class="fas fa-check mr-1"></i>
                            <span>Interviewed</span>   
                        </div>
                    `
                else
                    return `
                        <div class="badge bg-danger p-2 w-100">
                            <i class="fas fa-times mr-1"></i>
                            <span>Not Interviewed</span>   
                        </div>
                    `
            }
        },

        // Actions
        {
            data: null,
            render: data => {
                const isInterviewed = data.is_interviewed;

                let userActions = '';

                if(isEmptyOrNull(isInterviewed)) {
                    userActions = `
                        <a 
                            class="dropdown-item d-flex"
                            href="${ H_WEB_ROUTE }interview/${ data.interviewee_id }"                                  
                        >
                            <div style="width: 2rem"><i class="fas fa-tasks mr-1"></i></div>
                            <div>Interview this applicant</div>
                        <a>
                        <div 
                            class="dropdown-item d-flex"
                            role="button"                            
                        >
                            <div style="width: 2rem"><i class="fas fa-times mr-1"></i></div>
                            <div>Mark as Not Interviewed</div>
                        <div>
                    `
                } else {
                    userActions = `
                        <div 
                            class="dropdown-item d-flex"
                            role="button"                            
                        >
                            <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                            <div>View Details</div>
                        <div>
                    `;
                }

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            ${ userActions }
                        </div>
                    </div>
                `
            }
        }
    ]
});


/**
 * ==============================================================================
 * INTERVIEW SCORESHEET
 * ==============================================================================
 */

var generalQuestionInputs = [];
var addedQuestions = [];

/** Applicants Details */
ifSelectorExist('#applicantDetails', () => {
    GET_ajax(`${ H_API_ROUTE }interviewee/${ intervieweeID }`, {
        success: result => {
            const applicant = result.applicant_info;

            // Set interviweee name
            setContent('#intervieweeName', formatName('L, F M., S', {
                firstName: applicant.first_name,
                middleName: applicant.middle_name,
                lastName: applicant.last_name,
                suffixName: applicant.suffixName
            }));

            // Set Applying for
            setContent('#applyingFor', applicant.applied_job.manpower_request.vacant_position.name);

            // Set Email
            setContent('#applicantEmail', applicant.email);

            // Set Contact Number
            setContent('#applicantContactNumber', applicant.contact_number);

            // Set Applied Date
            setContent('#appliedDate', formatDateTime(applicant.created_at, 'Full Date'));
            setContent('#appliedTime', formatDateTime(applicant.created_at, 'Time'));
            setContent('#appliedAtHumanized', fromNow(applicant.created_at));

            // Set Resume
            $('#viewResumeBtn').attr('href', `${ URL_RESUME_FILES }${ applicant.resume }`)

            // Components to loaded state
            $('#applicantDetailsLoader').remove();
            showElement('#applicantDetails');
        },
        error: () => toastr.error('There was an error in getting interviewee details')
    })
});

/** For General Interview Questions Table */
ifSelectorExist('#generalInterviewQuestionsForIntervieweeDT', () => {
    GET_ajax(`${ H_API_ROUTE }interview-questions/general`, {
        success: result => {
            $('#generalInterviewQuestionsForIntervieweeDTBody').empty();

            if(result.length > 0) {
                result.forEach(r => {
                    const inputName = `input${ r.interview_question_id.replace(/\-/g, '') }`;

                    $('#generalInterviewQuestionsForIntervieweeDTBody').append(`
                        <tr>
                            <td>
                                <p>${ r.question }</p>
                            </td>
                            <td>
                                <div class="form-group">
                                    <input 
                                        class="form-control form-control-border" 
                                        type="number" 
                                        min=0 
                                        max=100 
                                        name="${ inputName }"
                                        placeholder="%"
                                        required
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="text-center dropdown">
                                    <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </div>

                                    <div class="dropdown-menu dropdown-menu-right">
                                        <div 
                                            class="dropdown-item d-flex"
                                            role="button"
                                            onclick="removeGeneralQuestion('${ 'test' }')"
                                        >
                                            <div style="width: 2rem"><i class="fas fa-trash-alt mr-1"></i></div>
                                            <span>Remove</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `);

                    generalQuestionInputs.push({
                        interviewQuestionID: r.interview_question_id,
                        name: inputName
                    });

                    // Set Validation Rule
                    $(`[name="${ inputName }"]`).rules('add', {
                        required: true,
                        number: true,
                        min: 0,
                        max: 100,
                        messages: {
                            required: 'Required',
                            number: 'Invalid value',
                            min: 'Min. of 0',
                            max: 'Max. of 100'
                        }
                    });
                });
            } else {
                $('#generalInterviewQuestionsForIntervieweeDTBody').append(`
                    <tr>
                        <td colspan="2">
                            <div class="py-5 text-center">
                                <h5>No general interview questions</h5>
                            </div>
                        </td>
                    </tr>
                `);
            }

        },
        error: () => {
            toastr.error('There was an error in getting the general interview questions')
        }
    })
});

/** Validate Interview Scoresheet Form */
validateForm('#interviewScoresheetForm', {
    submitHandler: () => {
        showModal('#confirmSaveScoresheetModal');
        return false;
    }
});

/** Validate Add Interview Question Modal */
validateForm('#addInterviewQuestionForm', {
    rules: {
        question: {
            required: true
        }
    },
    messages: {
        question: {
            required: 'Please type your additional question here'
        }
    },
    submitHandler: () => {
        const question = generateFormData('#addInterviewQuestionForm').get('question');
        
        if(addedQuestions.length == 0) $('#addedInterviewQuestionsDTBody').empty();

        const inputName = `${String.fromCharCode(97+Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 26)}${Date.now()}`;
        
        $('#addedInterviewQuestionsDTBody').append(`
            <tr id="row${ inputName }">
                <td>
                    <p>${ question }</p>
                </td>
                <td>
                    <div class="form-group">
                        <input 
                            class="form-control form-control-border" 
                            type="number" 
                            min=0 
                            max=100 
                            name="${ inputName }"
                            placeholder="%"
                            required
                        >
                    </div>
                </td>
                <td>
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" role="button" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <div 
                                class="dropdown-item d-flex"
                                role="button"
                                onclick="removeAddedQuestion('${ inputName }')"
                            >
                                <div style="width: 2rem"><i class="fas fa-trash-alt mr-1"></i></div>
                                <span>Remove</span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `);

        // Set Validation Rule
        $(`[name="${ inputName }"]`).rules('add', {
            required: true,
            number: true,
            min: 0,
            max: 100,
            messages: {
                required: 'Required',
                number: 'Invalid value',
                min: 'Min. of 0',
                max: 'Max. of 100'
            }
        });

        addedQuestions.push({
            name: inputName,
            question: question
        });

        hideModal('#addInterviewQuestionModal');

        toastr.success('A new interview question has been added');

        return false;
    }
});

/** When Add Interview Question Modal is going to be hidden */
onHideModal('#addInterviewQuestionModal', () => resetForm('#addInterviewQuestionForm'));

/** Save Scoresheet */
onClick('#saveScoresheetBtn', () => {

    // Set buttons to loading state
    btnToLoadingState('#saveScoresheetBtn');
    disableElement('#cancelConfirmSaveScoresheetModalBtn');

    const formData = generateFormData('#interviewScoresheetForm');
    const get = (n) => { return formData.get(n) }
    
    generalQuestionInputs.forEach(g => {
        const data = {
            interview_question_id: g.interviewQuestionID,
            score: get(g.name)
        };

        POST_ajax(`${ H_API_ROUTE }interview-scores/${ intervieweeID }`, data, {
            success: () => {},
            error: () => toastr.error('There was an error in saving interviewee score')
        });
    });

    if(addedQuestions.length > 0) {
        addedQuestions.forEach(a => {
            const data = {
                question: a.question,
                type: 'Added'
            }

            POST_ajax(`${ H_API_ROUTE }interview-questions`, data, {
                success: result => {
                    const data = {
                        interview_question_id: result.data.interview_question_id,
                        score: get(a.name)
                    }

                    POST_ajax(`${ H_API_ROUTE }interview-scores/${ intervieweeID }`, data, {
                        success: result => console.log(result),
                        error: () => toastr.error('There was an error in saving interviewee score for added questions')
                    });
                },
                error: () => toastr.error('There was an error in saving added questions')
            });
        });
    }

    PUT_ajax(
        `${ H_API_ROUTE }interviewee/${ intervieweeID }`,
        {
            is_interviewed: true,
            interviewed_at: formatDateTime(moment())
        },
        {
            success: result => {
                if(result) {
                    localStorage.setItem('sessioned_alert', true);
                    localStorage.setItem('sessioned_alert_theme', 'success');
                    localStorage.setItem('sessioned_alert_message', 'Applicant is successfully interviewed');
                    history.back();
                }
            },
            error: () => {
                btnToUnloadState('#saveScoresheetBtn', `
                    <span>Yes, save it!</span>
                    <i class="fas fa-check ml-1"></i>
                `);
                enableElement('#cancelConfirmSaveScoresheetModalBtn');
                toastr.error('There was an error in updating interviewee record')
            }
        }
    )
});

/** Remove General Question */
const removeGeneralQuestion = () => {
    showModal('#confirmRemoveGeneralQuestionModal');
    setValue('#', )
}


/** Remove Added Question */
const removeAddedQuestion = (inputName) => {
    showModal('#confirmRemoveAddedQuestionModal');
    setValue('#addedInputName', inputName);
}

/** Validate Confirm Added Question Form */
validateForm('#confirmRemoveAddedQuestionForm', {
    rules: {
        addedInputName: {
            required: true
        }
    },
    messages: {
        addedInputName: {
            required: 'This field must have value'
        }
    },
    submitHandler: () => {

        // Get added input name from the form
        const inputName = generateFormData('#confirmRemoveAddedQuestionForm').get('addedInputName');

        // Remove Row
        $(`#row${ inputName }`).remove();

        // Remove Added Question from array
        addedQuestions = $.grep(addedQuestions, e => { return e.name != inputName });

        // Set empty body if added questions array is empty
        if(addedQuestions.length == 0) {
            setContent('#addedInterviewQuestionsDTBody', `
                <tr>
                    <td colspan="2">
                        <div class="text-center py-5">
                            <h5 class="text-secondary">No additional question yet</h5>
                        </div>
                    </td>
                </tr>
            `)
        }

        // Hide Confirm Remove Added Question Modal
        hideModal('#confirmRemoveAddedQuestionModal');

        // Show info alert
        toastr.info('An added interview question has been removed')

        return false;
    }
})

/** On Confirm Remove Added Question Modal is going to be hidden */
onHideModal('#confirmRemoveAddedQuestionModal', () => resetForm('#confirmRemoveAddedQuestionForm'));