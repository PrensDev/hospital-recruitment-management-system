validateForm('#addManPowerRequestForm',{
    rules: {
        position: {
            required: true,
        },
        natureOfRequest: {
            required: true
        },
        noOfStaffsNeeded: {
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
            required: 'Nature of request is required'
        },
        noOfStaffsNeeded: {
            required: 'No. of staffs needed is required'
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