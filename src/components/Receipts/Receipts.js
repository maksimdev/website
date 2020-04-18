import React from 'react';
import { Link } from "react-router-dom";
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
import { convertValueToMoneyFormat, convertDate } from '../../utils/utils';

export default function Receipts({ data = [], isLoading }) {
  return (
    <React.Fragment>
      <Title>Мои чеки</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Сумма</TableCell>
            <TableCell>Дата покупки</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{convertValueToMoneyFormat(row.totalsum)}</TableCell>
              <TableCell>{convertDate(row.datetime)}</TableCell>
              <TableCell>{row.status === 'PENDING' ? <Cached /> : <CheckCircle />}</TableCell>
              <TableCell align="right">
                {
                  row.status === 'PENDING'
                  ? <></>
                  : <Link to={`/receipts/${row.id}`}><Receipt /></Link>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading ? <LinearProgress /> : <></>}
    </React.Fragment>
  );
}