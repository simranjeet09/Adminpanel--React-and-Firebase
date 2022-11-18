import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Header from './../../../components/Header';
import Activities from '../../../components/Activities';
import { firebase } from './../../../firebase';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getDatabase,
    ref,
    child,
    onValue,
    get,
    getUser,
} from 'firebase/database';

const useStyles = makeStyles((theme) => ({
    overrideCls: {
        marginTop: 22,
    },
    paperCls: {
        padding: '10px 20px 20px 20px',
        borderRadius: 10,
        boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.04)',
    },
    tabContainer: {
        background: '#F0F3F8',
        borderRadius: 10,
        padding: 5,
        marginTop: 20,
        justifyContent: 'space-between',
    },
}));

const Dashboard = () => {

    const classes = useStyles();
    //hook to set user details from firebase 
    const [getUserDetails, setUserDetails] = useState();

    //fetch logged in user data as soon as page loads
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
  
            if (user) {
                console.log(user);
                setUserDetails(user);
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(uid);

                const userDetails = auth.currentUser;

                if (userDetails) {
                    console.log(userDetails);
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    // ...
                } else {
                    // No user is signed in.
                }

                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);

    console.log('getUserDetails', getUserDetails);

    return (
        <div>
            <Header title="Dashboard" />

            {getUserDetails && (
                <div className="margin-t-30">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                            <Activities
                                title="Email"
                                value={getUserDetails.email??"N/A"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                            <Activities
                                title="Email Verified"
                                value={getUserDetails.emailVerified?"Verified":"Not Verified"}
                            />
                        </Grid>
                         
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                            <Activities
                                title="User Id"
                                value={getUserDetails.providerData[0].uid??"N/A"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                            <Activities
                                title="Last Login"
                                value={getUserDetails.metadata.lastSignInTime??"N/A"}
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
