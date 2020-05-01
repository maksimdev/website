import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';

import './CreateItemForm.css';

export function CreateItemForm (
  { 
    onSubmit,
    onCancel,
    isFormLoading = null,
    value = '',
  }
) {
  const [title, setTitle] = useState(value);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <ListItem selected={true}>
      <TextField
        className="title"
        label="Название"
        variant="outlined"
        size="small"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        className="amount"
        label="Кол-во"
        variant="outlined"
        size="small"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <TextField
        className="amount"
        select
        value={unit}
        onChange={handleChange}
        variant="outlined"
        size="small"
      >
        {['кг', 'шт', 'л'].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
        { 
          isFormLoading
            ? <CircularProgress size={30} className="spinner" />
            : <ButtonGroup variant="text" color="default" aria-label="text primary button group">
              <Button onClick={() => onSubmit(title, amount, null, false) }>
                <CheckIcon />
              </Button>
              <Button onClick={() => onCancel(false) }
              >
                <CloseIcon />
              </Button>
            </ButtonGroup>
        }
    </ListItem>
  )
}