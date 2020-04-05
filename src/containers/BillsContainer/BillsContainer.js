import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import QRScanner from "../../components/QRScanner/QRScanner";
import Stepper from "../../components/Stepper/Stepper";

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function() {
  const classes = useStyles();

  return (
    <div>
      <Stepper />
    </div>
  );
};
