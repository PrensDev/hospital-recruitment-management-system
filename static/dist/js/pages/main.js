/** 
 * =====================================================
 * FUNCTIONS
 * =====================================================
 * */

/** Initialize DataTable */
const initDataTable = (selector = "", dtOptions = {}) => $(() => { if($(selector).length) $(selector).DataTable(dtOptions) })

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

/** Generate Form Data */
const generateFormData = (selector) => { return new FormData($(selector)[0]) }

/** Humanize DateTime */
const fromNow = (datetime) => { return moment(datetime).fromNow() }
const toNow = (datetime) => { return moment(datetime).fromNow() }

/** Format DateTime */
const formatDateTime = (datetime, format = "Full DateTime") => {
    var realFormat;
    if(format === "Full DateTime")
        realFormat = "dddd, MMMM D, YYYY; hh:mm A"
    else if(format === "DateTime")
        realFormat = "MMMM D, YYYY; hh:mm A"
    else if(format === "Date")
        realFormat = "MMMM D, YYYY"
    else if(format === "Time")
        realFormat = "hh:mm A"
    else
        realFormat = format
    return moment(datetime).format(realFormat)
}

/** Show/Hide Modal */
const showModal = (selector) => $(selector).length ? $(selector).modal('show') : console.error(`Selector "${ selector }" does not exist`);
const hideModal = (selector) => $(selector).length ? $(selector).modal('hide') : console.error(`Selector "${ selector }" does not exist`);

/** GET AJAX */
const GET_ajax = (url, options = {
    success: () => {},
    error: () => {}
}) => {
    $.ajax({
        url: url,
        type: 'GET',
        headers: AJAX_HEADERS,
        success: options.success,
        error: options.error
    });
}