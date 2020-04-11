import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import CardHeader from '@material-ui/core/CardHeader';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

import { convertValueToMoneyFormat } from '../../utils/utils';
import { Api } from '../../api/Api';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    margin: '20px',
    minWidth: 650,
    maxWidth: 800
  }
});

export default function({ receiptId }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [bill, setBill] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Api.loadReceipt(id)
      .then(data => {
        setBill({ document: { receipt: { ...data.receipt, items: data.items } } });
        setLoading(false);
      });
  }, []);

  const getFormattedBill = ({ document: { receipt: { userinn, datetime, totalsum, items } }}) => {

    const generateTable = (items) => {
      return (
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell align="right">Название</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Кол</TableCell>
              <TableCell align="right">Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{convertValueToMoneyFormat(item.price)}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{convertValueToMoneyFormat(item.sum)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    return (
      <Card className={classes.root} variant="outlined">
        <CardHeader
          action={
            <Link to={`/dashboard`}>Назад</Link>
          }
        />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            ИНН {userinn}
          </Typography>
          <Typography component="h3">
            {moment(datetime).format('YYYY.MM.DD HH:mm')}
          </Typography>
            {generateTable(items)}
          <Typography variant="h4">
            ИТОГО: {convertValueToMoneyFormat(totalsum)} руб
          </Typography>
        </CardContent>
      </Card>
    );
  }
  console.log('bill: ', bill);

  return (
    <Grid item align="center" xs={12}>
      {loading ? 'Loading...' : getFormattedBill(bill)}
    </Grid>
  )
}