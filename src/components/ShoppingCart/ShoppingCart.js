import React, { useEffect, Fragment } from 'react';
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

function createCart(items, handleChange) {
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
            </ListItem>
          )
        })}
      </List>
    </Fragment>  
  )
}

function ShoppingCart({ getShoppingCart, list, isLoading, handleChange}) {
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    getShoppingCart(id)
  }, [])
  const pickedItems = list.items.filter(({ status }) => status === true);
  const unpickedItems = list.items.filter(({ status }) => status === false);

  return (
    <div className={classes.root}>
      { isLoading
        ? <LinearProgress />
        : <Fragment>
            <Button variant="contained" color="primary" >
              <AddIcon />
            </Button>
            {createCart(unpickedItems, handleChange)}
            <Divider />
            {createCart(pickedItems, handleChange)}
          </Fragment>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispachToProps)(ShoppingCart);