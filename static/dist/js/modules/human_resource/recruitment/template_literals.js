/** 
 * ===================================================================================
 * * TEMPLATE LITERALS
 * ===================================================================================
 */

const TEMPLATE = {
    
    /**
     * =====================================================================
     * UNIVESAL TEMPLATE LITERALS
     * =====================================================================
     */

    SUBTEXT: content => {
        return `<div class="small text-secondary">${ content }</div>`
    },
    BADGE: (theme, content) => {
        return `<span class="badge badge-${theme} p-2">${content}</span>`
    },
    EMPTY: content => {
        return `<div class="text-secondary font-italic">${content}</div>`
    },
    ICON_LABEL: (icon, label, iconType="s") => {
        return `
            <i class="fa${iconType} fa-${icon} mr-1"></i>
            <span>${label}<span>
        `
    },
    LABEL_ICON: (label, icon, iconType="s") => {
        return `
            <span>${label}<span>
            <i class="fa${iconType} fa-${icon} ml-1"></i>
        `
    },
    UNSET: (content) => {
        return `<div class="text-secondary font-italic">-- ${ content } --</div>`
    },

    /**
     * =====================================================================
     * DATATABLE TEMPLATE LITERALS
     * =====================================================================
     */

    DT: {
        BADGE: (theme="light", content="No data") => {
            return `<div class="badge badge-${ theme } p-2 w-100">${ content }</div>`
        },
        OPTIONS: options => {
            return `
                <div class="text-center dropdown">
                    <div class="d-block d-lg-inline-block btn btn-sm btn-default text-nowrap" data-toggle="dropdown" role="button">
                        <i class="fas fa-ellipsis-v d-none d-lg-inline-block"></i>
                        <i class="fas fa-ellipsis-h d-lg-none mr-1 mr-md-0"></i>
                        <span class="d-lg-none">Options</span>
                    </div>

                    <div class="dropdown-menu dropdown-menu-right">
                        ${ options }
                    </div>
                </div>
            `
        }
    }
}