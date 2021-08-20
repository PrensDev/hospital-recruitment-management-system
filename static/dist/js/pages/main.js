/** 
 * =====================================================
 * FUNCTIONS
 * =====================================================
 * */


/** If Selector Exist */
const ifSelectorExist = (selector = "", handler = () => {}, isRequired = true) => {
    if($(selector).length) handler() 
    else if(isRequired) console.error(`Selector ${ selector } does not exist.`)
}


/** Is Empty Or Null */
const isEmptyOrNull = (value) => { return $.trim(value) === "" || value == null }


/** Initialize DataTable */
const initDataTable = (selector = "", dtOptions = {
    debugMode: false,
    url: "",
    columns: [],
    sort: true
}) => $(() => { 
    var ajaxObj = {
        url: dtOptions.url,
        headers: AJAX_HEADERS,
        dataSrc: ""
    }
    
    if(dtOptions.debugMode) ajaxObj.success = result => console.log(result)

    ifSelectorExist(selector, () => $(selector).DataTable({
        ajax: ajaxObj,
        columns: dtOptions.columns,
        responsive: true,
        sort: dtOptions.sort
    }))
})


/** Validate Form */
const validateForm = (selector = "", validationOptions = {
    rules: {},
    messages: {},
    submitHandler: () => {}
}) => {
    ifSelectorExist(selector, () => {
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
        });
    }, false);
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
const showModal = (selector) => ifSelectorExist(selector, () => $(selector).modal('show'));
const hideModal = (selector) => ifSelectorExist(selector, () => $(selector).modal('hide'));


/** Set Content */
const setContent = (selector, value) => ifSelectorExist(selector, () => $(selector).html(value))


/** Format Name */
const formatName = (format = "", fullName = {
    firstName: "",
    middleName: "",
    lastName: "",
    suffixName: ""
}) => {
    const isEmpty = (namePart) => { return namePart === "" || namePart == null }

    const toMiddleInitial = (middleName) => { return `${ middleName.charAt(0) }.`}

    var F = $.trim(fullName.firstName);
    var M = $.trim(fullName.middleName);
    var L = $.trim(fullName.lastName);
    var S = $.trim(fullName.suffixName);
    
    if(format === "L, F M., S") {
        if(isEmpty(M) && isEmpty(S)) {
            return `${ L }, ${ F }`
        } else if(isEmpty(S)) {
            return `${ L }, ${ F } ${ toMiddleInitial(M) }`
        } else {
            return `${ L }, ${ F } ${ toMiddleInitial(M) }, ${ S }`
        }
    } else {
        console.error(`Format "${ format }" for name is invalid`)
        return ""
    }
}


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