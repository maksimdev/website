export const LOADING_STATISTIC = 'LOADING_STATISTIC';
export const LOADING_STATISTIC_SUCCESS = 'LOADING_STATISTIC_SUCCESS';
export const LOADING_STATISTIC_ERROR = 'LOADING_STATISTIC_ERROR';
export const SET_DATE = 'SET_DATE';
export const SET_STATISTIC_SUCCESS = 'SET_STATISTIC_SUCCESS';
export const SET_STATISTIC_ERROR = 'SET_STATISTIC_ERROR';

export const loadStatistic = () => ({
  type: LOADING_STATISTIC
});

export const loadStatisticSuccess = (statistic) => ({
  type: LOADING_STATISTIC_SUCCESS,
  payload: { statistic }
});

export const loadStatisticError = (error) => ({
  type: LOADING_STATISTIC_ERROR,
  payload: { error }
});

export const setDate = (date) => ({
  type: SET_DATE,
  payload: { date }
});

export const setStatisticSuccess = (data) => ({
  type: SET_STATISTIC_SUCCESS,
  payload: data
});

export const setStatisticError = (error) => ({
  type: SET_STATISTIC_ERROR,
  payload: { error }
});

const initState = {
  data: {
    date: new Date(),
    statistic: [],
    bills: []
  },
  isLoading: false,
  error: ''
};

const statisticReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, data: { ...state.data, date: action.payload.date }, isLoading: true }
    case SET_STATISTIC_SUCCESS:
      return { ...state, data: { ...state.data, ...action.payload }, isLoading: false }
    // case LOADING_STATISTIC:
    //   return { ...state, isLoading: true, error: '' }
    // case LOADING_STATISTIC_SUCCESS:
    //   return { ...state, isLoading: false,  statistic: action.payload.statistic }
    // case LOADING_STATISTIC_ERROR:
    //   return { statistic: {}, isLoading: false,  error: action.payload.error }
    default:
      return state
  }
}

export default statisticReducer