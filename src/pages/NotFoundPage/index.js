import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomButton from './../../components/Buttons';
//this will be used when user enters random paths 
const NotFoundPage = () => {
    const history = useHistory();
    return (
        <div className="text-center margin-t-30">
            <p className="text-primary text-48">Page Not Found !!!</p>
            <p className="text-primary text-24">Please redirect here: </p>
            <CustomButton
                btntype="primaryBtn"
                width="15%"
                onClick={() => history.push('/overview/dashboard')}
            >
                Go to Home Page
            </CustomButton>
        </div>
    );
};

export default NotFoundPage;
