/** 
 * =====================================================
 * FUNCTIONS
 * =====================================================
 * */


/** If Selector Exist */
const ifSelectorExist = (selector = "", handler = () => {}, isRequired = true) => {
    if($(selector).length) handler() 
    else if(isRequired && IF_SELECTOR_EXIST_DEBUG_MODE) console.error(`Selector ${ selector } does not exist.`)
}


/** Is Empty Or Null */
const isEmptyOrNull = (value) => { return $.trim(value) === "" || value == null }


/** Null Or With Value */
const nullOrReturnValue = (nullable, returnValue) => { return isEmptyOrNull(nullable) ? null : returnValue }


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
    
    ifSelectorExist(selector, () => {
        if(dtOptions.debugMode) {
            $(selector).DataTable({
                ajax: {
                    url: dtOptions.url,
                    headers: AJAX_HEADERS,
                    success: result => console.log(result)
                }
            });
        } else {
            $(selector).DataTable({
                ajax: ajaxObj,
                columns: dtOptions.columns,
                responsive: true,
                sort: dtOptions.sort
            });
        }
    })
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
const formatDateTime = (datetime, format = "") => {
    if(format === "")
        return moment(datetime).format()
    else {
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
    const toMiddleInitial = (middleName) => { return `${ middleName.charAt(0) }.`}

    var F = $.trim(fullName.firstName);
    var M = $.trim(fullName.middleName);
    var L = $.trim(fullName.lastName);
    var S = $.trim(fullName.suffixName);

    if(format === "L, F M., S") {
        if(isEmptyOrNull(M) && isEmptyOrNull(S)) {
            return `${ L }, ${ F }`
        } else if(isEmptyOrNull(S)) {
            return `${ L }, ${ F } ${ toMiddleInitial(M) }`
        } else {
            return `${ L }, ${ F } ${ toMiddleInitial(M) }, ${ S }`
        }
    } else if(format === "F M. L, S") {
        if(isEmptyOrNull(M) && isEmptyOrNull(S)) {
            return `${ F } ${ L }`;
        } else if(isEmptyOrNull(S)) {
            return `${ F } ${ toMiddleInitial(M) } ${ L }`;
        } else {
            return `${ F } ${ toMiddleInitial(M) } ${ L }, ${ S }`;
        }
    } else {
        console.error(`Format "${ format }" for name is invalid`)
        return ""
    }
}


/** GET AJAX */
const GET_ajax = (url = "", options = {
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


/** POST AJAX */
const POST_ajax = (url = "", data = {}, options = {
    success: () => {},
    error: () => {}
}) => {
    $.ajax({
        url: url,
        type: 'POST',
        headers: AJAX_HEADERS,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: options.success,
        error: options.error
    })
}