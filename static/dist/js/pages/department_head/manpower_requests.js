/** Validate Add Manpower Request Form */
validateForm('#addManPowerRequestForm',{
    rules: {
        position: {
            required: true,
        },
        natureOfRequest: {
            required: true
        },
        noOfStaffsNeeded: {
            min: 1,
            required: true
        },
        deadline: {
            required: true
        },
        employmentType: {
            required: true
        },
        minSalary: {
            required: true
        },
        maxSalary: {
            required: true
        },
        jobDescription: {
            required: true
        },
        qualifications: {
            required: true
        }
    },
    messages:{
        position: {
            required: 'Position is required',
        },
        natureOfRequest: {
            min: 'The number of staffs must at least 1',
            required: 'Nature of request is required'
        },
        noOfStaffsNeeded: {
            required: 'No. of vacany is required'
        },
        deadline: {
            required: 'Deadline is required'
        },
        employmentType: {
            required: 'Employment type is required'
        },
        minSalary: {
            required: 'Minimum salary is required'
        },
        maxSalary: {
            required: 'Maximum salary is required'
        },
        jobDescription: {
            required: 'Job description is required'
        },
        qualifications: {
            required: 'Qualifications is required'
        }
    },
    submitHandler:() =>{alert('submitted')}
})


/** ManPower Requests DataTable */
initDataTable('#manpowerRequestDT', {
    ajax: {
        url: `${ D_API_ROUTE }requisitions`,
        headers: AJAX_HEADERS,
        dataSrc: ""
        // success: result => console.log(result)
    },
    columns: [
        { 
            data: null,
            render: data => {
                return "Nurse"
            }
        },
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
                requestStatus = data.request_status;
                var bagdeTheme;
                if(requestStatus === "For Review")  bagdeTheme = "warning";
                if(requestStatus === "Approved")    bagdeTheme = "success";
                if(requestStatus === "Rejected")    bagdeTheme = "danger";
                if(requestStatus === "Completed")   bagdeTheme = "blue";

                return `
                    <div class="badge badge-${ bagdeTheme } p-2 w-100">${ requestStatus }</div>
                `
            }
        },
        {
            data: null,
            render: data => {
                createdAt = data.created_at
                return `
                    <div>${ formatDateTime(createdAt, "DateTime") }<div>
                    <div class="small text-secondary">${ fromNow(createdAt) }<div>
                `
            }
        },
        { 
            data: null,
            class: "text-center",
            render: data => {
                requisitionID = data.requisition_id
                return `
                    <div 
                        class="btn btn-primary btn-sm"
                        onclick="viewManpowerRequest('${ requisitionID }')"
                    >
                        <i class="fas fa-folder mr-1"></i>
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
                        <i class="fas fa-trash mr-1"></i>
                        <span>Delete</span>
                    </div>
                `
            }
        }
    ],
    responsive: true,
    sort: false
})

/** View Manpower Request */
const viewManpowerRequest = (requisitionID) => {
    GET_ajax(`${ D_API_ROUTE }requisitions/${ requisitionID }`, {
        success: result => {
            showModal('#viewManPowerRequestModal');
        },
        error: () => toastr.danger('There was an error while getting requisition details')
    });
}