import client from './../graphql/client';
import md5 from 'md5';
import { REGISTER_USER } from './../graphql/mutations';
import { LOGIN_USER } from './../graphql/queries';

//Set the logged in user data in local session 
export const setLoggeedInUser = (user) => {
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
}

// Gets the logged in user data from local session 
export const getLoggedInUser = () => {
    const user = localStorage.getItem('user');
    if (user)
        return JSON.parse(user);
    return null;
}

//is user is logged in
export const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
}

// Register Method
export const register = (data) => {
    return client.mutate({
        mutation: REGISTER_USER,
        variables: {
            id: Number(data.id),
            nombres: data.nombres,
            apellidos: data.apellidos,
            correo: data.correo,
            fk_dependencia: Number(data.dependencia),
            password: md5(data.password),
            cargo: data.cargo,
        },
    })
        .then( () => {
            return {
                id: Number(data.id)
            }
        }).catch(error => {
            throw error
        });
}

// Login Method
export const login = (data) => {
    return client.query({
        query: LOGIN_USER,
        variables: {
            correo: data.correo,
            password: md5(data.password),
        },
    })
        .then( response => {
            return response.data.usuario[0]
        }).catch(error => {
            throw error
        });
}

