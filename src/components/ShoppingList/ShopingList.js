import React, {useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

import { EditItem } from '../EditItem/EditItem'
import { ListItemLink } from '../ListItemLinkComponent/ListItemLinkComponent'
import { loadShopingLists, addList, deleteList } from '../../redux/reducers/shoppingListReducer'

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

function ShopingList({getAllShopingLists, lists, addList, isLoading, deleteList}) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isFormLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  
  const classes = useStyles();
  useEffect(() => {
    getAllShopingLists()
  }, []);
  useEffect(() => {    
    setLoading(false);
    setFormVisible(false);
    setTitle('')
  }, [lists])

  const handleLoading = () => {
    setLoading(!isFormLoading);
    addList(title)
  };

  const cancelCreationList = () => {
    setFormVisible(false);
    setTitle('');
  };
  
  const createListOfLists = () => ( 
    <Fragment>
    <Button variant="contained" color="primary" onClick={() => setFormVisible(!isFormVisible)}>
      <PostAddIcon />
    </Button>
    { 
      isFormVisible
        ? <EditItem 
          onCheck={handleLoading}
          onCancel={cancelCreationList}
          isFormLoading={isFormLoading}
          title={title}
          setTitle={setTitle}/>
        : null
    }
    <List component="nav" aria-label="list of lists">
      { lists.map(({id, title}) => {
        return(
        <ListItemLink 
          id={id}
          key={id}
          to={'/shoppingList/' + id}
          primary={title}
          icon={<ListAltIcon />}
          deleteList={deleteList}
          editItem={<EditItem />}
        />
        )
      })}
    </List>
    <Divider />
  </Fragment>  
  );

  return (
    <div className={classes.root}>
      { isLoading ? <LinearProgress /> : createListOfLists() }
    </div>
  );
}

export default connect(mapStateToProps, mapDispachToProps)(ShopingList);