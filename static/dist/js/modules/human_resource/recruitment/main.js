/** 
 * =====================================================
 * APP FUNCTIONS
 * =====================================================
 */

/** Set Manpower Request Timeline */
const setManpowerRequestTimeline = (selector, data) => {
    let timelineData = [];

    const requestStatus = data.request_status;
    const rejectedAt = data.rejected_at;

    // Created
    const createdAt = data.created_at;
    const createdBy = data.manpower_request_by;
    const createdByFullName = formatName('F M. L, S', {
        firstName: createdBy.first_name,
        middleName: createdBy.middle_name,
        lastName: createdBy.last_name,
        suffixName: createdBy.suffix_name
    });
    timelineData.push({
        icon: "edit",
        iconTheme: "info",
        dateTime: createdAt,
        timelineTitle: 'Created',
        timelineBody: `
            <div class="small mb-3">This request has been created by <b>${ createdByFullName }</b></div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Full Date") }</div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Time") }</div>
        `
    });

    // Signed
    const signedAt = data.signed_at;
    if(!isEmptyOrNull(signedAt)) {
        const signedBy = data.manpower_request_signed_by;
        const signedByFullName = formatName('F M. L, S', {
            firstName: signedBy.first_name,
            middleName: signedBy.middle_name,
            lastName: signedBy.last_name,
            suffixName: signedBy.suffix_name
        })
        timelineData.push({
            icon: "file-signature",
            iconTheme: "primary",
            dateTime: signedAt,
            timelineTitle: 'Signed',
            timelineBody: `
                <div class="small mb-3">This request has been signed by <b>${ signedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(signedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(signedAt, "Time") }</div>
            `
        });
    } else if(requestStatus === "Rejected for signing") {
        const rejectedBy = data.manpower_request_rejected_by;
        const rejectedByFullName = formatName('F M. L, S', {
            firstName: rejectedBy.first_name,
            middleName: rejectedBy.middle_name,
            lastName: rejectedBy.last_name,
            suffixName: rejectedBy.suffix_name
        });
        timelineData.push({
            icon: "times",
            iconTheme: "danger",
            dateTime: rejectedAt,
            timelineTitle: 'Rejected',
            timelineBody: `
                <div class="small mb-3">This request has been rejected for signing by <b>${ rejectedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
            `
        });
    }

    // Reviewed and approved
    const reviewedAt = data.reviewed_at;
    if(!isEmptyOrNull(reviewedAt)) {
        const reviewedBy = data.manpower_request_reviewed_by;
        const reviewedByFullName = formatName('F M. L, S', {
            firstName: reviewedBy.first_name,
            middleName: reviewedBy.middle_name,
            lastName: reviewedBy.last_name,
            suffixName: reviewedBy.suffix_name
        });
        timelineData.push({
            icon: "thumbs-up",
            iconTheme: "success",
            dateTime: reviewedAt,
            timelineTitle: 'Approved',
            timelineBody: `
                <div class="small mb-3">This request has been reviewed and approved by <b>${ reviewedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(reviewedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(reviewedAt, "Time") }</div>
            `
        });
    } else if(requestStatus === "Rejected for approval") {
        const rejectedBy = data.manpower_request_rejected_by;
        const rejectedByFullName = formatName('F M. L, S', {
            firstName: rejectedBy.first_name,
            middleName: rejectedBy.middle_name,
            lastName: rejectedBy.last_name,
            suffixName: rejectedBy.suffix_name
        });

        timelineData.push({
            icon: "times",
            iconTheme: "danger",
            dateTime: rejectedAt,
            timelineTitle: 'Rejected',
            timelineBody: `
                <div class="small mb-3">This request has been rejected for approval by <b>${ rejectedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
            `
        });
    }

    // Completed
    const completedAt = data.completed_at;
    if(!isEmptyOrNull(completedAt)) {
        timelineData.push({
            icon: "check",
            iconTheme: "info",
            dateTime: completedAt,
            timelineTitle: 'Completed',
            timelineBody: `
                <div class="small mb-3">This request had been marked as completed</b></div>
                <div class="small text-secondary">${ formatDateTime(completedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(completedAt, "Time") }</div>
            `
        });
    } 

    // Set Manpower Request Timeline
    setTimeline(selector, { title: "Manpower Request Timeline", timelineData: timelineData });
}

/** Set Applicant Timeline */
const setApplicantTimeline = (selector, data) => {
    let timelineData = [];

    // Applied
    const createdAt = data.created_at;
    const applicantFullName = formatName   ('F M. L, S', {
        firstName: data.first_name,
        middleName: data.middle_name,
        lastName: data.last_name,
        suffixName: data.suffix_name,
    });
    timelineData.push({
        icon: "file-export",
        iconTheme: "primary",
        dateTime: createdAt,
        timelineTitle: 'Applied',
        timelineBody: `
            <div class="small mb-3">Application was submitted by <b>${ applicantFullName }</b></div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Full Date") }</div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Time") }</div>
        `
    });

    // Evaluated
    const evaluatedAt = data.evaluated_at;
    const evaluatedBy = data.evaluation_done_by;
    if(!isEmptyOrNull(evaluatedAt) && !isEmptyOrNull(evaluatedBy)) {
        const evaluatedByFullName = formatName('F M. L, S', {
            firstName: evaluatedBy.first_name,
            middleName: evaluatedBy.middle_name,
            lastName: evaluatedBy.last_name,
            suffixName: evaluatedBy.suffix_name
        });
        timelineData.push({
            icon: "check",
            iconTheme: "success",
            dateTime: evaluatedAt,
            timelineTitle: 'Evaluated',
            timelineBody: `
                <div class="small mb-3">Evaluation was done by <b>${ evaluatedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(evaluatedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(evaluatedAt, "Time") }</div>
            `
        });
    }

    // Screened
    const screenedAt = data.screened_at;
    const screenedBy = data.screening_done_by;
    if(!isEmptyOrNull(screenedAt) && !isEmptyOrNull(screenedBy)) {
        const screenedByFullName = formatName('F M. L, S', {
            firstName: screenedBy.first_name,
            middleName: screenedBy.middle_name,
            lastName: screenedBy.last_name,
            suffixName: screenedBy.suffix_name
        });
        timelineData.push({
            icon: "check",
            iconTheme: "warning",
            dateTime: screenedAt,
            timelineTitle: 'Screened',
            timelineBody: `
                <div class="small mb-3">Screening was done by <b>${ screenedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(screenedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(screenedAt, "Time") }</div>
            `
        });
    }

    // Hired
    const hiredAt = data.hired_at;
    const hiredBy = data.hiring_done_by;
    if(!isEmptyOrNull(hiredAt) && !isEmptyOrNull(hiredBy)) {
        const hiredByFullName = formatName('F M. L, S', {
            firstName: hiredBy.first_name,
            middleName: hiredBy.middle_name,
            lastName: hiredBy.last_name,
            suffixName: hiredBy.suffix_name
        });
        timelineData.push({
            icon: "handshake",
            iconTheme: "success",
            dateTime: hiredAt,
            timelineTitle: 'Hired',
            timelineBody: `
                <div class="small mb-3">Hiring was done by <b>${ hiredByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(hiredAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(hiredAt, "Time") }</div>
            `
        });
    }

    // Rejected
    const status = data.status;
    if(
        status === "Rejected from evaluation" || 
        status === "Rejected from screening"  || 
        status === "Rejected from interview" 
    ) {
        const rejectedAt = data.rejected_at;
        const rejectedBy = data.rejection_done_by;
        if(!isEmptyOrNull(rejectedAt) && !isEmptyOrNull(rejectedBy)) {
            const rejectedByFullName = formatName('F M. L, S', {
                firstName: rejectedBy.first_name,
                middleName: rejectedBy.middle_name,
                lastName: rejectedBy.last_name,
                suffixName: rejectedBy.suffix_name
            });
            timelineData.push({
                icon: "times",
                iconTheme: "danger",
                dateTime: rejectedAt,
                timelineTitle: status,
                timelineBody: `
                    <div class="small mb-3">Applicant was ${ status.toLowerCase() } by <b>${ rejectedByFullName }</b></div>
                    <div class="small text-secondary">${ formatDateTime(rejectedAt, "Full Date") }</div>
                    <div class="small text-secondary">${ formatDateTime(rejectedAt, "Time") }</div>
                `
            });
        }
    }

    // Set Applicant Timeline
    setTimeline(selector, { title: "Applicant Timeline", timelineData: timelineData });
}


/** Get Onboarding Employee Task Status */
const getOnboardingEmployeeTaskStatus = (status, startAt, deadline, completedAt) => {
    if(status == "Pending") {
        if(isAfterToday(startAt) && isAfterToday(deadline))
            return `
                <span class="badge badge-secondary p-2">
                    <i class="fas fa-stopwatch mr-1"></i>
                    <span>Soon<span>
                </span>
            `
        else if(isBeforeToday(startAt) && isAfterToday(deadline))
            return `
                <span class="badge badge-warning p-2">
                    <i class="fas fa-exclamation-circle mr-1"></i>
                    <span>Pending (Must working)<span>
                </span<
            `
        else 
            return `
                <span class="badge badge-danger p-2">
                    <i class="fas fa-exclamation-triangle mr-1"></i>
                    <span>Pending (Not worked)<span>
                </span>
            `
    } else if(status == "On Going") 
        return isAfterToday(deadline)
            ? `<span class="badge badge-info p-2">
                    <i class="fas fa-sync-alt mr-1"></i>
                    <span>On Going<span>
                </span>`
            : `<span class="badge badge-warning p-2">
                    <i class="fas fa-sync-alt mr-1"></i>
                    <span>On Going (Must be done)<span>
                </span>`
    else if(status == "Completed") 
        return moment(completedAt).isBefore(moment(deadline))
            ? `<span class="badge badge-success p-2">
                    <i class="fas fa-check mr-1"></i>
                    <span>Completed (On Time)<span>
                <span>`
            : `<span class="badge badge-success p-2">
                    <i class="fas fa-check mr-1"></i>
                    <span>Completed (Late)<span>
                <span>`
    else return `<span class="badge badge-light p-2">Invalid data</span>`
}


/** Set Job Post Timeline */
const setJobPostTimeline = (selector, data) => {
    let timelineData = [];
    
    const jobPostedBy = data.job_posted_by;
    const jobPostedByFullName = formatName('F M. L, S', {
        firstName: jobPostedBy.first_name,
        middleName: jobPostedBy.middle_name,
        lastName: jobPostedBy.last_name,
        suffix_name: jobPostedBy.suffix_name
    });

    // Created
    const createdAt = data.created_at;
    timelineData.push({
        icon: "edit",
        iconTheme: "info",
        dateTime: createdAt,
        timelineTitle: 'Created',
        timelineBody: `
            <div class="small mb-3">You, <span class="font-weight-bold">${ jobPostedByFullName }</span>, created this job post</div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Full Date") }</div>
            <div class="small text-secondary">${ formatDateTime(createdAt, "Time") }</div>
        `
    });

    // Last Updated
    const lastUpdated = data.updated_at;
    timelineData.push({
        icon: "edit",
        iconTheme: "info",
        dateTime: lastUpdated,
        timelineTitle: 'Last Updated',
        timelineBody: `
            <div class="small mb-3">You are the last person updated this job post</div>
            <div class="small text-secondary">${ formatDateTime(lastUpdated, "Full Date") }</div>
            <div class="small text-secondary">${ formatDateTime(lastUpdated, "Time") }</div>
        `
    });

    // Set Timeline
    setTimeline(selector, {
        title: 'Job Post Timeline',
        timelineData: timelineData
    });
}


/** Set Onboarding Employee Task Timeline */
const setOnboardingEmployeeTaskTimeline = (selector, data) => {
    let timelineData = [];

    // Assigned
    const assignedAt = data.created_at;
    const assignedBy = data.onboarding_employee_task_assigned_by;
    const assignedByFullName = formatName('F M. L, S', {
        firstName: assignedBy.first_name,
        middleName: assignedBy.middle_name,
        lastName: assignedBy.last_name,
        suffixName: assignedBy.suffix_name
    });
    timelineData.push({
        icon: "clipboard",
        iconTheme: "primary",
        dateTime: assignedAt,
        timelineTitle: 'Assigned',
        timelineBody: `
            <div class="small mb-3">Task was created and assigned by <b>${ assignedByFullName }</b></div>
            <div class="small text-secondary">${ formatDateTime(assignedAt, "Full Date") }</div>
            <div class="small text-secondary">${ formatDateTime(assignedAt, "Time") }</div>
        `
    });

    // Completed
    const completedAt = data.completed_at;
    const completedBy = data.onboarding_employee_task_completed_by;
    if(!isEmptyOrNull(completedAt) && !isEmptyOrNull(completedBy)) {
        const completedByFullName = formatName('F M. L, S', {
            firstName: completedBy.first_name,
            middleName: completedBy.middle_name,
            lastName: completedBy.last_name,
            suffixName: completedBy.suffix_name
        });
        timelineData.push({
            icon: "check",
            iconTheme: "success",
            dateTime: completedAt,
            timelineTitle: 'Completed',
            timelineBody: `
                <div class="small mb-3">Task was completed marked by <b>${ completedByFullName }</b></div>
                <div class="small text-secondary">${ formatDateTime(completedAt, "Full Date") }</div>
                <div class="small text-secondary">${ formatDateTime(completedAt, "Time") }</div>
            `
        });
    }

    // Set Onboarding Employee Task Timeline
    setTimeline(selector, {
        title: 'Onboarding Task Timeline',
        timelineData: timelineData
    });
}