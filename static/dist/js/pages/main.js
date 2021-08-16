/** 
 * =====================================================
 * FUNCTIONS
 * =====================================================
 * */

/** Initialize DataTable */
const initDataTable = (selector = "", dtOptions = {}) => {
    $(() => { if($(selector).length) $(selector).DataTable(dtOptions) })
}

/** Validate Form */
const validateForm = (selector = "", validationOptions = {
    rules: {},
    messages: {},
    submitHandler: () => {}
}) => {
    if($(selector).length) {
        $(selector).validate({
            rules: validationOptions.rules,
            messages: validationOptions.messages,
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            },
            submitHandler: validationOptions.submitHandler
        }) 
    }
}