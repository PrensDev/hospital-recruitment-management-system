/** 
 * =====================================================
 * CONSTANTS
 * =====================================================
 */

// Base URLs
const BASE_URL_API = 'http://127.0.0.1:8000/api/';
const BASE_URL_WEB = 'http://127.0.0.1:8000/';


// Web File URLs
const URL_WEB_FILES = `${ BASE_URL_WEB }static/app/files/`;
const URL_RESUME_FILES = `${ URL_WEB_FILES }resumes/`;


// User Web Routes
const DH_WEB_ROUTE = `${ BASE_URL_WEB }dh/`;
const DM_WEB_ROUTE = `${ BASE_URL_WEB }dm/`;
const H_WEB_ROUTE  = `${ BASE_URL_WEB }h/`;
const R_WEB_ROUTE  = `${ BASE_URL_WEB }r/`;


// User API Routes
const DH_API_ROUTE   = `${ BASE_URL_API }department-head/`;
const DM_API_ROUTE   = `${ BASE_URL_API }department-manager/`;
const H_API_ROUTE    = `${ BASE_URL_API }hiring-manager/`;
const R_API_ROUTE    = `${ BASE_URL_API }recruiter/`;
const API_AUTH_ROUTE = `${ BASE_URL_API }auth/`;


// Configurations
IF_SELECTOR_EXIST_DEBUG_MODE = false;


// AJAX Header
const AJAX_HEADERS = {
    Accept: 'application/json',
    Authorization: `Bearer ${ localStorage.getItem('access_token') }`
}


// Summernote Toolbar
const SUMMERNOTE_TOOLBAR = [
    ['view' , ['undo','redo']],
    ['font' , ['bold', 'italic', 'underline', 'clear']],
    ['font' , ['strikethrough', 'superscript', 'subscript']],
    ['para' , ['ol', 'ul', 'paragraph', 'height']],
    ['table', ['table']],
    ['view' , ['help']],
]


// Fetch Rows
FETCH_ROWS = 10;