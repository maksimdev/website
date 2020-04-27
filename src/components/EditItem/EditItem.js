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

import './EditItem.css';

export function EditItem(
  { 
    onCheck,
    onCancel,
    lable = 'Название',
    isFormLoading=null,
    title = '',
    setTitle = null
  }
) {  
  return (
    <ListItem selected={true}>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <TextField 
        id="outlined-basic"
        label={lable}
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(event.target.value)}
      />
        { 
          isFormLoading
            ? <CircularProgress size={30} className="spinner" />
            : <ButtonGroup variant="text" color="default" aria-label="text primary button group">
              <Button onClick={() => onCheck()}>
                <CheckIcon />
              </Button>
              <Button onClick={() => onCancel()}
              >
                <CloseIcon />
              </Button>
            </ButtonGroup>
        }
    </ListItem>
  )
}