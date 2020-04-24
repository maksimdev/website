import { ACTIONS } from '../../constants/constants';

export const loadShopingCart = () => ({
  type: ACTIONS.LOADING_SHOPING_CART,
});

export const loadingShopingCartSuccess = (list) =>({
  type: ACTIONS.LOADING_SHOPING_CART_SUCCESS,
  list
});

export const loadingShopingCartError = (error) =>({
  type: ACTIONS.LOADING_SHOPING_CART_ERROR,
  error
});

export const changeFlag = (id, status) => ({
  type: ACTIONS.CHANGE_FLAG,
  id,
  status,
})

function filterArr(arr, id, status) {
  const item = arr.find(item => item.id == id);
  item.status = !status;
  return arr
}

const initState = {
  isLoading: false,
  list: {
    items: [],
  },
  error: '',
};

const shoppingCartReducer = (state = initState, action) => {
  switch(action.type) {
    case ACTIONS.LOADING_SHOPING_CART:
      return { ...state, isLoading: true, error: '' }
    case ACTIONS.LOADING_SHOPING_CART_SUCCESS:
      return { ...state, isLoading: false,  list: action.list }
    case ACTIONS.LOADING_SHOPING_CART_ERROR:
      return { ...state, isLoading: false, error: action.error.message }
    case ACTIONS.CHANGE_FLAG:
      return {...state, list: {...state.list, items: filterArr(state.list.items, action.id, action.status)}}

    default:
      return state
  }
}

export default shoppingCartReducer