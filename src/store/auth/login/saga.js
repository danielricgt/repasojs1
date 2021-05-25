import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN } from './actionTypes';
import { apiError, loginUserSuccessful, loginUserFailed } from './actions';

// AUTH related methods
import { setLoggeedInUser, login } from '../../../helpers/authUtils';

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { correo, password, history } }) {
        try {
            const response = yield call(login, {correo, password});
            if(response) {
                setLoggeedInUser(response);
                yield put(loginUserSuccessful(response));
                history.push('/');

            } else {
                yield put(loginUserFailed('Credenciales Invalidas')) 
            }
        } catch (error) {
            yield put(apiError(error));
        }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser)
}

function* loginSaga() {
    yield all([fork(watchUserLogin)]);
}

export default loginSaga;