/** Validate Add Onboarding Employee Form */
validateForm('#addOnboardingEmployeeForm', {
    rules: {
        firstName: {
            required: true
        },
        lastName: {
            required: true
        },
        contactNumber: {
            required: true
        },
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        firstName: {
            required: "First name is required"
        },
        lastName: {
            required: "Last name is required"
        },
        contactNumber: {
            required: "Contact number is required"
        },
        email: {
            required: "Email is required",
            email: "This must be a valid email"
        }
    },
    submitHandler: () => {
        // Show Modal
        showModal('#confirmAddOnboardingEmployeeModal');
        return false;
    }
});