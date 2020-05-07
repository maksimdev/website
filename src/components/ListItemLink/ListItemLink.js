import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';

import { EditItem }  from '../EditItem/EditItem'

import './ListItemLink.css';

export function ListItemLink({ icon, primary, to, id, deleteList, editList }) {
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setEdit(false);
  }, [primary]);
  
  const onEditBtnClick = (event) => {
    event.preventDefault();
    setEdit(!isEdit);
  };

  const onDeleteBtnClick = (id, callback, event) => {
    event.preventDefault();
    setLoading(!isLoading);
    callback(id);
  };


  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  const saveEditBtn = (title, id) => {
    setLoading(!isLoading);
    editList(id, title);
  };

  const cancelEditBtn = () => {
    setEdit(!isEdit);
  };

  return (
    isEdit
    ? <EditItem
        onSubmit={saveEditBtn}
        onCancel={cancelEditBtn}
        shoppinglistid={id}
        lable={primary}
        isFormLoading={isLoading}
      />
    : <ListItem button component={renderLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        
        { isLoading
          ? <CircularProgress size={30} className="spinner"/>
          : <ButtonGroup variant="text" color="default" aria-label="text primary button group">
            <Button onClick={(event) => onEditBtnClick(event)}>
              <EditIcon />
            </Button>
            <Button onClick={onDeleteBtnClick.bind({}, id, deleteList)}>
              <DeleteOutlineIcon />
            </Button>
          </ButtonGroup>
        }
      </ListItem>
  )
}