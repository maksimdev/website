const URL = 'https://eax6ihrnwd.execute-api.us-east-1.amazonaws.com';

export const Api = {
    getList: () => fetch(`${URL}/dev/purchases`)
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

