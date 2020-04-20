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

const initState = {
  statistic: {},
  isLoading: false,
  error: ''
};

const statisticReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.LOADING_STATISTIC:
      return { ...state, isLoading: true, error: '' }
    case ACTIONS.LOADING_STATISTIC_SUCCESS:
      return { ...state, isLoading: false,  statistic: action.payload.statistic }
    case ACTIONS.LOADING_STATISTIC_ERROR:
      return { statistic: {}, isLoading: false,  error: action.payload.error }
    default:
      return state
  }
}

export default statisticReducer