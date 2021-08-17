
/** Validate Login Form */
validateForm("#loginForm", {
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true
        }
    },
    messages: {
        email: {
            required: "Your email is required",
            email: "Input must be a valid email"
        },
        password: {
            required: "Your password is required"
        }
    },
    submitHandler: () => loginAJAX()
})

loginAJAX = () => {
    const formData = generateFormData('#loginForm');

    const data = {
        username: formData.get('email'),
        password: formData.get('password')
    }

    $.ajax({
        url: `${ BASE_URL_API }auth/login`,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: result => {
            if(result.login_status === "Failed") {
                toastr.options = {
                    "preventDuplicates": true,
                    "positionClass": "toast-top-center",
                    "showDuration": "3000"
                }
                toastr.warning(result.message)
            } else if(result.login_status === "Success") {
                console.log(result)
                
                const user_type = result.data.user_type;

                if(user_type === "Department Head") location.assign(`${ BASE_URL_WEB }d`)
                if(user_type === "Hiring Manager")  location.assign(`${ BASE_URL_WEB }h`)
                if(user_type === "Recruiter")       location.assign(`${ BASE_URL_WEB }r`)
            }
        },
    }).fail(() => console.log("There was a problem in logging in"));
}