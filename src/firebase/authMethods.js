import { firebase } from './index';

export const authMethods = {
    signin: (email, password, setErrors, setToken) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (res) => {
                await localStorage.setItem('tokenId', res.user.Aa);
                const token = await Object.entries(res.user.refreshToken);
                await localStorage.setItem('token', token);
                setToken(window.localStorage.token);
                //window.location.replace('/overview/dashboard');
                //history.push('/overview/dashboard')
            })
            .catch((err) => {
                //let history = useHistory();
                setErrors((prev) => [...prev, err.message]);
                //history.push('/overview/dashboard')
            });
    },

    signup: (email, password, setErrors, setToken) => {
        firebase
            .auth()
            .signUpWithEmailAndPassword(email, password)
            .then(async (res) => {
                console.log(res);
                // await localStorage.setItem('tokenId', res.user.Aa);
                // const token = await Object.entries(res.user.refreshToken);
                // await localStorage.setItem('token', token);
                // setToken(window.localStorage.token);
                //window.location.replace('/overview/dashboard');
                //history.push('/overview/dashboard')
            })
            .catch((err) => {
                //let history = useHistory();
                setErrors((prev) => [...prev, err.message]);
                //history.push('/overview/dashboard')
            });
    },

    signout: (setErrors, setToken) => {
        firebase
            .auth()
            .signOut()
            .then((res) => {
                localStorage.removeItem('token');
                setToken(null);
            })
            .catch((err) => {
                setErrors((prev) => [...prev, err.message]);
                localStorage.removeItem('token');
                setToken(null);
                console.error(err.message);
            });
    },
};
