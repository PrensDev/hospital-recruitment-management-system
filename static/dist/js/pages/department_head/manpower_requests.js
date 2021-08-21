/**
 * ==============================================================================
 * SUBMIT MANPOWER REQUEST
 * ==============================================================================
 */


/** Request Nature For Add Select 2 */
$('#requestNatureForAdd').select2({
    placeholder: "Please select the request of nature",
    minimumResultsForSearch: -1,
});


/** Employment Type For Add Select2 */
$('#employmentTypeForAdd').select2({
    placeholder: "Please select an employment type",
    minimumResultsForSearch: -1,
});


/** Vacant Position For Add Select2 */
$('#vacantPositionForAdd').select2({
    placeholder: "Please the vacant position",
})


/** Request Description For Add Summernote */
$('#requestDescriptionForAdd').summernote({
    height: 500,
    placeholder: "Write the description of your request here",
    toolbar: [
        ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
        ['para', ['ol', 'ul', 'paragraph']],
        ['table', ['table']]
    ]
})


/** Validate Add Manpower Request Form */
validateForm('#addManpowerRequestForm', {
    rules: {
        vacantPosition: {
            required: true,
        },
        requestNature: {
            required: true
        },
        staffsNeeded: {
            min: 1,
            required: true
        },
        employmentType: {
            required: true
        },
        requestDescription: {
            required: true
        },
    },
    messages:{
        vacantPosition: {
            required: 'Position is required',
        },
        requestNature: {
            required: 'Nature of request is required'
        },
        staffsNeeded: {
            min: 'The number of staffs must at least 1',
            required: 'No. of vacany is required'
        },
        employmentType: {
            required: 'Employment type is required'
        },
        requestDescription: {
            required: 'Job description is required'
        },
    },
    submitHandler:() => submitManpowerRequest()
});


/** Submit Manpower Request */
const submitManpowerRequest = () => {
    const formData = generateFormData('#addManpowerRequestForm');
    
    const minMonthlySalary = formData.get("minSalary");
    const maxMonthlySalary = formData.get("maxSalary");
    const deadline = formData.get("deadline");

    const data = {
        position_id: "651aba26-0285-11ec-ac77-049226169d64",
        employment_type: formData.get("employmentType"),
        request_nature: formData.get("requestNature"),
        staffs_needed: parseInt(formData.get("staffsNeeded")),
        min_monthly_salary: nullOrReturnValue(minMonthlySalary, parseFloat(minMonthlySalary)),
        max_monthly_salary: nullOrReturnValue(maxMonthlySalary, parseFloat(maxMonthlySalary)),
        content: formData.get("requestDescription"),
        deadline: nullOrReturnValue(deadline, formatDateTime(deadline))
    }

    POST_ajax(`${ D_API_ROUTE }requisitions`, data, {
        success: result => {
            console.log(result)
        },
        error: () => toastr.error("There was an error in creating manpower request")
    })
}


/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */


/** ManPower Requests DataTable */
initDataTable('#manpowerRequestDT', {
    url: `${ D_API_ROUTE }requisitions`,
    columns: [
        { data: "vacant_position.name" },
        { 
            data: null,
            render: data => {
                staffsNeeded = data.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }`;
            }
        },
        { data: "request_nature"},
        {
            data: null,
            render: data => {
                const requestStatus = data.request_status;

                var bagdeTheme;
                var badgeIcon;
                let validStatus = true;
                
                if(requestStatus === "For Review") {
                    bagdeTheme = "warning";
                    badgeIcon = "redo";
                } else if(requestStatus === "Approved") {
                    bagdeTheme = "success";
                    badgeIcon = "check";
                } else if(requestStatus === "Rejected") {
                    bagdeTheme = "danger";
                    badgeIcon = "times";
                } else if(requestStatus === "Completed") {
                    bagdeTheme = "blue";
                    badgeIcon = "thumbs";
                } else validStatus = false

                return validStatus 
                    ? `
                        <div class="badge badge-${ bagdeTheme } p-2 w-100">
                            <i class="fas fa-${ badgeIcon } mr-1"></i>
                            <span>${ requestStatus }</span>
                        </div>
                    ` 
                    : `<div class="badge badge-light p-2 w-100">Undefined</div>`
            }
        },
        {
            data: null,
            render: data => {
                const createdAt = data.created_at
                return `
                    <div>${ formatDateTime(createdAt, "DateTime") }<div>
                    <div class="small text-secondary">${ fromNow(createdAt) }<div>
                `
            }
        },
        { 
            data: null,
            render: data => {
                requisitionID = data.requisition_id
                return `
                    <div class="text-center">
                        <div 
                            class="btn btn-secondary btn-sm"
                            onclick="viewManpowerRequest('${ requisitionID }')"
                        >
                            <i class="fas fa-list mr-1"></i>
                            <span>View</span>
                        </div>
                        <div 
                            class="btn btn-info btn-sm"
                            data-toggle="modal"
                            data-target="#"
                        >
                            <i class="fas fa-pencil-alt mr-1"></i>
                            <span>Edit</span>
                        </div>
                        
                        <div 
                            class="btn btn-danger btn-sm"
                            data-toggle="modal"
                            data-target="#"
                        >
                            <i class="fas fa-trash-alt mr-1"></i>
                            <span>Delete</span>
                        </div>
                    </div>
                `
            }
        }
    ],
});


/**
 * ==============================================================================
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */


/** View Manpower Request */
const viewManpowerRequest = (requisitionID) => {
    GET_ajax(`${ D_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            const requestedBy = result.manpower_request_by;
            
            // Set Requestor Name
            setContent('#requestorName', formatName("L, F M., S", {
                firstName: requestedBy.first_name,
                middleName: requestedBy.middle_name,
                lastName: requestedBy.last_name,
                suffixName: requestedBy.suffix_name
            }));
            
            // Set Requestor Department
            setContent('#requestorDepartment', requestedBy.position.name);
            
            // Set Date Requested
            setContent('#dateRequested', formatDateTime(result.created_at, "Date"));
            
            // Set Deadline
            setContent('#deadline', () => {
                const deadline = result.deadline;
                if(isEmptyOrNull(deadline)) return "No deadline"
                else return formatDateTime(result.deadline, "Date")
            });

            // Set Requested Position
            setContent('#requestedPosition', result.vacant_position.name);
            
            // Set No. of Staffs Needed
            setContent('#noOfStaffsNeeded', () => {
                const staffsNeeded = result.staffs_needed;
                return `${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }`
            });

            // Set Employment Type
            setContent('#employmentType', result.employment_type);

            // Set Employment Type
            setContent('#employmentType', result.employment_type);

            // Set Request Nature
            setContent('#requestNature', result.request_nature);

            // Set Suggested Salary
            setContent('#suggestedSalary', () => {
                const minMonthlySalary = result.min_monthly_salary;
                const maxMonthlySalary = result.max_monthly_salary;
                const hasNoSalaryRange = isEmptyOrNull(minMonthlySalary) && isEmptyOrNull(maxMonthlySalary);
                return hasNoSalaryRange ? 'Unset' : `P ${ minMonthlySalary } - P ${ maxMonthlySalary }/mon`;
            });

            // Set Request Description
            setContent('#requestDescription', result.content);

            // Set Approved By
            setContent('#approvedBy', () => {
                const approvedBy = result.manpower_request_reviewed_by;
                return isEmptyOrNull(approvedBy)
                    ? "Not yet approved"
                    : () => {
                        const approvedByFullName = formatName("L, F M., S", {
                            firstName: approvedBy.first_name,
                            middleName: approvedBy.middle_name,
                            lastName: approvedBy.last_name,
                            suffixName: approvedBy.suffix_name
                        });
                        return `
                            <div>${ approvedByFullName }</div>
                            <div class="small text-secondary">${ approvedBy.position.name }, ${ approvedBy.position.department.name }</div>
                        `
                    }
            });

            // Set Approved At
            setContent('#approvedAt', () => {
                const approvedAt = result.approved_at;
                return isEmptyOrNull(approvedAt) ? "No status" : formatDateTime(approvedAt, "Date")
            });

            // Set Approved At
            setContent('#completedAt', () => {
                const completedAt = result.completed_at;
                return isEmptyOrNull(completedAt) ? "No status" : formatDateTime(completedAt, "Date")
            });

            // Show View Manpower Request Modal
            showModal('#viewManpowerRequestModal');
        },
        error: () => toastr.error('Sorry, there was an error while getting requisition details')
    });
}