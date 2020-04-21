import React, { useState } from 'react';
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

import { Api } from '../../../api/Api';
import { convertValueToMoneyFormat } from '../../../utils/utils';

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

export default function({ requisites, bill, saveBill, setData }) {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveBillRequest = (bill, fn, fd, fp, t, s) => {
    const request = bill.document.receipt.items ? bill.document : { fn, fd, fp, t, s };
    setError(false);
    setLoading(true);
    Api.createReceipt(request)
      .then(data => {
        setError(false);
        setLoading(false);
        setData(data.message);
      })
      .catch(e => {
        setError(true)
        setLoading(false);
      });
  }

  const getFormattedBill = ({ document: { receipt: { userInn, dateTime, totalSum, items } }}) => {

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
            <Button disabled={loading} onClick={() => saveBillRequest(bill, requisites.fn, requisites.i, requisites.fp, requisites.t, requisites.s)} color="primary">
               Подтвердить сохранение чека
            </Button>
          }
          title={
            error
            ? 'Сервер перегружен, попробуйте еще раз.'
            : bill.document.receipt.items
              ? ''
              : 'Чек будет загружен при появлении его в системе'
          }
        />
        {
          bill.document.receipt.items
          ? (
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                ИНН {userInn}
              </Typography>
              <Typography component="h3">
                {moment(dateTime).format('YYYY.MM.DD HH:mm')}
              </Typography>
                {generateTable(items)}
              <Typography variant="h4">
                ИТОГО: {convertValueToMoneyFormat(totalSum)} руб
              </Typography>
            </CardContent>
          ) : ''
        }
      </Card>
    );
  }

  return (
    <Grid item align="center" xs={12}>
      {getFormattedBill(bill)}
    </Grid>
  )
}