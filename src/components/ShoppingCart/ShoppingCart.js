import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from "react-router-dom";

export function ShoppingCart(props) {
  const { id } = useParams();
  console.log('props: ', props)
return <div>HELLO{id}</div>
}

// import React, { useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { useParams } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import LinearProgress from '@material-ui/core/LinearProgress';

// import Checkbox from '../CheckBox/CheckBox';

// const mapStateToProps = state => ({
//   isLoading: state.shoppingList.isLoading,
//   lists: state.shoppingList.lists,
//   error: state.shoppingList.error,
// });

// const mapDispachToProps = dispatch => {
//   getListById: () => dispatch(loadShopingListById())
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 600,
//     backgroundColor: theme.palette.background.paper,
//     margin: 'auto',
//   },
// }));

// function findListById(lists) {
//   const { id } = useParams();
//   console.log('id: ', id);
//   console.log('lists: ', lists);
//   const list = lists.find(item => item.id == id )
//   console.log('obj: ', list);
// }

// function createList(arr) {
//   return (
//     <Fragment>
//       <List>
//         {console.log('lists: ', arr)}
//         { arr.map(item => {
//           return(
//             <ListItem button key={item.id}>
//               <Checkbox />
//               <ListItemText primary={item.name} />
//             </ListItem>
//           )
//         })}
//       </List>
//       <Divider />
//     </Fragment>  
//   )
// }

// function ShoppingCart(props) {
//   const classes = useStyles();
//   useEffect(() => {
//     getListById()
//   }, [])
//   // getListById(lists);
//   {console.log('props: ', props )}
//   return (
//     <div className={classes.root}>
//       {/* { isLoading ? <LinearProgress /> : createList(lists) } */}
//     </div>
//   );
// }

export default connect(null, null)(ShoppingCart);