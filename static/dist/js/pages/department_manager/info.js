/**
 * ==============================================================================
 * USER INFORMATION
 * ==============================================================================
 */


/** Get User Information */
GET_ajax(`${ DM_API_ROUTE }info`, {
    success: result => {
        if(result) {
            
            // Set User Full Name
            setContent('#userFullName', formatName("F M. L, S", {
                firstName: result.first_name,
                middleName: result.middle_name,
                lastName: result.last_name,
                suffixName: result.suffix_name
            }));
            
            // Set User Position
            setContent('#userPosition', result.position.name);

            // Set User Department
            setContent('#userDepartment', result.position.department.name);

            $('#userFullNameLoader').remove();
            showElement('#userFullNameDisplay');
        } else toastr.error('There was an error while getting your information');
    },
    error: () => toastr.error('There was an error while getting your information')
});