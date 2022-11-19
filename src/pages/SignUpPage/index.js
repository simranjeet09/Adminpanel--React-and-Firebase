import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import validateLoginForm from './../../utility/validations/login';
import CustomButton from './../../components/Buttons';
import useWindowDimensions from './../../components/WindowDimensions';
import { firebaseAuth } from './../../providers/AuthProvider';
import { useHistory, Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { firebase } from './../../firebase';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

const CustomCheckbox = withStyles({
    root: {
        color: '#F0F3F8',
        borderRadius: '2px',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
        },
        '& .MuiIconButton-root.Mui-hover': {
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: '#fff',
            },
        },
        '&$checked': {
            color: '#F9BB4B',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" disabled {...props} />);

const useStyles = makeStyles((theme) => ({
    textInputCls: {
        width: '100%',
        margin: '20px 0px',
        '& .MuiOutlinedInput-root': {
            borderColor: '#F0F3F8',
            borderWidth: '2px',
            '&.Mui-focused fieldset': {
                borderColor: '#F9BB4B',
                borderWidth: '2px',
            },
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#F9BB4B',
        },
    },
}));

const SignUpPage = () => {
    const history = useHistory();
    const classes = useStyles();

 //hook to hide show password
    const [showPassword, setShowPassword] = useState(false);
     //hook to set input fields details

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });
         //hook to set errors

    const [errorsValid, setErrors] = useState({});
    const { height, width } = useWindowDimensions();
            
    //hook to responsive
    const [toggleMobile, setToggleMobile] = useState(false);
    const { handleSignup, inputs, setInputs, errors, token } =
        useContext(firebaseAuth);
    const [toggleCheck, setToggleCheck] = React.useState({ rememberMe: true });

    const handleChangeRemember = (event) => {
        setToggleCheck({
            ...toggleCheck,
            [event.target.name]: event.target.checked,
        });
    };
    //hook to handle text change in input fields
    const handleChange = (event) => {
        setLoginDetails((loginDetails) => ({
            ...loginDetails,
            [event.target.name]: event.target.value,
        }));
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };
    //submit button click handeling 

    const submitLogin = (event) => {
        event.preventDefault();
        console.log('loginDetails', loginDetails);
       
        //if (Object.keys(validateLoginForm(loginDetails)).length === 0) {
        //handleSignup();
        const authentication = getAuth();
        createUserWithEmailAndPassword(
            authentication,
            loginDetails.email,
            loginDetails.password
        )
            .then((response) => {
                var db = firebase.firestore()
                db.collection("/users").add({
                    uid: JSON.stringify(response),
                    fullname: loginDetails.fullname,
                    email: loginDetails.email,
                    
                })
                .then((docRef) => {
                   console.log("saved")
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

                alert('User registered. Please login now');

                history.push('/');
                sessionStorage.setItem(
                    'token',
                    response._tokenResponse.refreshToken
                );
            })
            .catch((error) => {
                console.log('error', error);
                alert('Email Already in Use');
            });
        //}
        // else {
        //setErrors(validateLoginForm(loginDetails));
        //}
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickClear = () => {
        setLoginDetails((loginDetails) => ({
            ...loginDetails,
            email: '',
        }));
    };

    // useEffect(() => {
    //     if (token !== null && token) {
    //         history.push('/overview/dashboard');
    //     } else if (token === null) {
    //         history.push('/');
    //     }
    // }, [token]);

    useEffect(() => {
        if (width <= 576) {
            setToggleMobile(true);
        } else {
            setToggleMobile(false);
        }
    }, [width, height]);

    console.log('errors', errors);

    return (
        <div className="loginContentCls">
            <Grid
                container
                spacing={0}
                alignItems="center"
                className="height100Vh"
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className="leftSideContent padding-t-200"
                >
                    <img
                        src="/assets/images/left_landing_page.svg"
                        alt="Limor Logo"
                        width="100%"
                    />
                    <br />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="rightFormContent">
                        <p className="text-24 fw-600">Sign Up</p>
                        <p className="margin-t-0 text-grey">
                            Enter your Name, email address and password
                        </p>
                        <TextField
                            name="fullname"
                            id="outlined-error"
                            label="Enter Name"
                            variant="outlined"
                            placeholder="John Doe"
                            className={classes.textInputCls}
                            onChange={handleChange}
                            value={loginDetails.fullname}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickClear}
                                            edge="end"
                                        >
                                            {loginDetails.email ? (
                                                <img
                                                    src="/assets/icons/text-field-close.svg"
                                                    alt="Close"
                                                />
                                            ) : null}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            error={errorsValid.email ? true : false}
                            name="email"
                            id="outlined-error"
                            label="Enter Email Address"
                            variant="outlined"
                            placeholder="doe@gmail.com"
                            className={classes.textInputCls}
                            onChange={handleChange}
                            value={loginDetails.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickClear}
                                            edge="end"
                                        >
                                            {loginDetails.email ? (
                                                <img
                                                    src="/assets/icons/text-field-close.svg"
                                                    alt="Close"
                                                />
                                            ) : null}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorText text-12 float-left">
                            {errorsValid.email && errorsValid.email}
                        </div>
                        <TextField
                            error={errorsValid.password ? true : false}
                            label="Enter Password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            variant="outlined"
                            value={loginDetails.password}
                            className={classes.textInputCls}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <img
                                                    src="/assets/icons/eye.svg"
                                                    alt="Show"
                                                />
                                            ) : (
                                                <img
                                                    src="/assets/icons/eye-slash.svg"
                                                    alt="Show"
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="errorText text-12 float-left">
                            {errorsValid.password && errorsValid.password}
                        </div>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <FormControlLabel
                                    control={
                                        <CustomCheckbox
                                            checked={toggleCheck.rememberMe}
                                            onChange={handleChangeRemember}
                                            name="rememberMe"
                                            iconStyle={{ fill: 'black' }}
                                        />
                                    }
                                    label="Remember Me"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                        </Grid>
                        <div className="margin-t-30">
                            <CustomButton
                                btntype={
                                    loginDetails.email && loginDetails.password
                                        ? 'primaryBtn'
                                        : 'disableBtn'
                                }
                                disabled={
                                    loginDetails.email && loginDetails.password
                                        ? false
                                        : true
                                }
                                width="100%"
                                onClick={submitLogin}
                            >
                                Continue
                            </CustomButton>
                            <div className="text-center margin-tb-20">
                                <Link
                                    to="/"
                                    className="cursor-pointer margin-t-10 text-primary"
                                >
                                    Click here to Sign In !
                                </Link>
                            </div>
                        </div>
                        {errors.length > 0
                            ? errors.map((error) => (
                                  <p className="text-red text-center">
                                      {error}
                                  </p>
                              ))
                            : null}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignUpPage;
