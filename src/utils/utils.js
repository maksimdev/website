import moment from 'moment';

export const convertDate = (date) => moment(date).format("DD.MM.YYYY HH:mm"); 
export const convertValueToMoneyFormat = (value) => `${value}`.slice(0, (`${value}`.length) - 2) + '.' + `${value}`.slice(-2);
export const mockAPIRequest = (data, ms, isRejected, rejectedData) => (new Promise(function(res, rej){
  setTimeout(() => !isRejected ? res(data) : rej(rejectedData), ms)
}));