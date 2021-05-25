import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';

export default function* rootSaga() {
    yield all([
        //public
        accountSaga(),
        loginSaga(),
    ])
}