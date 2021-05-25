import { REGISTER_USER, REGISTER_USER_SUCCESSFUL, API_FAILED, EMPTY_ERROR, DUPLICATE_REGISTER } from './actionTypes';

export const registerUser = (user) => {
    return {
        type: REGISTER_USER,
        payload: { user }
    }
}

export const registerUserSuccessful = (user) => {
    return {
        type: REGISTER_USER_SUCCESSFUL,
        payload: user
    }
}

export const apiError = (error) => {
    return {
        type: API_FAILED,
        payload: 'Error en el servidor'
    }
}
export const duplicateRegister = (error) => {
    return {
        type: DUPLICATE_REGISTER,
        payload: 'Usuario ya se encuentra registrado'
    }
}

export const emptyError = () => {
    return {
        type: EMPTY_ERROR
    }
}
