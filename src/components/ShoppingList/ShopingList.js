import React, {useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom';


import { loadShopingLists } from '../../redux/reducers/shoppingListReducer'

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
}));

const mapStateToProps = state => ({
  isLoading: state.shoppingList.isLoading,
  lists: state.shoppingList.lists,
  error: state.shoppingList.error,
});

const mapDispachToProps = dispatch => ({
  getAllShopingLists: () => dispatch(loadShopingLists())
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <div>
      <ListItem button component={renderLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        <Button onClick={() => console.log('ok')}>
          <DeleteOutlineIcon />
        </Button>
      </ListItem> 
    </div>
  );
}

function createListOfLists(arr) {
  return (
    <Fragment>
      <Button variant="contained" color="primary" >
        <AddIcon />
      </Button>
      <List component="nav" aria-label="list of lists">
        { arr.map(item => {
          return(
            <ListItemLink key={item.listId} to={'/shoppingList/' + item.listId} primary={item.listTitle} icon={<ListAltIcon />} />
          )
        })}
      </List>
      <Divider />
    </Fragment>  
  )
}

function ShopingList({getAllShopingLists, lists, isLoading}) {
  const classes = useStyles();
  useEffect(() => {
    getAllShopingLists()
  }, [])
  return (
    <div className={classes.root}>
      { isLoading ? <LinearProgress /> : createListOfLists(lists) }
    </div>
  );
}

export default connect(mapStateToProps, mapDispachToProps)(ShopingList);