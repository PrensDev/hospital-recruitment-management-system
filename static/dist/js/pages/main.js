/** 
 * =====================================================
 * FUNCTIONS
 * =====================================================
 * */


/** If Selector Exist */
const ifSelectorExist = (selector = "", handler = () => {}, isRequired = true) => {
    if($(selector).length) return handler() 
    else if(isRequired && IF_SELECTOR_EXIST_DEBUG_MODE) console.warn(`Selector ${ selector } does not exist.`)
}


/** Initialize Data Mask */
ifSelectorExist('[data-mask]', () => $('[data-mask]').inputmask());


/** Initialize Bootstrap Custom File Input */
bsCustomFileInput.init();


/** Is Empty Or Null */
const isEmptyOrNull = (value) => { return $.trim(value) === "" || value == null }


/** Null Or With Value */
const nullOrReturnValue = (nullable, returnValue) => { return isEmptyOrNull(nullable) ? null : returnValue }


/** Initialize DataTable */
const initDataTable = (selector = "", dtOptions = {
    debugMode: false,
    url: "",
    columns: [],
}) => $(() => ifSelectorExist(selector, () => dtOptions.debugMode 
    ? $(selector).DataTable({
        ajax: {
            url: dtOptions.url,
            headers: AJAX_HEADERS,
            success: result => console.log(result)
        }
    })
    : $(selector).DataTable({
        ajax: {
            url: dtOptions.url,
            headers: AJAX_HEADERS,
            dataSrc: ""
        },
        columns: dtOptions.columns,
        order: [[0, 'desc']],
        responsive: true,
        columnDefs: [{
            targets: [-1],
            orderable: false
        }],
        language: {
            emptyTable: `
                <div class="p-5">
                    <h3>No records</h3>
                    <div class="text-secondary">There are no records yet here</div>
                </div>
            `,
            loadingRecords: `
                <div class="p-5 text-secondary">
                    <div class="spinner-border mb-3" role="status"></div>
                    <div>Please wait while loading records ...</div>
                </div>
            `,
            processing: `
                <div class="p-5 text-secondary">
                    <div class="spinner-border mb-3" role="status"></div>
                    <div>Processing, please wait ...</div>
                </div>
            `,
            zeroRecords: `
                <div class="p-5">
                    <h3>No match found</h3>
                    <div class="text-secondary">No records was found that matched to your query</div>
                </div>
            `,
            paginate: {
                previous: `<i class="fas fa-caret-left"></i>`,
                next: `<i class="fas fa-caret-right"></i>`,
            }
        }
    })
));


/** Reload DataTable */
const reloadDataTable = (selector) => ifSelectorExist(selector, () => $(selector).DataTable().ajax.reload());


/** DataTable Badge */
const dtBadge = (theme = "light", content) => { return `<div class="badge badge-${ theme } p-2 w-100">${ content }</div>` }


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
            errorElement: 'div',
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


/** Reset Form */
const resetForm = (selector) => ifSelectorExist(selector, () => $(selector).trigger('reset'));


/** Generate Form Data */
const generateFormData = (selector) => { return new FormData($(selector)[0]) }


/** Humanize DateTime */
const fromNow = (datetime) => { return moment(datetime).fromNow() }
const toNow = (datetime) => { return moment(datetime).fromNow() }


/** If date is before/after today */
const isBeforeToday = (datetime) => { return moment(datetime).isBefore(moment()) }
const isAfterToday = (datetime) => { return moment(datetime).isAfter(moment()) }


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
        else if(format === "Full Date")
            realFormat = "dddd, MMMM D, YYYY"
        else if(format === "Date")
            realFormat = "MMMM D, YYYY"
        else if(format === "Short Date")
            realFormat = "MMM. D, YYYY"
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


/** On modal was showned/hidden */
const onHideModal = (selector, handler = () => {}) => { ifSelectorExist(selector, () => $(selector).on('hide.bs.modal', () => handler())) }
const onShowModal = (selector, handler = () => {}) => { ifSelectorExist(selector, () => $(selector).on('show.bs.modal', () => handler())) }


/** Set Content */
const setContent = (selector, content) => ifSelectorExist(selector, () => $(selector).html(content));


/** Set Value */
const setValue = (selector, value) => ifSelectorExist(selector, () => $(selector).val(value));


/** Enable/Disable Element */
const enableElement = (selector) => ifSelectorExist(selector, () => $(selector).prop("disabled", false));
const disableElement = (selector) => ifSelectorExist(selector, () => $(selector).prop("disabled", true));


/** Check/Uncheck Element */
const checkElement = (selector) => ifSelectorExist(selector, () => $(selector).prop("checked", true));
const uncheckElement = (selector) => ifSelectorExist(selector, () => $(selector).prop("checked", false));


/** Show/Hide Element */
const showElement = (selector) => ifSelectorExist(selector, () => $(selector).show());
const hideElement = (selector) => ifSelectorExist(selector, () => $(selector).hide());


/** On Event */
const onEvent = (selector, event, handler = () => {}) => ifSelectorExist(selector, () => $(selector).on(event, () => handler()))


/** On Click */
const onClick = (selector, handler = () => {}) => onEvent(selector, 'click', () => handler());


/** On Change */
const onChange = (selector, handler = () => {}) => onEvent(selector, 'change', () => handler());


/** Is checked */
const isChecked = (
    selector, 
    handlerIfChecked = () => {}, 
    handlerIfNotChecked = () => {}
) => {
    return ifSelectorExist(selector, () => {
        const checkStatus = $(selector).prop('checked');
        checkStatus ? handlerIfChecked() : handlerIfNotChecked();
        return checkStatus;
    });
}


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


/** Format Currency */
const formatCurrency = (money) => {
    const formattedMoney = new Intl.NumberFormat('en', {minimumFactionDigits: 2}).format(money);
    return `&#8369; ${ formattedMoney }`
}


/** GET AJAX */
const GET_ajax = (url = '', options = {
    success: () => {},
    error: () => console.error('GET_ajax failed')
}) => $.ajax({
    url: url,
    type: 'GET',
    headers: AJAX_HEADERS,
    success: options.success,
    error: options.error
});


/** POST AJAX */
const POST_ajax = (url = '', data = {}, options = {
    success: () => {},
    error: () => console.error('POST_ajax failed')
}) => $.ajax({
    url: url,
    type: 'POST',
    headers: AJAX_HEADERS,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),
    success: options.success,
    error: options.error
});


/** PUT AJAX */
const PUT_ajax = (url = '', data = {}, options = {
    success: () => {},
    error: () => console.error('PUT_ajax failed')
}) => $.ajax({
    url: url,
    type: 'PUT',
    headers: AJAX_HEADERS,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),
    success: options.success,
    error: options.error
});


/** DELETE AJAX */
const DELETE_ajax = (url = '', options = {
    success: () => {},
    error: () => console.error('DELETE_ajax failed')
}) => $.ajax({
    url: url,
    type: 'DELETE',
    headers: AJAX_HEADERS,
    success: options.success,
    error: options.error
})


/** Check if there are sessioned alert */
$(() => {
    if(localStorage.getItem('sessioned_alert')) {
        const alertTheme = localStorage.getItem('sessioned_alert_theme');
        const alertMessage = localStorage.getItem('sessioned_alert_message')

        if(alertTheme === 'success') toastr.success(alertMessage);
        if(alertTheme === 'warning') toastr.warning(alertMessage);
        if(alertTheme === 'error') toastr.error(alertMessage);

        localStorage.removeItem('sessioned_alert');
        localStorage.removeItem('sessioned_alert_theme');
        localStorage.removeItem('sessioned_alert_message');
    }
})


/** Set Sessioned Alert */
const setSessionedAlertAndRedirect = (data = {
    theme: "", 
    message: "", 
    redirectURL: ""
}) => {
    localStorage.setItem('sessioned_alert', true)
    localStorage.setItem('sessioned_alert_theme', data.theme)
    localStorage.setItem('sessioned_alert_theme', data.message)
    location.assign(data.redirectURL)
}