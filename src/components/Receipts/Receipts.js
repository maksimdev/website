import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import Cached from '@material-ui/icons/Cached';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Receipt from '@material-ui/icons/Receipt';
import Title from '../Title/Title';

export default function Receipts({ data = [], isLoading }) {

  return (
    <React.Fragment>
      <Title>Мои чеки</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Сумма</TableCell>
            <TableCell>Кол-во товаров</TableCell>
            <TableCell>Дата покупки</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.totalsum}</TableCell>
              <TableCell>{row.shiftnumber}</TableCell>
              <TableCell>{row.datetime}</TableCell>
              <TableCell>{row.status === 'pending' ? <Cached /> : <CheckCircle />}</TableCell>
              <TableCell align="right">{row.status === 'pending' ? <></> : <Receipt />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading ? <LinearProgress /> : <></>}
    </React.Fragment>
  );
}