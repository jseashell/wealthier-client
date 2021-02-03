import * as React from 'react';

import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import Debt from './Debt';
import Expenses from './Expenses';
import Income from './Income';
import RemainingBalance from './RemainingBalance';
import Schedule from './Schedule';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 340,
        overflow: 'auto'
    },
    maxHeight: {
        height: 'wrap-content'
    }
}));

export default function Overview(props) {
    const classes = useStyles();

    const [showAllExpenses, setShowAllExpenses] = React.useState(false);
    const toggleShowAllExpenses = () => {
        setShowAllExpenses(!showAllExpenses);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const maxHeightPaper = clsx(classes.paper, classes.maxHeight);

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={fixedHeightPaper}>
                        <Income />
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Debt paperClassName={fixedHeightPaper} />
                </Grid>
                <Grid item xs={3}>
                    <Paper className={fixedHeightPaper}>
                        <RemainingBalance />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={showAllExpenses ? maxHeightPaper : fixedHeightPaper}>
                        <Expenses
                            toggleShowAll={toggleShowAllExpenses}
                            showAll={showAllExpenses}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Schedule />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}