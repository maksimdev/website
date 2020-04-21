import moment from 'moment';
export const convertDate = (date) => moment(date).format("DD.MM.YYYY HH:mm"); 
export const convertValueToMoneyFormat = (value) => `${value}`.slice(0, (`${value}`.length) - 2) + '.' + `${value}`.slice(-2);