/**
 * ==============================================================================
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */


/** If user select reject for manpower request */
$('#customRadio2').on('change', ()=> {
    if($("#customRadio2").val() == "Rejected") $("#reasonField").show()
});

/** If user select approve for manpower request */
$('#customRadio1').on('change', ()=> {
    if($("#customRadio1").val() == "Approved") $("#reasonField").hide()
});


/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */


/** Manpower Request DataTable */
initDataTable('#manpowerRequestDT', {
    url: `${ H_API_ROUTE }requisitions`,
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
                    </div>
                `
            }
        }
    ],
})


/**
 * ==============================================================================
 * VIEW MANPOWER REQUEST DETAILS
 * ==============================================================================
 */


/** View Manpower Request */
const viewManpowerRequest = (requisitionID) => {
    GET_ajax(`${ H_API_ROUTE }requisitions/${ requisitionID }`, {
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


/**
 * ==============================================================================
 * UPDATE MANPOWER REQUEST STATUS
 * ==============================================================================
 */


/** Validate Manpower Request */
validateForm('#updateManpowerRequestStatusForm', {
    rules: {
        requestStatus: {
            required: true
        },
        remarks: {
            required: true
        }
    }, 
    messages: {
        requestStatus: {
            required: 'Please select an option'
        },
        remarks: {
            required: 'please type your reason in rejecting this request'
        }
    },
    submitHandler: () => updateManpowerRequestStatus()
})


/** Update Manpower Request Status */
const updateManpowerRequestStatus = () => {
    const formData = generateFormData('#updateManpowerRequestStatusForm');

    const data = {
        request_status: formData.get('requestStatus'),
        remarks: formData.get('remarks')
    }

    console.log(data);
}