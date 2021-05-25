import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

//Account Redux states
import { REGISTER_USER } from './actionTypes';
import { registerUserSuccessful, apiError, duplicateRegister } from './actions';

//AUTH related methods
import { register } from '../../../helpers/authUtils';

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
    try {
        const response = yield call(register, user);
        yield put(registerUserSuccessful(response));
        return;
    } catch (error) {
        if(String(error).includes('duplicate') || String(error).includes('unique') ) 
            yield put(duplicateRegister(error));
        else 
            yield put(apiError(error));
    }
}

export function* watchUserRegister() {
    yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
    yield all([fork(watchUserRegister)]);
}

export default accountSaga;