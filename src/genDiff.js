import _ from 'lodash';

const genDiff = (fileParsed1, fileParsed2) => {
  const iter = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const allKeys = _.sortBy(_.union(keys1, keys2));

    const diff = allKeys.map((key) => {
      const preparedValue1 = data1[key];
      const preparedValue2 = data2[key];

      if (_.isObject(preparedValue1) && _.isObject(preparedValue2)) {
        return { key, type: 'nested', children: iter(preparedValue1, preparedValue2) };
      }

      const file1HasKey = Object.hasOwn(data1, key);
      const file2HasKey = Object.hasOwn(data2, key);

      if (file1HasKey && !file2HasKey) {
        return { key, value: preparedValue1, type: 'removed' };
      }

      if (!file1HasKey && file2HasKey) {
        return { key, value: preparedValue2, type: 'added' };
      }

      if (file1HasKey && file2HasKey) {
        if (preparedValue1 === preparedValue2) {
          return { key, value: preparedValue1, type: 'unchanged' };
        }
      }
      return {
        key, valueBefore: preparedValue1, valueAfter: preparedValue2, type: 'updated',
      };
    });
    return diff;
  };

  return iter(fileParsed1, fileParsed2);
};

export default genDiff;
