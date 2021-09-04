/**
 * ==============================================================================
 * GET ALL GENERAL INTERVIEW QUESTIONS
 * ==============================================================================
 */

// Initialize General Interview Questions DataTable
initDataTable('#generalInterviewQuestionsDT', {
    // debugMode: true,
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
onHideModal('#addGeneralInterviewQuestionModal', () => {
    resetForm('#addGeneralInterviewQuestionForm');
});


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