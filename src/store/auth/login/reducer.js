import { CHECK_LOGIN, LOGIN_USER_SUCCESSFUL, LOGIN_USER_FAILED ,API_FAILED,  } from './actionTypes';

const initialState = {
    loginError: null, message: null, loading: null
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_LOGIN:
            state = {
                ...state,
                user: null,
                loading: true,
                loginError: null
            }
            break;
        case LOGIN_USER_SUCCESSFUL:
            state = {
                ...state,
                user: action.payload,
                loading: false,
                loginError: null
            }
            break;
        case LOGIN_USER_FAILED:
            state = {
                ...state,
                user: null,
                loading: false,
                loginError: action.payload,
            }
            break;
        case API_FAILED:
            state = {
                ...state,
                loading: false,
                loginError: action.payload
            }
            break;        

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;