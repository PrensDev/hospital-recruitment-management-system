/** When logout button ic clicked */
$('#logoutBtn').on('click', () => logout())

/** Log out */
const logout = () => {
    GET_ajax(`${ API_AUTH_ROUTE }logout`, {
        success: result => {
            if(result.logout_status === "Success") {
                localStorage.clear();
                location.assign(`${ BASE_URL_WEB }login`)
            }
        },
        error: () => {
            hideModal('#logoutModal');
            toastr.error('There was an error while trying to logout');
        }
    });
}