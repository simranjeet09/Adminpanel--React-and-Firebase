import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import Activities from '../../components/Activities';
import Grid from '@material-ui/core/Grid';
import LoadingSpinner from '../../components/loader/loader';

const WeatherPage = () => {

    //hook to handle weather data which is fetched from api 
    const [getWeatherDetails, setWeatherDetails] = useState(null);
    const [loading,isLoading]=useState(true)
    //load data as soon as page opens 
    useEffect(() => {
        axios
            .get('https://weatherdbi.herokuapp.com/data/weather/Canada')
            .then((res) => {
                if (res && res.data) {
                    setWeatherDetails(res.data);
                    isLoading(false);
                }
            });
    }, []);



    return (
        loading?LoadingSpinner():<div>
            <Header title="Weather" />
            {/* {getWeatherDetails && (
                <div>
                    <h2>{getWeatherDetails.name}</h2>
                    <p>Current Condition</p>
                    <p> dayhour : {getWeatherDetails.main.temp}</p>
                    <p>humidity : {getWeatherDetails.main.humidity}</p>
                    <p> precip : {getWeatherDetails.main.pressure}</p>
                </div>
            )} */}
            {getWeatherDetails && (
                <div>
                    <h2>{getWeatherDetails.region}</h2>
                    <p>Current Condition</p>

                    <Grid container spacing={3}>
                        <Grid item sm={12} md={3} lg={3}>
                            <Activities
                                title="Comment"
                                value={
                                    getWeatherDetails.currentConditions.comment
                                }
                            />
                        </Grid>
                        <Grid item sm={12} md={3} lg={3}>
                            <Activities
                                title="Dayhour"
                                value={
                                    getWeatherDetails.currentConditions.dayhour
                                }
                            />
                        </Grid>
                        <Grid item sm={12} md={3} lg={3}>
                            <Activities
                                title="Humidity"
                                value={
                                    getWeatherDetails.currentConditions.humidity
                                }
                            />
                        </Grid>
                        <Grid item sm={12} md={3} lg={3}>
                            <Activities
                                title="Precipitation"
                                value={
                                    getWeatherDetails.currentConditions.precip
                                }
                            />
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                            <Activities
                                title="Now"
                                imageUrl={
                                    getWeatherDetails.currentConditions.iconURL
                                }
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default WeatherPage;
