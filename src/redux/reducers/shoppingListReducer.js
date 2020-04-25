import { ACTIONS } from '../../constants/constants';

export const loadShopingLists = () => ({
  type: ACTIONS.LOADING_SHOPING_LIST,
});

export const loadingShopingListsSuccess = lists =>({
  type: ACTIONS.LOADING_SHOPING_LIST_SUCCESS,
  lists
});

export const loadingShopingListsError = error =>({
  type: ACTIONS.LOADING_SHOPING_LIST_ERROR,
  error
});

export const addList = (title) => ({
  type: ACTIONS.ADD_LIST,
  title
})

export const addListSuccess = list => ({
  type: ACTIONS.ADD_LIST_SUCCESS,
  list
})

export const addListError = error => ({
  type: ACTIONS.ADD_LIST_ERROR,
  error
})

export const deleteList = id => ({
  type: ACTIONS.DELETE_LIST,
  id
});

export const deleteListSuccess = id => ({
  type: ACTIONS.DELETE_LIST_SUCCESS,
  id
});

export const deleteListError = error => ({
  type: ACTIONS.DELETE_LIST_ERROR,
  error
});

const deleteListById = (listId, lists) => (
  lists.filter(({ id }) => id !== listId )
)

const initState = {
    isLoading: false,
    lists: [],
    error: '',
};
  
const shoppingListReducer = (state = initState, action) => {
  switch(action.type) {
    case ACTIONS.LOADING_SHOPING_LIST:
      return { ...state, isLoading: true, error: '' }
    case ACTIONS.LOADING_SHOPING_LIST_SUCCESS:
      return { ...state, isLoading: false,  lists: action.lists }
    case ACTIONS.ADD_LIST_SUCCESS:
      return { ...state, lists: [ action.list, ...state.lists ] }
    case ACTIONS.ADD_LIST_ERROR:
      return { ...state, error: action.error.message }
    case ACTIONS.DELETE_LIST_SUCCESS:
      return {...state, lists: deleteListById(action.id, state.lists)}
    case ACTIONS.DELETE_LIST_ERROR:
      return { ...state, error: action.error.message }
    default:
      return state
  }
}
  
export default shoppingListReducer