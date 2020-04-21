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
  const [missing, setMissing] = useState(false);

  const getBill = (fn, fd, fp, time, sum) => {
    setMissing(false);
    setError(false);
    setLoading(true);
    const transformTime = time => moment(time).format('YYYY-MM-DDTHH:mm:ss');
    const transformSum = sum => sum.replace('.', '');
    Api.checkBill(fn, fd, fp, transformTime(time), transformSum(sum))
    .then(() => 
    Api.getBill(fn, fd, fp)
    )
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
      setError(true);
      setLoading(false);
      setMissing(true);
    });
  }

  const missingMessage = () => (<>
    <span>
      Внимание! Чек в системе не найден.
      <br />
      Возможные причины:
      <br />
      "Магазин еще не отправил данные по чеку в налоговую систему"
      <br />
      "Данные по чеку введены не верно (ручной ввод)"
      <br />
      <Button disabled={loading} onClick={() => setData({ document: { receipt: {} } })} color="primary" >
        Чек будет загружен при появлении в системе. Продолжить?
      </Button>
    </span>
  </>);

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
          ? <Button disabled={loading} onClick={() => getBill(requisites.fn, requisites.i, requisites.fp, requisites.t, requisites.s)} color="primary" >
              Найти чек
            </Button>
          : null
        }
      </Grid>
      <Grid item align="center" xs={12}>
        {
          (error && missing)
          ? missingMessage()
          : ''
        }
        {(error && !missing) ? 'Сервер налоговой не отвечает, попробуйте еще раз.' : ''}
      </Grid>
    </>
  )
}