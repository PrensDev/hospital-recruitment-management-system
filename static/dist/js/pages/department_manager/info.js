/**
 * ==============================================================================
 * USER INFORMATION
 * ==============================================================================
 */


/** Get User Information */
GET_ajax(`${ DM_API_ROUTE }info`, {
    success: result => {
        if(result) {
            setContent('#userFullName', formatName("F M. L, S", {
                firstName: result.first_name,
                middleName: result.middle_name,
                lastName: result.last_name,
                suffixName: result.suffix_name
            }));
            $('#userFullNameLoader').remove();
            showElement('#userFullNameDisplay');
        } else toastr.error('There was an error while getting your information');
    },
    error: () => toastr.error('There was an error while getting your information')
});