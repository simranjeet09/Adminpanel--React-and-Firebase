import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paperCls: {
        height: '100%',
        padding: 20,
        textAlign: 'center',
    },
}));

const Activities = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paperCls}>
                <h2 className="table-col t-heading">{props.title}</h2>
                <h3 className="table-col t-heading">{props.value}</h3>
                <img src={props.imageUrl} width="100%" />
            </Paper>
        </div>
    );
};
export default Activities;
