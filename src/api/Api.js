export const Api = {
    getList: () => new Promise((resolve, reject) => {
        setTimeout(() => resolve([
            {id: 1, cost: 100, category: 1, date: ' 02/08/2020'},
            {id: 2, cost: 200, category: 10, date: ' 01/08/2020'}
        ]), 3000)
    }) 
}