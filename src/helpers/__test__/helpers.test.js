import { numberWithCommas } from '../helpersNumber';
import { createDataArray, updateDataArray } from '../helpersBookorder';

describe('Helpers Number formatting', () => {
  it('number 0 should be correctly formatted', () => {
    const expected = '0';

    const result = numberWithCommas(0);
    expect(result).toBe(expected);
  });

  it('number 13256.89 should be correctly formatted', () => {
    const expected = '13,256.89';

    const result = numberWithCommas(13256.89);
    expect(result).toBe(expected);
  });
});

describe('Helpers Bookorder array manipulation', () => {
  // let setupArray;
  // beforeAll(() => {
  //   setupArray = [
  //     { price: 101, size: 100, total: 100 },
  //     { price: 100.5, size: 100, total: 200 },
  //     { price: 100, size: 50, total: 250 },
  //   ];
  // });

  it('create: array items should be converted to objets', () => {
    const expected = [{ price: 0, size: 0, total: 0 }];
    const array = [[0, 0]];

    const result = createDataArray(array);

    expect(result).toMatchObject(expected);
  });

  it('create: should return formatted and ordered array of objects', () => {
    const expected = [
      { price: 100.5, size: 100, total: 100 },
      { price: 100, size: 50, total: 150 },
    ];
    const array = [
      [100, 50],
      [100.5, 100],
    ];

    const result = createDataArray(array);

    expect(result).toMatchObject(expected);
  });

  it('update: delta already exist, update size and totals for array', () => {
    const expected = [
      { price: 101, size: 100, total: 100 },
      { price: 100.5, size: 20, total: 120 },
      { price: 100, size: 50, total: 170 },
    ];
    let arr = [
      { price: 101, size: 100, total: 100 },
      { price: 100.5, size: 100, total: 200 },
      { price: 100, size: 50, total: 250 },
    ];
    const delta = [100.5, 20];

    const result = updateDataArray(delta, arr);

    expect(result).toMatchObject(expected);
  });

  it('update: delta already exist with size of 0, remove entry update totals', () => {
    const expected = [
      { price: 101, size: 100, total: 100 },
      { price: 100, size: 50, total: 150 },
    ];
    let arr = [
      { price: 101, size: 100, total: 100 },
      { price: 100.5, size: 100, total: 200 },
      { price: 100, size: 50, total: 250 },
    ];
    const delta = [100.5, 0];

    const result = updateDataArray(delta, arr);

    expect(result).toMatchObject(expected);
  });

  it('update: delta doesnt exist, add delta to array and update totals', () => {
    const expected = [
      { price: 102, size: 50, total: 50 },
      { price: 101, size: 100, total: 150 },
      { price: 100.5, size: 100, total: 250 },
      { price: 100, size: 50, total: 300 },
    ];

    let arr = [
      { price: 101, size: 100, total: 100 },
      { price: 100.5, size: 100, total: 200 },
      { price: 100, size: 50, total: 250 },
    ];

    const delta = [102, 50];

    const result = updateDataArray(delta, arr);
    expect(result).toMatchObject(expected);
  });
});
