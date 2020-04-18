import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        autoOk={true}
        format="yyyy/MM/dd"
        id="date-picker-inline"
        value={props.value}
        onChange={props.onChange}
        KeyboardButtonProps={{
        'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}