export const LOADING_RECEIPTS = 'LOADING_RECEIPTS';
export const LOADING_RECEIPTS_SUCCESS = 'LOADING_RECEIPTS_SUCCESS';
export const LOADING_RECEIPTS_ERROR = 'LOADING_RECEIPTS_ERROR';

export const loadReceipts = () => ({
  type: LOADING_RECEIPTS
});

export const loadReceiptsSuccess = (list) => ({
  type: LOADING_RECEIPTS_SUCCESS,
  payload: { list }
});

export const loadReceiptsError = (error) => ({
  type: LOADING_RECEIPTS_ERROR,
  payload: { error }
});

const initState = {
  list: [],
  isLoading: false,
  error: ''
};

const receiptsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_RECEIPTS:
      return { ...state, isLoading: true, error: '' }
    case LOADING_RECEIPTS_SUCCESS:
      return { ...state, isLoading: false,  list: action.payload.list }
    case LOADING_RECEIPTS_ERROR:
      return { list: [], isLoading: false,  error: action.payload.error }
    default:
      return state
  }
}

export default receiptsReducer