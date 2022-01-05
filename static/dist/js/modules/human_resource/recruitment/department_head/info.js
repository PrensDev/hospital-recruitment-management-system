/**
 * ==============================================================================
 * USER INFORMATION
 * ==============================================================================
 */


/** Get User Information */
GET_ajax(`${ ROUTE.API.DH }info`, {
    success: result => {
        if(result) {

            // Set user info
            setContent({
                '#userFullName': formatName("F M. L, S", {
                    firstName  : result.first_name,
                    middleName : result.middle_name,
                    lastName   : result.last_name,
                    suffixName : result.suffix_name
                }),
                '#userPosition': result.position.name,
                '#userDepartment': result.position.department.name
            });

            // Remove Loaders
            $('#userFullNameLoader').remove();
            showElement('#userFullNameDisplay');
        } else toastr.error('There was an error while getting your information');
    },
    error: () => toastr.error('There was an error while getting your information')
});