/** When logout button ic clicked */
$('#logoutBtn').on('click', () => logout())

/** Log out */
const logout = () => {

    // Set Confirm Button to Loading State
    btnToLoadingState('#logoutBtn');
    disableElement('#cancelLogoutBtn');
    disableElement('#closeLogoutModalBtn');

    // Error
    const err = () => {
        
        // Hide Modal
        hideModal('#logoutModal');

        // Set Button To Unload State
        btnToUnloadState('#logoutBtn', `
            <span>Log out</span>
            <i class="fas fa-sign-out-alt ml-1"></i>
        `);
        enableElement('#cancelLogoutBtn');
        enableElement('#closeLogoutModalBtn');

        // Show Error Alert
        toastr.error('There was an error while trying to logout');
    }

    GET_ajax(`${ ROUTE.API.AUTH }logout`, {
        success: result => {
            if(result.logout_status === "Success") {
                localStorage.clear();
                sessionStorage.clear();
                location.assign(`${ BASE_URL_WEB }login`)
            } else err()
        },
        error: () => err()
    });
}