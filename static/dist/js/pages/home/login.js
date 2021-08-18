
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
            } else {
                access_token = result.access_token;

                localStorage.setItem("access_token", access_token);

                toastr.options = {
                    "preventDuplicates": true,
                    "positionClass": "toast-top-center",
                    "showDuration": "3000"
                }
                toastr.success("Log in was successful!")
            }
        },
    }).fail(() => {
        toastr.options = {
            "preventDuplicates": true,
            "positionClass": "toast-top-center",
            "showDuration": "3000"
        }
        toastr.danger("There was a problem in logging in. Please try again later")

    });
}