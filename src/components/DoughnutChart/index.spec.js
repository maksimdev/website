import { aggregateData, combineCategoryAndCostsToArrOfObj } from './Chart.js';

describe(`Chart's utils`, () => {
  
    it('Should aggregate date', () => {
        const data = [
            {
                category_id: 1,
                cost: 15
            },
            {
                category_id: 1,
                cost: 150,
            },
            {
                category_id: 2,
                cost: 300,
            },
            {
                category_id: 3,
                cost: 520,
            }              
        ];
        const result = {
            1: 165,
            2: 300,
            3: 520
        }
        expect(aggregateData(data)).toEqual(result);
    });
  
  });