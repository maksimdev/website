import { ACTIONS } from '../../constants/constants';

export const loadShopingLists = () => ({
  type: ACTIONS.LOADING_SHOPING_LIST,
});

export const loadingShopingListsSuccess = (lists) =>({
  type: ACTIONS.LOADING_SHOPING_LIST_SUCCESS,
  lists
});

export const loadingShopingListsError = (error) =>({
  type: ACTIONS.LOADING_SHOPING_LIST_ERROR,
  error
});

export const loadShopingListById = () => ({
  type: ACTIONS.LOADING_SHOPING_LIST_BY_ID,
});



const initState = {
    isLoading: false,
    lists: [],
    error: '',
    listById: {},
};
  
const shoppingListReducer = (state = initState, action) => {
  switch(action.type) {
    case ACTIONS.LOADING_SHOPING_LIST:
      return { ...state, isLoading: true, error: '' }
    case ACTIONS.LOADING_SHOPING_LIST_SUCCESS:
      return { ...state, isLoading: false,  lists: action.lists }
    case ACTIONS.LOADING_SHOPING_LIST_BY_ID:
      return { ...state, isLoading: true, error: '' }

    default:
      return state
  }
}
  
export default shoppingListReducer