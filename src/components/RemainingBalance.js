import * as React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => {
  return {
    depositContext: {
      flex: 1,
    }
  };
});

export default function RemainingBalance() {
  const [data, setData] = React.useState({ remainingBalance: null });

  React.useEffect(() => {
    async function fetchRemainingBalance() {
      await fetch('/debt/all')
        .then(res => res.json())
        .then(data => {
          setData({
            remainingBalance: data.map(debt => debt.value).reduce((a, b) => a + b, 0)
          })
        })
        .catch(error => console.log(error));
    }

    fetchRemainingBalance();
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Remaining Balance</Title>
      <Typography component='p' variant='h4'>
        {data.remainingBalance}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        on {new Date().toLocaleString()}
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
