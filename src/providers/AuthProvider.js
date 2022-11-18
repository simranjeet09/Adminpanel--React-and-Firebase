import React, { useState } from 'react';
import { authMethods } from './../firebase/authMethods';

export const firebaseAuth = React.createContext();
// auth provider is a helper file in which all methods related to login/signup are developed. 
const AuthProvider = (props) => {
    const initState = { email: '', password: '' };
    const [inputs, setInputs] = useState(initState);
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null);

    const handleSignup = () => {
        authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
    };

    const handleSignin = () => {
        authMethods.signin(inputs.email, inputs.password, setErrors, setToken);
    };

    const handleSignout = () => {
        authMethods.signout(setErrors, setToken);
    };

    return (
        <firebaseAuth.Provider
            value={{
                //replaced test with handleSignup
                handleSignup,
                handleSignin,
                token,
                inputs,
                setInputs,
                errors,
                handleSignout,
            }}
        >
            {props.children}
        </firebaseAuth.Provider>
    );
};

export default AuthProvider;
