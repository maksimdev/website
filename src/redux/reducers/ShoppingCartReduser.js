import { ACTIONS } from '../../constants/constants';

export const loadShopingCart = (id) => ({
  type: ACTIONS.LOADING_SHOPING_CART,
  id,
});

export const loadingShopingCartSuccess = (list) =>({
  type: ACTIONS.LOADING_SHOPING_CART_SUCCESS,
  list
});

export const loadingShopingCartError = (error) =>({
  type: ACTIONS.LOADING_SHOPING_CART_ERROR,
  error
});

export const changeFlag = ({ id, status }) => ({
  type: ACTIONS.CHANGE_FLAG,
  id,
  status,
});

export const updateStatus = (id, status) => ({
  type: ACTIONS.UPDATE_STATUS,
  id,
  status,
});

export const addItem = (title, amount, category, status, shoppinglistid) => ({
  type: ACTIONS.ADD_ITEM,
  title,
  amount,
  category,
  status,
  shoppinglistid,
});

export const addItemSuccess = (item) => ({
  type: ACTIONS.ADD_ITEM_SUCCESS,
  item
});

export const addItemError = (error) =>({
  type: ACTIONS.ADD_ITEM_ERROR,
  error
});

export const deleteItem = id => ({
  type: ACTIONS.DELETE_ITEM,
  id
});

export const deleteItemSuccess = (id) => ({
  type: ACTIONS.DELETE_ITEM_SUCCESS,
  id
});

export const deleteItemError = (error) =>({
  type: ACTIONS.DELETE_ITEM_ERROR,
  error
});



function filterArr(arr, id, status) {
  const item = arr.find(item => item.id == id);
  item.status = status;
  return arr
}

const deleteItemById = (items, itemId) => (
  items.filter(({ id }) => id !== itemId )
);

const initState = {
  isLoading: false,
  list: {
    items: [],
  },
  error: '',
};

const shoppingCartReducer = (state = initState, action) => {
  // console.log('action: ', action);
  
  switch(action.type) {
    case ACTIONS.LOADING_SHOPING_CART:
      return { ...state, isLoading: true, error: '' }
    case ACTIONS.LOADING_SHOPING_CART_SUCCESS:
      return { ...state, isLoading: false,  list: action.list }
    case ACTIONS.LOADING_SHOPING_CART_ERROR:
      return { ...state, isLoading: false, error: action.error.message }
    case ACTIONS.CHANGE_FLAG:
      return {...state, list: {...state.list, items: filterArr(state.list.items, action.id, action.status)}}
    case ACTIONS.ADD_ITEM_SUCCESS:
      return {...state, list: {...state.list, items: [action.item, ...state.list.items]}}
    case ACTIONS.ADD_ITEM_ERROR:
      return { ...state, error: action.error.message }
    case ACTIONS.DELETE_ITEM_SUCCESS:
      return {...state, list: {...state.list, items: deleteItemById(state.list.items, action.id)}}
    case ACTIONS.DELETE_ITEM_ERROR:
      return { ...state, error: action.error.message }
    default:
      return state
  }
}

export default shoppingCartReducer