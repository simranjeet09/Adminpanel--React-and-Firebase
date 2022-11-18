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

//fetch stocls from stocks api 
const StockPage = () => {
    const classes = useStyles();
    // hook to save stocks data in object
    const [getStockDetails, setStockDetails] = useState(null);
    const [loading,isLoading]=useState(true)
    useEffect(() => {
        axios
            .get(
                'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cds1dgiad3i727sohqugcds1dgiad3i727sohqv0'
            )
            .then((res) => {
                console.log('res', res);
                if (res && res.data) {
                    setStockDetails(res.data);
                }
                isLoading(false);
            });
    }, []);

    return (
        loading?LoadingSpinner(): <div>
            <Header title="Stocks" />
            {getStockDetails && (
                <Grid container spacing={3}>
                    {getStockDetails.map((stock, index) => {
                        if (index < 100) {
                            return (
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Paper className={classes.paperCls}>
                                        <p>
                                            <b>{stock.description}</b>
                                        </p>
                                        <p>{stock.currency}</p>
                                        <p>{stock.displaySymbol}</p>
                                        <p>
                                            <b>{stock.type}</b>
                                        </p>
                                    </Paper>
                                </Grid>
                            );
                        }
                    })}
                </Grid>
            )}
        </div>
    );
};

export default StockPage;
