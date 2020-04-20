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

const document = {
  "receipt": {
      "nds18": 37388,
      "totalSum": 316500,
      "receiptCode": 3,
      "operator": "Минасян Марина Мартиновна",
      "items": [
          {
              "price": 699,
              "name": "Пакет ЛЕНТА средний майка 12кг",
              "quantity": 2,
              "sum": 1398
          },
          {
              "price": 24999,
              "name": "П/ф Куриное филе Деликатесное охл вес",
              "quantity": 2.192,
              "sum": 54798
          },
          {
              "price": 38679,
              "name": "Напиток вин BOSCA Анниверсари газ бел",
              "quantity": 1,
              "sum": 38679
          },
          {
              "price": 33999,
              "name": "Вино FANAGORIA Каберне г/н КрСухРос0.75L",
              "quantity": 1,
              "sum": 33999
          },
          {
              "price": 23999,
              "name": "Уголь GIARDINO CLUB премиум 3кг 111098",
              "quantity": 1,
              "sum": 23999
          },
          {
              "price": 31419,
              "name": "Крем-гель д/д NIVEA Нежное увл.750мл",
              "quantity": 1,
              "sum": 31419
          },
          {
              "price": 17959,
              "name": "Мыло жидк РЕЦЕПТЫ АГАФЬИ Мятно-лимон 1л",
              "quantity": 1,
              "sum": 17959
          },
          {
              "price": 6799,
              "name": "Ср-во д/пос FAIRY апельс лимонник 450мл",
              "quantity": 1,
              "sum": 6799
          },
          {
              "price": 18900,
              "name": "Морковь По-Корейски СП вес",
              "quantity": 0.396,
              "sum": 7484
          },
          {
              "price": 4499,
              "name": "Хлеб АЛАДУШКИН Двинский зерн заварн350г",
              "quantity": 1,
              "sum": 4499
          },
          {
              "price": 17049,
              "name": "Бритвы BIC 3 Sensitive муж. 4шт",
              "quantity": 2,
              "sum": 34098
          },
          {
              "price": 15899,
              "name": "Перец красный вес 1кг",
              "quantity": 0.988,
              "sum": 15708
          },
          {
              "price": 4989,
              "name": "Лаваш НКАНАК Грузинский Шоти 300г",
              "quantity": 2,
              "sum": 9978
          },
          {
              "price": 7199,
              "name": "Хлеб НКАНАК армянский 400г",
              "quantity": 1,
              "sum": 7199
          },
          {
              "price": 10569,
              "name": "Шоколад DOVE Молочный 90г",
              "quantity": 1,
              "sum": 10569
          },
          {
              "price": 8999,
              "name": "Жидкость д/розжига ЛЕНТА 0.5L",
              "quantity": 1,
              "sum": 8999
          },
          {
              "price": 2229,
              "name": "Перчатки 365 ДНЕЙ хозяйс.размеры S, M, L",
              "quantity": 4,
              "sum": 8916
          }
      ],
      "user": "ООО \"Лента\"",
      "cashTotalSum": 0,
      "retailPlaceAddress": "188643, Всеволожск, ш. Дорога Жизни, 12 ----------------------------------------",
      "fiscalSign": 838116500,
      "kktRegId": "0000385865005763    ",
      "userInn": "7814148471",
      "ecashTotalSum": 316500,
      "requestNumber": 188,
      "dateTime": "2020-03-29T18:13:00",
      "fiscalDocumentNumber": 57453,
      "operationType": 1,
      "fiscalDriveNumber": "9251440300040065",
      "nds10": 8380,
      "shiftNumber": 226,
      "taxationType": 1,
      "rawData": "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"
  }
};

export default function() {
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

  const getFormattedBill = ({ document: { receipt: { userInn, dateTime, totalSum, items } }}) => {

    const priceFormat = (price) => `${price}`.substring(0, `${price}`.length - 2) + '.' + `${price}`.substr(-2);

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
                <TableCell align="right">{priceFormat(item.price)}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{priceFormat(item.sum)}</TableCell>
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
          title={
            'title here'
          }
        />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            ИНН {userInn}
          </Typography>
          <Typography component="h3">
            {moment(dateTime).format('YYYY.MM.DD HH:mm')}
          </Typography>
            {generateTable(items)}
          <Typography variant="h4">
            ИТОГО: {priceFormat(totalSum)} руб
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid item align="center" xs={12}>
      {loading ? 'Loading...' : getFormattedBill(bill)}
    </Grid>
  )
}