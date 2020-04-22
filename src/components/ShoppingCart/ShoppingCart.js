import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';

import { loadShopingCart, changeFlag } from '../../redux/reducers/ShoppingCartReduser';

const mapStateToProps = state => ({
  isLoading: state.shoppingCart.isLoading,
  list: state.shoppingCart.list,
  error: state.shoppingCart.error,
});

const mapDispachToProps = dispatch => ({
  getShoppingCart: id => dispatch(loadShopingCart(id)),
  handleChange: (id, status) => dispatch(changeFlag(id, status)),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
}));

function createCart(arr, handleChange) {
  return (
    <Fragment>
      <List>
        { arr.map(({id, status, name, amount}) => {
          return(
            <ListItem button key={id} selected={status} onClick={()=>handleChange(id, status)}>
                <Checkbox
                  checked={status}
                  color="default"
                />
              <ListItemText primary={name} />
              <span>{amount}</span>
            </ListItem>
          )
        })}
      </List>
    </Fragment>  
  )
}

function generateListOfPickedItems(items, handleChange) {
  const pickedItems = items.filter(({ status }) => status === true);
  return createCart(pickedItems, handleChange)
}

function generateListOfUnpickedItems(items, handleChange) {
  const unpickedItems = items.filter(item => item.status === false);
  return createCart(unpickedItems, handleChange)
};

function generateLists(items, handleChange) {
  return(
    <Fragment>
      {generateListOfUnpickedItems(items, handleChange)}
      <Divider />
      {generateListOfPickedItems(items, handleChange)}
    </Fragment>
  )
}

function ShoppingCart({ getShoppingCart, list, isLoading, handleChange}) {
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    getShoppingCart(id)
  }, [])
  console.log('cart: ', list.items)
  return (
    <div className={classes.root}>
      { isLoading ? <LinearProgress /> : generateLists(list.items, handleChange) }
    </div>
  );
}

export default connect(mapStateToProps, mapDispachToProps)(ShoppingCart);