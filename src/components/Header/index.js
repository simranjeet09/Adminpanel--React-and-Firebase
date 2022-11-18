import React, { useState, useEffect, useContext } from 'react';
import { firebaseAuth } from './../../providers/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '10px',
        alignItems: 'flex-end',
    },
    profileDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginTop:30
    },
    profileImg: {
        borderRadius: '12px',
        marginRight: '20px',
    },
    rightArrowCls: {
        position: 'relative',
        top: 6,
        marginRight: 12,
        cursor: 'pointer',
    },
}));

const Header = ({ title, userDetails }) => {
    let history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { handleSignout } = useContext(firebaseAuth);
    const [userId, setUserId] = useState(0);

    const handleLogout = () => {
        //handleSignout();
        history.push('/');
    };

    const navigationToLink = (url) => {
        history.goBack();
    };

    return (
        <>
         <div className={classes.profileDetails}>
                <div>
                    <span className="text-24 fw-600">{title}</span>
                </div>
                <div>
               
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps)(Header);
