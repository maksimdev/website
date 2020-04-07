import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function({ handleReset }) {
  return (
    <Grid item align="center" xs={12}>
      <Typography>
        Сохранение чека успешно завершено!
      </Typography>
      <Button onClick={handleReset} color="primary">
        Перейти к вводу следующего чека
      </Button>
    </Grid>
  );
}