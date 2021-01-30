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

import { DataGrid } from '@material-ui/data-grid';
import Title from './Title';

const useStyles = makeStyles((theme) => {
    return {
        table: {
            minWidth: 100,
        },
        dataGridContainer: {
            display: 'flex',
            height: '100%'
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
                    setExpenses(
                        _.sortBy(data, expense => expense.name)
                            .map(expense => {
                                expense.id = expense._id; // Data-Grid requires all rows have a unique "id" property
                                delete expense._id;
                                return expense;
                            }));
                })
                .catch(error => console.log(error));
        }

        fetchAllExpenses();
    }, []);

    const columns = [{
        field: 'name',
        headerName: 'Name',
        description: 'Name of the expense. This name helps you personalize your expenses.',
        flex: .30
    }, {
        field: 'payee',
        headerName: 'Payee',
        description: 'The party to which the expense is owed.',
        flex: .40
    }, {
        field: 'userFirstName',
        headerName: 'Owner',
        description: 'The person responsible for this expense.',
        flex: .15
    }, {
        field: 'value',
        headerName: 'Amount',
        description: 'The amount of this expense.',
        type: 'number',
        flex: .15,
        valueFormatter: (params) => `$${params.getValue('value').toFixed(2) || ''}`
    }];

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Expenses</Title>
            <Paper className={classes.dataGridContainer}>
                <DataGrid
                    rows={expenses}
                    columns={columns}
                    pageSize={0}
                // checkboxSelection // don't need this yet
                />
            </Paper>
        </React.Fragment >
    );
}
