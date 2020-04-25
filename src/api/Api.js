const URL = 'https://52mezyyznb.execute-api.us-east-1.amazonaws.com';;//'http://localhost:3000';//'https://2rjrexhdd0.execute-api.us-east-1.amazonaws.com';

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
    getReceipts: () => customFetch(true, 'GET', '/dev/receipts'),
    createReceipt: receipt => customFetch(true, 'POST', '/dev/receipt', receipt),
    loadReceipt: id => customFetch(true, 'GET', `/dev/receipts/${id}`),
    getStatistic: (year, month) => customFetch(true, 'GET', `/dev/statistic?year=${year}&month=${month}`),
    getShopingLists: () => customFetch(true, 'GET', '/dev/shoppingLists'),
    addList: title => customFetch(true, 'POST', `/dev/shoppingList`, { title }),
    deleteList: id => customFetch(true, 'DELETE', `/dev/shoppingList?id=${id}`),

    //old
    getCategories: () => customFetch(true, 'GET', '/dev/categories'), 
    getPurchases: date => customFetch(true, 'GET', `/dev/purchases?date=${date}`),
    createPurchase: purchase => customFetch(true, 'POST', '/dev/purchase', purchase),
    updatePurchase: purchase => customFetch(true, 'PUT', '/dev/purchase', purchase),
    removePurchase: id => customFetch(true, 'DELETE', '/dev/purchase'),
    checkBill: (fn, fd, fp, time, sum) => customFetch(true, 'GET', `/dev/checkbill?fn=${fn}&fd=${fd}&fp=${fp}&time=${time}&sum=${sum}`),
    getBill: (fn, fd, fp) => customFetch(true, 'GET', `/dev/bill?fn=${fn}&fd=${fd}&fp=${fp}`),
    saveBill: (fn, fd, fp) => customFetch(true, 'GET', `/dev/savebill?fn=${fn}&fd=${fd}&fp=${fp}`)
};

const mockAPIRequest = (data, ms) => (new Promise(function(res, rej){
  setTimeout(() => res(data), ms)
}));


// export const getAllShopingLists = () => (mockAPIRequest([
//     {
//       listId: 1,
//       listTitle: 'На дачу',
//       timestamp: '2020-03-20 14:23:00',
//       items: [
//         {
//           id: 1,
//           name: 'Картоха',
//           category: 'Еда',
//           amount: '2000',
//           status: false
//         },
//         {
//           id: 2,
//           name: 'Маркошка',
//           category: 'Еда',
//           amount: '1500',
//           status: false
//         }
//       ]
//     },
//     {
//       listId: 2,
//       listTitle: 'Домой',
//       timestamp: '2020-03-20 14:23:00',
//       items: [
//         {
//           id: 1,
//           name: 'Молоко',
//           category: 'Еда',
//           amount: '2',
//           status: false
//         },
//         {
//           id: 2,
//           name: 'Хлеб',
//           category: 'Еда',
//           amount: '1',
//           status: false
//         }
//       ]
//     },
//   ], 1000))


export const getShopingCart = () => mockAPIRequest({
  listId: 1,
  listTitle: 'На дачу',
  timestamp: '2020-03-20 14:23:00',
  items: [
    {
      id: 1,
      name: 'Картоха',
      category: 'Еда',
      amount: '2 кг',
      status: false
    },
    {
      id: 2,
      name: 'Маркошка',
      category: 'Еда',
      amount: '1,5 кг',
      status: false
    },
    {
      id: 3,
      name: 'Сыр',
      category: 'Еда',
      amount: '0,5 кг',
      status: false
    },
    {
      id: 4,
      name: 'Яйца',
      category: 'Еда',
      amount: '30 шт',
      status: false
    },
    {
      id: 5,
      name: 'Шоколадка',
      category: 'Еда',
      amount: '1 шт',
      status: false
    }
  ]
}, 2000)