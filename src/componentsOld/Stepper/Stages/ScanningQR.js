import React, { useState } from 'react';
import QRScanner from '../../QRScanner/QRScanner';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function({ setData }) {
  const [manualInput, setManualInput] = useState(false);
  const [billInfo, setBillInfo] = useState({ t: '', s: '', fn: '', i: '', fp: '' });

  const handleChange = (field, event) => {
    setBillInfo({ ...billInfo, [field]: event.target.value });
  };

  const getManual = () => {
    return (
      <>
        <Grid item align="center" xs={2}>
            <TextField
              label="Дата и время"
              onChange={(e) => handleChange('t', e)}
              value={billInfo.t}
              placeholder="2020-01-01T12:34:00"
              //moment(requisites.t).format('YYYY.MM.DD HH:mm')
            />
        </Grid>
        <Grid item align="center" xs={2}>
            <TextField
              label="Сумма"
              onChange={(e) => handleChange('s', e)}
              value={billInfo.s}
            />
        </Grid>
        <Grid item xs={2}>
            <TextField
              label="ФН"
              onChange={(e) => handleChange('fn', e)}
              value={billInfo.fn}
            />
        </Grid>
        <Grid item xs={2}>
            <TextField
              label="ФД"
              onChange={(e) => handleChange('i', e)}
              value={billInfo.i}
            />
        </Grid>
        <Grid item xs={2}>
            <TextField
              label="ФП"
              onChange={(e) => handleChange('fp', e)}
              value={billInfo.fp}
            />
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid item align="center" xs={12}>
        <Button color="primary" onClick={() => setManualInput(!manualInput)}>
          {manualInput ? 'Включить сканирование QR-кода' : 'Включить ручной ввод'}
        </Button>
      </Grid>
      {
        manualInput ? getManual() : <QRScanner setData={setData} />
      }
      { 
        (billInfo.t && billInfo.s && billInfo.fn && billInfo.i && billInfo.fp)
        ? (
          <Grid item align="center" xs={12}>
            <Button color="primary" onClick={() => setData(billInfo)}>
              Поиск
            </Button>
          </Grid>
          )
        : null
      }
    </>
  );
}