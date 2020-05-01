import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { loadShopingCart, changeFlag, addItem, deleteItem } from '../../redux/reducers/ShoppingCartReduser';
import { CreateItemForm } from '../CreateItemForm/CreateItemForm';

const mapStateToProps = state => ({
  isLoading: state.shoppingCart.isLoading,
  list: state.shoppingCart.list,
  error: state.shoppingCart.error,
});

const mapDispachToProps = dispatch => ({
  getShoppingCart: id => dispatch(loadShopingCart(id)),
  handleChange: (id, status) => dispatch(changeFlag(id, status)),
  addItem: (title, amount, category, status, listId) => 
    dispatch(addItem(title, amount, category, status, listId)),
  deleteItem: id => dispatch(deleteItem(id))
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
}));

function ShoppingCart({ getShoppingCart, list, isLoading, handleChange, addItem, deleteItem}) {
  const classes = useStyles();
  const { id } = useParams();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isFormLoading, setFormLoading] = useState(false);

  useEffect(() => {
    getShoppingCart(id)
  }, [])
  useEffect(() => {
    setFormLoading(false);
    setFormVisible(false);
  }, [list])

  const pickedItems = list.items.filter(({ status }) => status === true);
  const unpickedItems = list.items.filter(({ status }) => status === false);

  const createCart = (items) => {
    const deleteItemById = (id, event) => {
      event.stopPropagation();
      deleteItem(id)
      setFormLoading(!isFormLoading)
    }
    
    return (
      <Fragment>
        <List>
          { items.map(({id, status, name, amount}) => {
            return(
              <ListItem button key={id} selected={status} onClick={()=>handleChange(id, status)}>
                  <Checkbox
                    checked={status}
                    color="default"
                  />
                <ListItemText primary={name} />
                <span>{amount}</span>
                {isFormLoading
                  ? <CircularProgress size={30} className="spinner" />
                  : <Button onClick={deleteItemById.bind({}, id)}>
                      <DeleteOutlineIcon />
                    </Button>
                }
              </ListItem>
            )
          })}
        </List>
      </Fragment>  
    )
  }
  

  const saveItem = (title, amount, category, status) => {    
    addItem(title, amount, category, status, id);
    setFormLoading(!isFormLoading)
  };

  const cancelAdding = (isFormVisible) => {
    setFormVisible(isFormVisible)
  };

  return (
    <div className={classes.root}>
      { isLoading
        ? <LinearProgress />
        : <Fragment>
            <Button variant="contained" color="primary" onClick={() => setFormVisible(!isFormVisible)} >
              <AddIcon />
            </Button>
            { 
              isFormVisible
                ? <CreateItemForm onSubmit={saveItem} onCancel={cancelAdding} isFormLoading={isFormLoading}/>
                : null
            }
            {createCart(unpickedItems, handleChange, deleteItem)}
            <Divider />
            {createCart(pickedItems, handleChange, deleteItem)}
          </Fragment>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispachToProps)(ShoppingCart);