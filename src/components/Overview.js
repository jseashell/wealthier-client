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
    minHeight: {
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
    const minHeightPaper = clsx(classes.paper, classes.minHeight);

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Income paperHeight={fixedHeightPaper} />
                </Grid>
                <Grid item xs={5}>
                    <Debt paperHeight={fixedHeightPaper} />
                </Grid>
                <Grid item xs={3}>
                    <RemainingBalance paperHeight={fixedHeightPaper} />
                </Grid>
                <Grid item xs={12}>
                    <Expenses
                        paperHeight={showAllExpenses ? minHeightPaper : fixedHeightPaper}
                        toggleShowAll={toggleShowAllExpenses}
                        showAll={showAllExpenses}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Schedule paperHeight={minHeightPaper} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}