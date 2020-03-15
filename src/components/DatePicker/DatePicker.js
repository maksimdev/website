import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <KeyboardDatePicker
        disableToolbar
        autoOk={true}
        variant="inline"
        format="yyyy/MM/dd"
        margin="normal"
        id="date-picker-inline"
        value={props.value}
        onChange={props.onChange}
        KeyboardButtonProps={{
        'aria-label': 'change date',
        }}
      />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}