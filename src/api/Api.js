const URL = 'http://localhost:3000';;//'http://localhost:3000';//'https://2rjrexhdd0.execute-api.us-east-1.amazonaws.com';

const customFetch = (isSecure, method, path, body) => fetch(
  `${URL}${path}`, {
    method: method,
    headers: {
        ...isSecure ? ({'Authorization': 'Bearer ' + localStorage.getItem('token')}) : {},
        'Content-Type': 'application/json'
    },
    ...(method === 'POST' || method === 'PATCH' || method === 'PUT' ) ? ({
      body: JSON.stringify(body)
    }) : {}
  }).then((response) => response.status !== 204 ? response.json() : {}); //check it(error with 204 no content). It is not cool :-(
  
export const Api = {
    login: (user, password) => customFetch(true, 'POST', '/dev/login', { username: user, password }),
    createReceipt: receipt => customFetch(true, 'POST', '/dev/receipt', receipt),
    loadReceipt: id => customFetch(true, 'GET', `/dev/receipts/${id}`),
    getStatistic: (year, month) => customFetch(true, 'GET', `/dev/statistic?year=${year}&month=${month}`),
    getShopingLists: () => customFetch(true, 'GET', '/dev/shoppingLists'),
    addList: title => customFetch(true, 'POST', `/dev/shoppingList`, { title }),
    deleteList: id => customFetch(true, 'DELETE', `/dev/shoppingList?id=${id}`),
    editList: (id, title) => customFetch(true, 'PUT', `/dev/shoppingList?id=${id}`, { title }),
    getShopingCart: id => customFetch(true, 'GET', `/dev/shoppingList?id=${id}`),
    addItem: (listId, name, category, amount, status) => customFetch(
      true,
      'POST',
      `/dev/shoppingItem`,
      {name, category, amount, status, listId }
    ),
    deleteItem: id => customFetch(true, 'DELETE', `/dev/shoppingItem?id=${id}`),
    checkBill: (fn, fd, fp, time, sum) => customFetch(true, 'GET', `/dev/checkbill?fn=${fn}&fd=${fd}&fp=${fp}&time=${time}&sum=${sum}`),
    getBill: (fn, fd, fp) => customFetch(true, 'GET', `/dev/bill?fn=${fn}&fd=${fd}&fp=${fp}`),
    saveBill: (fn, fd, fp) => customFetch(true, 'GET', `/dev/savebill?fn=${fn}&fd=${fd}&fp=${fp}`)
};
