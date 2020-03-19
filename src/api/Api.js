const URL = 'https://67cc2d25ba.execute-api.us-east-1.amazonaws.com';

export const Api = {
    getStatistic: () => fetch(`${URL}/dev/statistic`)
        .then((response) => response.json()),
    getCategories: () => fetch(`${URL}/dev/categories`)
        .then((response) => response.json()),
    getPurchases: (date) => fetch(`${URL}/dev/purchases?date=${date}`)
        .then((response) => response.json()),
    createPurchase: purchase => fetch(
        `${URL}/dev/purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(purchase)
        })
        .then((response) => response.json()),
    updatePurchase: purchase => fetch(
        `${URL}/dev/purchase?id=${purchase.id}`,
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(purchase)
        })
        .then((response) => response.json()),
    removePurchase: id => fetch(
        `${URL}/dev/purchase?id=${id}`,
        {
          method: 'DELETE'
        }
        )
        .then((response) => response.json())
};

