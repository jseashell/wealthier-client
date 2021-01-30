import * as React from 'react';
import _ from 'lodash';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  table: {
    overflow: 'hidden',
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Schedule() {
  const [paymentSchedule, setPaymentSchedule] = React.useState([]);

  React.useEffect(() => {
    async function fetchPaymentSchedule() {
      await fetch('/schedule')
        .then(res => res.json())
        .then(data => {
          const paymentSchedule = _.sortBy(data, row => row.rank);
          setPaymentSchedule(paymentSchedule);
        })
        .catch(error => console.log(error))
    }

    fetchPaymentSchedule();
  }, []);

  const formatCurrency = (key, params) => {
    return `$${params.getValue(key).toFixed(2) || ''}`;
  }

  const columns = [{
    field: 'date',
    headerName: 'Date',
    description: 'Date in which a debt payment should occur.',
    flex: .30
  }, {
    field: 'name',
    headerName: 'Credit Card',
    description: 'The party to which the debt is owed.',
    flex: .40
  }, {
    field: 'previousBalance',
    headerName: 'Previous Balance',
    description: "The debt balance prior to this date's payment amount.",
    flex: .15,
    valueFormatter: (params) => formatCurrency('previousBalance', params)
  }, {
    field: 'paymentAmount',
    headerName: 'Amount',
    description: 'The amount of this payment.',
    type: 'number',
    flex: .15,
    valueFormatter: (params) => formatCurrency('paymentAmount', params)
  }, {
    field: 'nextBalance',
    headerName: 'Next Balance',
    description: "The debt balance after applying this date's payment amount.",
    flex: .15,
    valueFormatter: (params) => formatCurrency('nextBalance', params)
  }];

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Payment Schedule</Title>
      <Paper className={classes.dataGridContainer}>
        <DataGrid
          rows={expenses}
          columns={columns}
          pageSize={0}
        // checkboxSelection // don't need this yet
        />
      </Paper>
      {/* <Table className='table' size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell align='right'>Before</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='right'>After</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentSchedule.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align='right'>${row.previousBalance}</TableCell>
              <TableCell align='right'>${row.paymentAmount}</TableCell>
              <TableCell align='right'>${row.nextBalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <div className={classes.seeMore}>
        <Link color='primary' href='#' onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
