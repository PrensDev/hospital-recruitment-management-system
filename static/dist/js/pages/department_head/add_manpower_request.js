validateForm('#addManPowerRequestForm',{
    rules: {
        position: {
            required: true,
        },
        natureOfRequest: {
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