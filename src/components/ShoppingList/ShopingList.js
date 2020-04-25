import React, {useEffect, useState, Fragment } from 'react';
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import './ShopingList.css'

import { loadShopingLists, addList, deleteList } from '../../redux/reducers/shoppingListReducer'

function handleLoading(addList, title, isFormLoading, setLoading) {
  setLoading(!isFormLoading);
  addList(title)
};

const createList = (title, setTitle, addList, isFormLoading, setLoading, deleteList) => (
  <ListItem selected={true}>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <TextField id="outlined-basic" label="Название" variant="outlined" size="small" value={title} onChange={(e) => setTitle(event.target.value)} />
      { 
        isFormLoading
          ? <CircularProgress size={30} className="spinner" />
          : <ButtonGroup variant="text" color="default" aria-label="text primary button group">
            <Button onClick={() => handleLoading(addList, title, isFormLoading, setLoading)}>
              <CheckIcon />
            </Button>
            <Button>
              <CloseIcon />
            </Button>
          </ButtonGroup>}
  </ListItem>
)

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
  getAllShopingLists: () => dispatch(loadShopingLists()),
  addList: title => dispatch(addList(title)),
  deleteList: id => dispatch(deleteList(id))
});

function onBtnClick(id, callback, event) {
  
  event.preventDefault();
  callback(id);
};

function ListItemLink({ icon, primary, to, deleteList, id, isFormLoading, setLoading}) {
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <ListItem button component={renderLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
        <ButtonGroup variant="text" color="default" aria-label="text primary button group">
          <Button onClick={event => onBtnClick(event, editList)}>
            <EditIcon />
          </Button>
          <Button onClick={onBtnClick.bind({}, id, deleteList)}>
            <DeleteOutlineIcon />
          </Button>
        </ButtonGroup>
    </ListItem>
  );
}

function createListOfLists( 
  arr,
  isFormVisible,
  setFormVisible,
  title,
  setTitle,
  addList,
  isFormLoading,
  setLoading,
  deleteList,
) {
  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={() => setFormVisible(!isFormVisible)}>
        <PostAddIcon />
      </Button>
      { 
        isFormVisible
          ? createList(title, setTitle, addList, isFormLoading, setLoading)
          : null
      }
      <List component="nav" aria-label="list of lists">
        { arr.map(({id, title}) => {
          return(
          <ListItemLink id={id} key={id} to={'/shoppingList/' + id} primary={title} icon={<ListAltIcon />} deleteList={deleteList} isFormLoading={isFormLoading} setLoading={setLoading} />
          )
        })}
      </List>
      <Divider />
    </Fragment>  
  )
}

function ShopingList({getAllShopingLists, lists, addList, isLoading, deleteList}) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [isFormLoading, setLoading] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    getAllShopingLists()
  }, []);
  useEffect(() => {    
    setLoading(false);
    setFormVisible(false);
    setTitle('')
  }, [lists])
  return (
    <div className={classes.root}>
      { 
        isLoading
          ? <LinearProgress />
          : createListOfLists(
            lists,
            isFormVisible,
            setFormVisible,
            title,
            setTitle,
            addList,
            isFormLoading,
            setLoading,
            deleteList,
          )
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispachToProps)(ShopingList);