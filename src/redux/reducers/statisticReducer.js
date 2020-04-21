import { ACTIONS } from '../../constants/constants';

export const loadStatistic = () => ({
  type: ACTIONS.LOADING_STATISTIC
});

export const loadStatisticSuccess = (statistic) => ({
  type: ACTIONS.LOADING_STATISTIC_SUCCESS,
  payload: { statistic }
});

export const loadStatisticError = (error) => ({
  type: ACTIONS.LOADING_STATISTIC_ERROR,
  payload: { error }
});

export const setDate = (date) => ({
  type: ACTIONS.SET_DATE,
  payload: { date }
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
    case ACTIONS.SET_DATE:
      return { ...state, isLoading: true, error: '', data: { ...state.data, ...action.payload } }
    case ACTIONS.LOADING_STATISTIC:
      return { ...state, isLoading: true, error: '' }
    case ACTIONS.LOADING_STATISTIC_SUCCESS:
      return { ...state, isLoading: false,  data: { ...state.data, ...action.payload.statistic } }
    case ACTIONS.LOADING_STATISTIC_ERROR:
      return { statistic: {}, isLoading: false,  error: action.payload.error }
    default:
      return state
  }
}

export default statisticReducer