import { arrayToOptions } from './ReactSelectHelper';

describe('helpers/ReactSelectHelper', () => {
  it('should return a valid array of options', () => {
    const array = [
      { _id: 1, char: 'a' },
      { _id: 2, char: 'b' },
      { _id: 3, char: 'c' },
      { _id: 4, char: 'd' },
      { _id: 5, char: 'e' },
    ];

    const options = arrayToOptions({ array, labelKey: 'char' });

    expect(options).toHaveLength(array.length);
    options.forEach(({ value, label }, index) => {
      expect(value).toBe(array[index]._id);
      expect(label).toBe(array[index].char);
    });
  });
});
