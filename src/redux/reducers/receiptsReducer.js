import { ACTIONS } from '../../constants/constants';

export const loadReceipts = () => ({
  type: ACTIONS.LOADING_RECEIPTS
});

export const loadReceiptsSuccess = (list) => ({
  type: ACTIONS.LOADING_RECEIPTS_SUCCESS,
  payload: { list }
});

export const loadReceiptsError = (error) => ({
  type: ACTIONS.LOADING_RECEIPTS_ERROR,
  payload: { error }
});

const initState = {
  list: [],
  isLoading: false,
  error: ''
};

const receiptsReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.LOADING_RECEIPTS:
      return { ...state, isLoading: true, error: '' }
    case ACTIONS.LOADING_RECEIPTS_SUCCESS:
      return { ...state, isLoading: false,  list: action.payload.list }
    case ACTIONS.LOADING_RECEIPTS_ERROR:
      return { list: [], isLoading: false,  error: action.payload.error }
    default:
      return state
  }
}

export default receiptsReducer