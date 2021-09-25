/**
 * ==============================================================================
 * VIEW ALL MANPOWER REQUESTS
 * ==============================================================================
 */

/** ManPower Requests DataTable */
initDataTable('#manpowerRequestDT', {
    // debugMode: true,
    url: `${ DH_API_ROUTE }requisitions`,
    columns: [

        // Created At (For Default Sorting)
        { data: 'created_at', visible: false },

        // Requisition No.
        { data: 'requisition_no', class: 'text-nowrap' },

        // Staffs Needed
        { 
            data: null,
            render: data => {
                staffsNeeded = data.staffs_needed;
                return `
                    <div>${ data.vacant_position.name }</div>
                    <div class="small text-secondary">${ staffsNeeded } new staff${ staffsNeeded > 1 ? "s" : "" }</div>
                `;
            }
        },

        // Request Nature
        { data: "request_nature"},

        // Request Status
        {
            data: null,
            render: data => {
                const requestStatus = data.request_status;

                var bagdeTheme;
                var badgeIcon;
                let validStatus = true;
                
                if(requestStatus === "For signature") {
                    bagdeTheme = "secondary";
                    badgeIcon = "file-signature";
                } else if(requestStatus === "For approval") {
                    bagdeTheme = "warning";
                    badgeIcon = "sync-alt";
                } else if(requestStatus === "Approved") {
                    bagdeTheme = "success";
                    badgeIcon = "thumbs";
                } else if(requestStatus === "Rejected") {
                    bagdeTheme = "danger";
                    badgeIcon = "times";
                } else if(requestStatus === "Completed") {
                    bagdeTheme = "blue";
                    badgeIcon = "check";
                } else validStatus = false

                return validStatus 
                    ? `<div class="badge badge-${ bagdeTheme } p-2 w-100">
                            <i class="fas fa-${ badgeIcon } mr-1"></i>
                            <span>${ requestStatus }</span>
                        </div>` 
                    : `<div class="badge badge-light p-2 w-100">Invalid data</div>`
            }
        },

        // Date Submitted
        {
            data: null,
            render: data => {
                const createdAt = data.created_at
                return `
                    <div>${ formatDateTime(createdAt, "Date") }</div>
                    <div>${ formatDateTime(createdAt, "Time") }</div>
                    <div class="small text-secondary">${ fromNow(createdAt) }</div>
                `
            }
        },

        // Actions
        { 
            data: null,
            render: data => {
                const requisitionID = data.requisition_id;
                const requestStatus = data.request_status;

                const markAsCompletedBtn = `
                    <div 
                        class="dropdown-item d-flex"
                        data-toggle="modal"
                        data-target="#"
                    >
                        <div style="width: 2rem"><i class="fas fa-check mr-1"></i></div>
                        <span>Mark as Completed</span>
                    </div>
                `;

                const editBtn = `
                    <a 
                        class="dropdown-item d-flex"
                        href="${ DM_WEB_ROUTE }edit-manpower-request/${ data.requisition_id }"
                    >
                        <div style="width: 2rem"><i class="fas fa-edit mr-1"></i></div>
                        <span>Edit</span>
                    </a>
                `

                const cancelBtn = `
                    <div 
                        class="dropdown-item d-flex"
                        role="button"
                        onclick="cancelManpowerRequest('${ requisitionID }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-times-circle mr-1"></i></div>
                        <span>Cancel</span>
                    </div>
                `;

                const deleteBtn = `
                    <div 
                        class="dropdown-item d-flex"
                        role="button"
                        onclick="deleteManpowerRequest('${ requisitionID }')"
                    >
                        <div style="width: 2rem"><i class="fas fa-trash-alt mr-1"></i></div>
                        <span>Delete</span>
                    </div>
                `;

                return `
                    <div class="text-center dropdown">
                        <div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">
                            <i class="fas fa-ellipsis-v"></i>
                        </div>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a 
                                class="dropdown-item d-flex"
                                href="${ DM_WEB_ROUTE }manpower-requests/${ requisitionID }"
                            >
                                <div style="width: 2rem"><i class="fas fa-list mr-1"></i></div>
                                <span>View Details</span>
                            </a>

                            ${ requestStatus === "For signature" ? editBtn + cancelBtn : "" }

                            ${ requestStatus === "Approved" ? markAsCompletedBtn : "" }

                            ${ requestStatus === "Rejected" ? deleteBtn : "" }
                        </div>
                    </div>
                `
            }
        }
    ],
});
