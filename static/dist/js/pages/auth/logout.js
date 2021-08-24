/** When logout button ic clicked */
$('#logoutBtn').on('click', () => logout())

/** Log out */
const logout = () => {
    setContent('#logoutBtn', `<div class="spinner-border spinner-border-sm mx-3">`);
    disableElement('#logoutBtn');

    GET_ajax(`${ API_AUTH_ROUTE }logout`, {
        success: result => {
            if(result.logout_status === "Success") {
                localStorage.clear();
                location.assign(`${ BASE_URL_WEB }login`)
            }
        },
        error: () => {
            hideModal('#logoutModal');
            setContent('#logoutBtn', `
                <span>Log out</span>
                <i class="fas fa-sign-out-alt ml-1"></i>
            `);
            enableElement('#logoutBtn');
            toastr.error('There was an error while trying to logout');
        }
    });
}