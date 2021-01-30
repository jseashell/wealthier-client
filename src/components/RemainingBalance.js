import * as React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Locale } from '@js-joda/locale_en'
import { LocalDate, DateTimeFormatter } from '@js-joda/core';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => {
  return {
    asOfDate: {
      flex: 1,
    }
  };
});

export default function RemainingDebt() {
  const [remainingDebt, setRemainingDebt] = React.useState(0);

  React.useEffect(() => {
    async function fetchRemainingDebt() {
      await fetch('/debt/all')
        .then(res => res.json())
        .then(data => setRemainingDebt(data.map(debt => debt.value).reduce((a, b) => a + b, 0)))
        .catch(error => console.log(error));
    }

    fetchRemainingDebt();
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Remaining Debt</Title>
      <Typography component='p' variant='h4'>
        ${remainingDebt.toFixed(2)}
      </Typography>
      <Typography color='textSecondary' className={classes.asOfDate}>
        as of {LocalDate.now().format(DateTimeFormatter.ofPattern('MMMM dd, uuuu').withLocale(Locale.ENGLISH))}
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
