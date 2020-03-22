import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { Api } from '../../../api/Api';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
}));


export default function({ requisites, setData }) {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //mock setData({"document":{"receipt":{"ecashTotalSum":40449,"fiscalDriveNumber":"9280440300332772","fiscalDocumentNumber":10756,"taxationType":0,"shiftNumber":187,"userInn":"7728029110","operationType":1,"receiptCode":3,"items":[{"price":649,"name":"1:3305976 Пакет ПЕРЕКРЕСТОК майка 65х40см","quantity":1,"sum":649},{"price":4790,"name":"2:3945535 Изд.бул.ДВИНСКИЙ ЗАВАРНОЙ 350г","quantity":1,"sum":4790},{"price":32900,"name":"3:3693812 Ребрышки ПРЕМИУМ 1кг","quantity":0.876,"sum":28820},{"price":6190,"name":"4:3695123 Смесь MAGGI НА ВТОРОЕ 30г","quantity":1,"sum":6190}],"fiscalSign":283222882,"nds20":1140,"dateTime":"2020-03-20T15:24:00","requestNumber":26,"totalSum":40449,"nds10":3055,"rawData":"AwAwAhEEEAA5MjgwNDQwMzAwMzMyNzcyDQQUADAwMDI2NDgwNDgwMzY2ODggICAg+gMMADc3MjgwMjkxMTAgIBAEBAAEKgAA9AMEABDgdF41BAYAMQQQ4aNiDgQEALsAAAASBAQAGgAAAB4EAQAB/AMCAAGeIwRTAAYEKQAxOjMzMDU5NzYgj6CqpeIgj4WQhYqQhZGSjoogrKCpqqAgNjXlNDDhrDcEAgCJAv8DAgAAARMEAgCJAq8EAQABsAQBAGy8BAEAAb4EAQAEIwRTAAYEKAAyOjM5NDU1MzUgiKekLqHjqy6EgoiNkYqIiSCHgIKAkI2OiSAzNTCjNwQCALYS/wMCAAABEwQCALYSrwQBAAKwBAIAswG8BAEAAb4EAQAEIwRKAAYEHgAzOjM2OTM4MTIgkKWh4Ovoqqggj5CFjIiTjCAxqqM3BAIAhID/AwMAA2wDEwQCAJRwrwQBAAKwBAIAPAq8BAEAAb4EAQAEIwROAAYEIwA0OjM2OTUxMjMgkayl4ewgTUFHR0kgjYAggpKOkI6FIDMwozcEAgAuGP8DAgAAARMEAgAuGK8EAQABsAQCAAgEvAQBAAG+BAEABAcEAQAAOQQCAAGevwQBAADABAEAAMEEAQAA/QMtAIqg4eGo4C2v4K6koKKl5iCMqOCu6K2o56Wtqq4gjqvso6AgjaiqrqugpaKtoLMEDAAzMjAzMDIwNDU5NzkfBAEAAbkEAQACTgQCAHQETwQCAO8L","cashTotalSum":0,"kktRegId":"0002648048036688    ","operator":"Кассир-продавец Мирошниченко Ольга Николаевна"}}})
  const getBill = (FN, FD, FDP) => {
    setError(false);
    setLoading(true);
    Api.getBill(FN, FD, FDP)
    .then(data => {
      if(data.document) {
        setLoading(false);
        setData(data);
      } else {
        setLoading(false);
        setError(true);
      }
    })
    .catch((e) => {
      setLoading(false);
      setError(true);
    });
  }
  console.log('loading: ', loading);

  return (
    <>
      <Grid item align="center" xs={2}>
          <TextField
            label="Дата и время"
            defaultValue={moment(requisites.t).format('YYYY.MM.DD HH:mm')}
            InputProps={{
              readOnly: true,
            }}
            error={!requisites.t}
            helperText={!requisites.t ? "Ошибка получения" : ''}
          />
      </Grid>
      <Grid item align="center" xs={2}>
          <TextField
            label="Сумма"
            defaultValue={requisites.s}
            InputProps={{
              readOnly: true,
            }}
            error={!requisites.s}
            helperText={!requisites.s ? "Ошибка получения" : ''}
          />
      </Grid>
      <Grid item xs={2}>
          <TextField
            label="ФН"
            defaultValue={requisites.fn}
            InputProps={{
              readOnly: true,
            }}
            error={!requisites.i}
            helperText={!requisites.fp ? "Ошибка получения" : ''}
          />
      </Grid>
      <Grid item xs={2}>
          <TextField
            label="ФД"
            defaultValue={requisites.i}
            InputProps={{
              readOnly: true,
            }}
            error={!requisites.i}
            helperText={!requisites.fp ? "Ошибка получения" : ''}
          />
      </Grid>
      <Grid item xs={2}>
          <TextField
            label="ФП"
            defaultValue={requisites.fp}
            InputProps={{
              readOnly: true,
            }}
            error={!requisites.fp}
            helperText={!requisites.fp ? "Ошибка получения" : ''}
          />
      </Grid>
      <Grid item align="center" xs={12}>
        {
          (requisites && requisites.fn && requisites.i && requisites.fp)
          ? <Button disabled={loading} onClick={() => getBill(requisites.fn, requisites.i, requisites.fp)} color="primary" >
              Найти чек
            </Button>
          : null
        }
      </Grid>
      <Grid item align="center" xs={12}>
        {error ? 'Сервер перегружен, попробуйте еще раз.' : ''}
      </Grid>
    </>
  )
}