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
    getReceiptsRequests: () => customFetch(true, 'GET', '/dev/receiptsrequests'), 
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

