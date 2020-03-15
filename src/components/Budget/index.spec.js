import { convertArrCategoriesToObj, addCategoriesToColumns } from './Budget.js';

describe(`Budget's utils`, () => {

  let categories;

  beforeEach(() => {
    categories = [{ id: 1, title: 'Food' }, { id: 3, title: 'Drinks' }];
  });

  it('Should convert array of categories to obj', () => {
    const result = { 1: 'Food', 3: 'Drinks' };
    expect(convertArrCategoriesToObj).toBeDefined();
    expect(convertArrCategoriesToObj(categories)).toEqual(result);
  });

  it('Should add categories to category column', () => {
    const columns = [
      {
        title: 'Категория',
        field: 'category_id',
        lookup: {}
      },
      { title: 'Сумма (руб.)', field: 'cost'},
      { title: 'Дата', field: 'date' }
    ]
    const result = [
      {
        title: 'Категория',
        field: 'category_id',
        lookup: { 1: 'Food', 3: 'Drinks' }
      },
      { title: 'Сумма (руб.)', field: 'cost'},
      { title: 'Дата', field: 'date' }
    ];
    expect(addCategoriesToColumns).toBeDefined();
    expect(addCategoriesToColumns(categories, columns)).toEqual(result);
  });
});