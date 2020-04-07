export const LOADING_STATISTIC = 'LOADING_STATISTIC';
export const LOADING_STATISTIC_SUCCESS = 'LOADING_STATISTIC_SUCCESS';
export const LOADING_STATISTIC_ERROR = 'LOADING_STATISTIC_ERROR';

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

const initState = {
  statistic: {},
  isLoading: false,
  error: ''
};

const statisticReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_STATISTIC:
      return { ...state, isLoading: true, error: '' }
    case LOADING_STATISTIC_SUCCESS:
      return { ...state, isLoading: false,  statistic: action.payload.statistic }
    case LOADING_STATISTIC_ERROR:
      return { statistic: {}, isLoading: false,  error: action.payload.error }
    default:
      return state
  }
}

export default statisticReducer