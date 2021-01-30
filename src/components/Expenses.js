import * as React from 'react';
import _ from 'lodash';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles((theme) => {
    return {
        table: {
            minWidth: 100,
        },
        showAll: {
            marginTop: theme.spacing(3),
        }
    };
});

export default function Expenses(props) {
    const [expenses, setExpenses] = React.useState([]);

    React.useEffect(() => {
        async function fetchAllExpenses() {
            await fetch('/expense/all')
                .then(res => res.json())
                .then(data => {
                    const sortedExpenses = _.sortBy(data, (row) => row.username);
                    setExpenses(sortedExpenses);
                })
                .catch(error => console.log(error));
        }

        fetchAllExpenses();
    }, []);

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Expenses</Title>
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Payee</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.take(expenses, props.showAll ? expenses.length : 3).map((expense) => (
                            <TableRow key={expense._id}>
                                <TableCell>{expense.name}</TableCell>
                                <TableCell>{expense.payee}</TableCell>
                                <TableCell>{expense.userFirstName}</TableCell>
                                <TableCell align='right'>${expense.value.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <div className={classes.showAll}>
                <Link color='primary' href='#' onClick={props.toggleShowAll}>
                    {props.showAll ? 'Show less' : 'Show ' + (expenses.length - 3) + ' more'}
                </Link>
            </div>
        </React.Fragment >
    );
}
