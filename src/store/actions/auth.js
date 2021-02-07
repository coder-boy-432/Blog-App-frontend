import * as actionTypes from './actionTypes';
import axios from '../../noAuthaxios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token,userId,username) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId,
        username: username
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    }
}

export const auth = (username,email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            email: email,
            password: password,
            returnSecureToken: true
        }
        // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCL4Fnb0iBpCQlpM3bGeGhf-W8I7IC7dQw';
        // let url = 'https://rutuj3.run.goorm.io/auth/signup';
        let url = '/auth/signup';
        if (!isSignup) {
            // url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCL4Fnb0iBpCQlpM3bGeGhf-W8I7IC7dQw';
            url = '/auth/login';
        }
        // url = proxyurl + url;
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                console.log(response);
                localStorage.setItem('username',response.data.username);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken,response.data.localId,response.data.username));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                // dispatch(authFail(err.response.data.error));
            });
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            if(expirationDate <= new Date()){
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId,username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));
            }
        }
    }
}

export const setUsernameSent = () => {
    return {
        type: actionTypes.SET_USER_NAME_SENT,
    };
}