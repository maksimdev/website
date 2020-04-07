const URL = 'https://2rjrexhdd0.execute-api.us-east-1.amazonaws.com';

const customFetch = (isSecure, method, path, body) => fetch(
  `${URL}${path}`, {
    method: method,
    headers: {
        ...isSecure ? ({'Authorization': 'Bearer ' + localStorage.getItem('token')}) : {},
        'Content-Type': 'application/json'
    },
    ...(method === 'POST' || method === 'PATCH') ? ({
      body: JSON.stringify(body)
    }) : {}
  }).then((response) => response.json());

export const Api = {
    login: (user, password) => customFetch(true, 'POST', '/dev/login', { username: user, password }),
    getReceipts: () => Promise.resolve([
      {totalsum: 10000, shiftnumber: 20, datetime: '2020-03-20 14:23:00'},
      {totalsum: 5000, shiftnumber: 8, datetime: '2020-01-10 15:41:00'}
    ]), //mock
    getStatistic: () => customFetch(true, 'GET', '/dev/statistic'),
    getCategories: () => customFetch(true, 'GET', '/dev/categories'), 
    getPurchases: date => customFetch(true, 'GET', `/dev/purchases?date=${date}`),
    createPurchase: purchase => customFetch(true, 'POST', '/dev/purchase', purchase),
    updatePurchase: purchase => customFetch(true, 'PUT', '/dev/purchase', purchase),
    removePurchase: id => customFetch(true, 'DELETE', '/dev/purchase'),
    checkBill: (fn, fd, fp, time, sum) => customFetch(true, 'GET', `/dev/checkbill?fn=${fn}&fd=${fd}&fp=${fp}&time=${time}&sum=${sum}`),
    getBill: (fn, fd, fp) => customFetch(true, 'GET', `/dev/bill?fn=${fn}&fd=${fd}&fp=${fp}`),
    saveBill: (fn, fd, fp) => customFetch(true, 'GET', `/dev/savebill?fn=${fn}&fd=${fd}&fp=${fp}`)
};

