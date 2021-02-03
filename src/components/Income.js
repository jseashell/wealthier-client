import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';

import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => {
    return {
        scrollPane: {
            maxHeight: 240,
            overflow: 'auto'
        },
        viewDetails: {
            marginTop: theme.spacing(3),
        }
    };
});

export default function Incomes(props) {
    const [incomes, setIncomes] = React.useState([]);

    React.useEffect(() => {
        async function fetchAllIncomes() {
            await fetch('/income/all')
                .then(res => res.json())
                .then(data => setIncomes(data))
                .catch(error => console.log(error));
        }

        fetchAllIncomes();
    }, []);

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <Paper className={classes.scrollPane}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomes.map((income) => (
                            <TableRow key={income._id}>
                                <TableCell>{income.userFirstName}</TableCell>
                                <TableCell align='right'>${income.value.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <div className={classes.viewDetails}>
                <Link color='primary' href='#' onClick={preventDefault}>
                    View Details
                </Link>
            </div>
        </React.Fragment >
    );
}
