import * as React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => {
    return {
        scrollPane: {
            overflow: 'auto'
        },
        viewDetails: {
            marginTop: theme.spacing(3),
        }
    };
});

export default function Debts() {
    const [debts, setDebts] = React.useState([]);

    React.useEffect(() => {
        async function fetchAllDebts() {
            await fetch('/debt/all')
                .then(res => res.json())
                .then(data => setDebts(data))
                .catch(error => console.log(error));
        }

        fetchAllDebts();
    }, []);

    const classes = useStyles();;
    return (
        <React.Fragment>
            <Title>Debts</Title>
            <Paper className={classes.scrollPane}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {debts.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell><a href={row.bankUrl}>{row.name}</a></TableCell>
                                <TableCell>{row.userFirstName}</TableCell>
                                <TableCell align='right'>${row.value.toFixed(2)}</TableCell>
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
