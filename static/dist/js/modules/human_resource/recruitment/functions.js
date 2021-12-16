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
    enableButtons: false, 
    url: "", 
    columns: []
}) => $(() => ifSelectorExist(selector, () => {

    const ajax = {
        url: dtOptions.url,
        headers: AJAX_HEADERS,
        dataSrc: ""
    }

    const dtLanguage = {
        emptyTable: `
            <div class="p-5">
                <h3>No records</h3>
                <div class="text-secondary">There are no records yet here</div>
            </div>
        `,
        loadingRecords: `
            <div class="p-5 wait">
                <div class="spinner-border text-primary mb-3" role="status"></div>
                <div class="text-secondary">Please wait while loading records ...</div>
            </div>
        `,
        processing: `
            <div class="p-5 wait">
                <div class="spinner-border text-primary mb-3" role="status"></div>
                <div class="text-secondary">Processing, please wait ...</div>
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

    const dtColumnDefs = [{
        targets: [-1],
        orderable: false
    }]

    let visibleCols = []
    for(var i = 1; i < dtOptions.columns.length-1; i++) visibleCols.push(i);

    let columnOpts = []
    for(var i = 2; i < dtOptions.columns.length-1; i++) columnOpts.push(i);

    if(dtOptions.debugMode) {
        $(selector).DataTable({
            ajax: {
                url: dtOptions.url,
                headers: AJAX_HEADERS,
                success: result => console.log(result)
            }
        })
    } else if(dtOptions.enableButtons) {
        $(selector).DataTable({
            ajax: ajax,
            columns: dtOptions.columns,
            order: [[0, 'desc']],
            dom: '<"row"<"col-md-3"l><"col-md-6"B><"col-md-3:eq(0)"f>>t<"row"<"col-md-6"i><"col-md-6"p>>',
            responsive: true,
            autoWidth: false,
            buttons: [
                {
                    extend: "copy",
                    text: `
                        <span>Copy</span>
                        <i class="fas fa-copy ml-1"></i>
                    `,
                    className: "btn-sm btn-default",
                    exportOptions: {
                        columns: visibleCols
                    }
                }, {
                    extend: "csv",
                    text: `
                        <span>CSV</span>
                        <i class="fas fa-file-csv ml-1"></i>
                    `,
                    className: "btn-sm btn-default",
                    exportOptions: {
                        columns: visibleCols
                    }
                }, { 
                    extend: "excel",
                    text: `
                        <span>Excel</span>
                        <i class="fas fa-file-excel ml-1"></i>
                    `,
                    className: "btn-sm btn-default",
                    exportOptions: {
                        columns: visibleCols
                    }
                }, {
                    extend: "pdf",
                    text: `
                        <span>PDF</span>
                        <i class="fas fa-file-pdf ml-1"></i>
                    `,
                    className: "btn-sm btn-default",
                    exportOptions: {
                        columns: visibleCols
                    }
                }, {
                    extend: "print",
                    text: `
                        <span>Print</span>
                        <i class="fas fa-print ml-1"></i>
                    `,
                    className: "btn-sm btn-default",
                    exportOptions: {
                        columns: visibleCols
                    }
                }, {
                    extend: "colvis",
                    text: `
                        <i class="fas fa-eye mr-1"></i>
                        <span>Columns</span>
                    `,
                    className: "btn-sm btn-default",
                    columns: columnOpts
                }
            ],
            columnDefs: dtColumnDefs,
            language: dtLanguage,
        })
    } else {
        $(selector).DataTable({
            ajax: ajax,
            columns: dtOptions.columns,
            order: [[0, 'desc']],
            responsive: true,
            columnDefs: dtColumnDefs,
            language: dtLanguage
        })
    }
}));


/** Reload DataTable */
const reloadDataTable = (selector) => ifSelectorExist(selector, () => $(selector).DataTable().ajax.reload());


/** DataTable Badge */
const dtBadge = (theme = "light", content) => { return `<div class="badge badge-${ theme } p-2 w-100">${ content }</div>` }


/** jQuery Validation Methods */

// Less Than
jQuery.validator.addMethod("lessThan", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        return isEmptyOrNull(c) ? true : parseFloat(val) < parseFloat(c);
    }
    return true;
}, `It must be less than something`);

// Greater Than
jQuery.validator.addMethod("greaterThan", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        return isEmptyOrNull(c) ? true : parseFloat(val) > parseFloat(c);
    }
    return true;
}, `It must be greater than something`);

// Less Than Or Equal To
jQuery.validator.addMethod("lessThanOrEqualTo", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        if(!(isEmptyOrNull(c) || c == 0)) return parseFloat(val) <= parseFloat(c);
    }
    return true;
}, `It must be less than or equal to something`);

// Greater Than Or Equal To
jQuery.validator.addMethod("greaterThan", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        if(!(isEmptyOrNull(c) || c == 0)) return parseFloat(val) >= parseFloat(c);
    }
    return true;
}, `It must be greater than or equal to something`);

// Before Today
jQuery.validator.addMethod("beforeToday", function(val, elem, params) {
    return this.optional(elem) || isBeforeToday(val);
}, `Date and Time must be before today`);

// After Today
jQuery.validator.addMethod("afterToday", function(val, elem, params) {
    return this.optional(elem) || isAfterToday(val);
}, `Date and Time must be before today`);

// Before Time
jQuery.validator.addMethod("beforeTime", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        return isEmptyOrNull(c) ? true : moment(val, 'H:mm').isBefore(moment(c, 'H:mm'));
    }
    return true;
});

// After Time
jQuery.validator.addMethod("afterTime", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        return isEmptyOrNull(c) ? true : moment(val, 'H:mm').isAfter(moment(c, 'H:mm'));
    }
    return true;
});

// Before DateTime
jQuery.validator.addMethod("beforeDateTime", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        return isEmptyOrNull(c) ? true : moment(val, 'YYYY-MM-DD HH:mm:ss').isBefore(moment(c, 'YYYY-MM-DD HH:mm:ss'));
    }
    return true;
});

// After DateTime
jQuery.validator.addMethod("afterDateTime", function(val, elem, params) {
    if($(params).length) {
        const c = getValue(params);
        return isEmptyOrNull(c) ? true : moment(val, 'YYYY-MM-DD HH:mm:ss').isAfter(moment(c, 'YYYY-MM-DD HH:mm:ss'));
    }
    return true;
});

/** Validate Form */
const validateForm = (selector = "", validationOptions = { rules: {}, messages: {}, submitHandler: () => {} }) => {
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


/** Get Value */
const getValue = (selector) => { return ifSelectorExist(selector, () => { return $(selector).val() }) }


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
const isChecked = (selector) => { 
    return ifSelectorExist(selector, () => { return $(selector).is(':checked') })
}


/** Format Name */
const formatName = (format = '', fullName = {firstName: '', middleName: '', lastName: '', suffixName: ''}) => {
    const F = $.trim(fullName.firstName);
    const L = $.trim(fullName.lastName);
    
    let M = $.trim(fullName.middleName);
    let S = $.trim(fullName.suffixName);
    
    const Mi = isEmptyOrNull(M) ? '' : ` ${ M.charAt(0) }.`;
    
    M = isEmptyOrNull(M) ? '' : ` ${ M }`;
    S = isEmptyOrNull(S) ? '' : `, ${ S }`;

    if(format === "L, F M., S")     return L + ', ' + F + Mi + S
    else if(format === "F M. L, S") return F + Mi + ' ' + L + S
    else {
        console.error(`Format "${ format }" for name is invalid`)
        return ''
    }
}


/** Format Number */
const formatNumber = (n) => { return new Intl.NumberFormat('en-US').format(n) }


/** Format Currency */
const formatCurrency = (money) => { 
    return new Intl.NumberFormat('fil-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
    }).format(money);
}


/** Button To Loading State */
const btnToLoadingState = (selector) => {
    disableElement(selector);
    setContent(selector, `<div class="spinner-border spinner-border-sm mx-3">`);
}

/** Button To Unload State */
const btnToUnloadState = (selector, originalContent) => {
    enableElement(selector);
    setContent(selector, originalContent);
}


/**
 * ====================================================================================
 * * AJAX METHODS
 * ====================================================================================
 */

/** GET AJAX */
const GET_ajax = (url = '', options = {success: () => {}, error: () => console.error('GET_ajax failed')}) => {
    $.ajax({
        url: url,
        type: 'GET',
        headers: AJAX_HEADERS,
        success: options.success,
        error: options.error
    }).fail(options.error);
}


/** POST AJAX */
const POST_ajax = (url = '', data = {}, options = {success: () => {}, error: () => console.error('POST_ajax failed')}) => {
    $.ajax({
        url: url,
        type: 'POST',
        headers: AJAX_HEADERS,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: options.success,
        error: options.error
    }).fail(options.error);
}


/** PUT AJAX */
const PUT_ajax = (url = '', data = {}, options = {success: () => {}, error: () => console.error('PUT_ajax failed')}) => {
    $.ajax({
        url: url,
        type: 'PUT',
        headers: AJAX_HEADERS,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: options.success,
        error: options.error
    }).fail(options.error);
}


/** DELETE AJAX */
const DELETE_ajax = (url = '', options = {success: () => {}, error: () => console.error('DELETE_ajax failed')}) => {
    $.ajax({
        url: url,
        type: 'DELETE',
        headers: AJAX_HEADERS,
        success: options.success,
        error: options.error
    }).fail(options.error);
}



/** Check if there are sessioned alert */
$(() => {
    if(localStorage.getItem('sessioned_alert')) {
        const alertTheme = localStorage.getItem('sessioned_alert_theme');
        const alertMessage = localStorage.getItem('sessioned_alert_message');

        setTimeout(() => {
            if(alertTheme === 'success') toastr.success(alertMessage);
            if(alertTheme === 'info')    toastr.info(alertMessage);
            if(alertTheme === 'warning') toastr.warning(alertMessage);
            if(alertTheme === 'error')   toastr.error(alertMessage);
        }, 1000)

        setTimeout(() => {
            localStorage.removeItem('sessioned_alert');
            localStorage.removeItem('sessioned_alert_theme');
            localStorage.removeItem('sessioned_alert_message');
        }, 500);
    }
})


/** Set Sessioned Alert */
const setSessionedAlertAndRedirect = (data = {theme: "", message: "", redirectURL: ""}) => {
    localStorage.setItem('sessioned_alert', true)
    localStorage.setItem('sessioned_alert_theme', data.theme)
    localStorage.setItem('sessioned_alert_message', data.message)
    location.assign(data.redirectURL)
}


/** Show Timeline */
const setTimeline = (selector, attr = {
    title: "",
    timelineData: []
}) => {
    ifSelectorExist(selector, () => {
        const timelineData = attr.timelineData;

        let timelines = "";

        const timelineComponent = (properties = {
            icon: "",
            iconTheme: "",
            dateTime: "",
            timelineTitle: "",
            timelineBody: ""
        }) => {
            return `
                <div>
                    <i class="fas fa-${ properties.icon } bg-${ properties.iconTheme }"></i>
                    <div class="timeline-item">
                        <div class="time">
                            <i class="fas fa-clock"></i>
                            <span>${ fromNow(properties.dateTime) }</span>
                        </div>
                        
                        <div class="timeline-header">${ properties.timelineTitle }</div>

                        <div class="timeline-body">${ properties.timelineBody }</div>
                    </div>
                </div>
            `
        }

        timelineData.forEach(t => {
            timelines = timelineComponent({
                icon: t.icon,
                iconTheme: t.iconTheme,
                dateTime: t.dateTime,
                timelineTitle: t.timelineTitle,
                timelineBody: t.timelineBody
            }) + timelines;
        });

        setContent(selector, `
            <div class="timeline">
                <div class="time-label">
                    <span class="bg-primary shadow-sm">${ attr.title }</span>
                </div>
                ${ timelines }
                <div>
                    <i class="fas fa-clock bg-secondary"></i>
                </div>
            </div>
        `);
    });
}


/** Set Pagination */
const setPagination = (selector, attr = {
    query: '',
    totalRows: 0, 
    currentPage: 0 
}) => {
    const totalRows = parseInt(attr.totalRows);
    const currentPage = parseInt(attr.currentPage);
    const query = attr.query;

    const getLink = (pageNumber) => { return query.replace('[page]', pageNumber); }

    const totalPages = Math.ceil(totalRows / FETCH_ROWS);
    
    let paginationItems = '';
    
    const appendPageItem = (page) => {
        paginationItems += `
            <div class="page-item${ page == currentPage ? ' active' : '' }">
                <a class="page-link" href="${ getLink(page) }">${ page }</a>
            </div>
        `;
    }
    
    const appendDisabledPageItem = () => {
        paginationItems += `
            <div class="page-item disabled">
                <div class="page-link">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `;
    }

    paginationItems += `
        <div class="page-item${ currentPage == 1 ? ' disabled' : '' }">
            <a class="page-link" href="${ getLink(currentPage-1) }">
                <i class="fas fa-caret-left"></i>
            </a>
        </div>
    `;

    if(currentPage > 3 && totalPages > 5) {
        appendPageItem(1);
        appendDisabledPageItem()
    }

    if(currentPage < 3) 
        for(let i = 1; i <= 5 && i <= totalPages; i++) appendPageItem(i)
    else if(currentPage <= totalPages-2) 
        for(let i = currentPage-2; i <= currentPage+2 && i <= totalPages; i++) appendPageItem(i);
    else if(totalPages > 5)
        for(let i = totalPages - 4; i <= totalPages; i++) appendPageItem(i)
    else 
        for(let i = 1; i <= totalPages; i++) appendPageItem(i)
    
    if(currentPage < totalPages-2 && totalPages > 5) {
        appendDisabledPageItem()
        appendPageItem(totalPages);
    }

    paginationItems += `
        <div class="page-item${ currentPage == totalPages ? ' disabled' : '' }">
            <a class="page-link" href="${ getLink(currentPage+1) }">
                <i class="fas fa-caret-right"></i>
            </a>
        </div>
    `;

    if(currentPage > 0 && currentPage <= totalPages) setContent(selector, paginationItems);
}