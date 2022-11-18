import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import Activities from '../../components/Activities';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../../components/loader/loader';

const useStyles = makeStyles((theme) => ({
    paperCls: {
        height: '100%',
        padding: 20,
        textAlign: 'center',
    },
}));

const NewsPage = () => {
    const classes = useStyles();
    const [getNewsDetails, setNewsDetails] = useState(null);
    const [loading,isLoading]=useState(true)

    //fetch news from newsapi as soon as page loads
    useEffect(() => {
        axios
            .get(
                'https://newsapi.org/v2/top-headlines?country=us&apiKey=7502218d123b407b92e37ee5c21c8b2f'
            )
            .then((res) => {
                console.log('res', res);
                if (res && res.data) {
                    setNewsDetails(res.data.articles);
                }
                isLoading(false);
            });
    }, []);

    return (
       loading?LoadingSpinner(): <div>
            <Header title="News" />
            {getNewsDetails && (
                <Grid container spacing={3}>
                    {getNewsDetails.map((news, index) => {
                        return (
                            <Grid item sm={12} md={6} lg={6}>
                                <Paper className={classes.paperCls}>
                                    <p>
                                        <b>{news.title}</b>
                                    </p>
                                    <img src={news.urlToImage} width="100%" />
                                    <p>
                                        Author: <b>{news.author}</b>
                                    </p>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </div>
    );
};

export default NewsPage;
