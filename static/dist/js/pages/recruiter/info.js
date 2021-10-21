/**
 * ==============================================================================
 * USER INFORMATION
 * ==============================================================================
 */

/** Get User Information */
GET_ajax(`${ R_API_ROUTE }info`, {
    success: result => {

        // Set User Full Name
        setContent('#userFullName', formatName("F M. L, S", {
            firstName: result.first_name,
            middleName: result.middle_name,
            lastName: result.last_name,
            suffixName: result.suffix_name
        }));

        // Set User Position
        setContent('#userPosition', result.position.name);

        // Set User Dpeartment
        setContent('#userDepartment', result.position.department.name);

        $('#userFullNameLoader').remove();
        showElement('#userFullNameDisplay');
    },
    error: () => toastr.error('There was an error while getting information')
});