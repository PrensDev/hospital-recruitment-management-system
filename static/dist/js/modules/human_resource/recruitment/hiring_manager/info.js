"use strict";

/**
 * ==============================================================================
 * * USER INFORMATION
 * ==============================================================================
 */

/** Get User Information */
GET_ajax(`${ ROUTE.API.H }info`, {
    success: result => {

        // Set User info
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

        // Remove loaders
        showElement('#userFullNameDisplay');
        $('#userFullNameLoader').remove();
    },
    error: () => toastr.error('There was an error while getting your information')
});