/** 
 * =====================================================
 * CONSTANTS
 * =====================================================
 * */

// Base URLs
const BASE_URL_API = 'http://127.0.0.1:8000/api/';
const BASE_URL_WEB = 'http://127.0.0.1:8000/';


// User Web Routes
const D_WEB_ROUTE = `${ BASE_URL_WEB }d/`;
const H_WEB_ROUTE = `${ BASE_URL_WEB }h/`;
const R_WEB_ROUTE = `${ BASE_URL_WEB }r/`;


// User API Routes
const D_API_ROUTE    = `${ BASE_URL_API }department-head/`;
const H_API_ROUTE    = `${ BASE_URL_API }hiring-manager/`;
const R_API_ROUTE    = `${ BASE_URL_API }recruiter/`;
const API_AUTH_ROUTE = `${ BASE_URL_API }auth/`;


// Configurations
IF_SELECTOR_EXIST_DEBUG_MODE = true


// AJAX Header
const AJAX_HEADERS = {
    Accept: 'application/json',
    Authorization: `Bearer ${ localStorage.getItem('access_token') }`
}