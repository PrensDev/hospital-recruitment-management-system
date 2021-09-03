/**
 * ==============================================================================
 * USER INFORMATION
 * ==============================================================================
 */

/** Get User Information */
GET_ajax(`${ H_API_ROUTE }info`, {
    success: result => {
        setContent('#userFullName', formatName("F M. L, S", {
            firstName: result.first_name,
            middleName: result.middle_name,
            lastName: result.last_name,
            suffixName: result.suffix_name
        }));

        hideElement('#userFullNameLoader');
        showElement('#userFullNameDisplay');
    },
    error: () => toastr.error('There was an error while getting your information')
});