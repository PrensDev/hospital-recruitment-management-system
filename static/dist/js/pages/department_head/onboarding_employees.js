/**
 * ==============================================================================
 * ADD ONBOARDING EMPLOYEE
 * ==============================================================================
 */


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


/** Initalize Stepper for Add Onboarding Employee */
document.addEventListener('DOMContentLoaded', function () {
    window.stepper = new Stepper(document.querySelector('.bs-stepper'))
});



validateForm('#addGeneralTaskForm', {
    rules: {
        taskTitle: {
            required: true
        },
        description: {
            required: true
        }
    },
    messages: {
        taskTitle: {
            required: 'Task title is required'
        },
        description: {
            required: 'Description is required'
        }
    },
    submitHandler: () => {
        alert('Submitted');
        return false;
    }
})