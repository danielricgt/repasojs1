import { CHECK_LOGIN, LOGIN_USER_SUCCESSFUL, LOGIN_USER_FAILED, API_FAILED } from './actionTypes';

export const checkLogin = (correo, password, history, layoutType) => {
    return {
        type: CHECK_LOGIN,
        payload: { correo, password, history, layoutType }
    }
}

export const loginUserSuccessful = (user) => {
    return {
        type: LOGIN_USER_SUCCESSFUL,
        payload: user
    }
}

export const apiError = (error) => {
    return {
        type: API_FAILED,
        payload: error,
    }
}

export const loginUserFailed = (error) => {
    return {
        type: LOGIN_USER_FAILED,
        payload: error,
    }
}