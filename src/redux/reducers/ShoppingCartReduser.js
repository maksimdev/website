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
  // console.log('item: ', item)
  item.status = !status;
  // const index = arr.indexOf(item);
  // console.log('index: ', index);
  // console.log('splice: ',arr.splice(index, 1, item));
  console.log('arr: ', arr);
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
      console.log(action.id, action.status, state.list.items);
      return {...state, list: {...state.list, items: filterArr(state.list.items, action.id, action.status)}}
      // func(id, status, items) => []
      // [{id:1, status: true}, {id: 2, status: true}, {id: 3, status: true}]
      // find(2) => {id: 2, status: true} => {id: 2, status: false}
      // [...[{id:1, status: true}, {id: 2, status: true}, {id: 3, status: true}], newObj ]
      // 1) взять итемы
      // 2) найти объект
      // 3) поменять в объекте статус
      // 4) вернуть итемы с измененным объектом
      //   - что нельзя сделать [...items, {измененный объект}] // будет два одинаковых объекта!
      //   - нужно вырезать объект изменить и вставить обратно

    default:
      return state
  }
}

export default shoppingCartReducer