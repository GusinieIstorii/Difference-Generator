import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (dataToFormat) => {
  const iter = (data, path = '') => {
    const lines = data.map((obj) => {
      const currentPath = path ? `${path}.${obj.key}` : obj.key;
      //   const value = (typeof obj.value === 'object') ? '[complex value]' : obj.value;
      //   const valueBefore = !_.isObject(obj.valueBefore) ? obj.valueBefore : '[complex value]';
      //   const valueAfter = !_.isObject(obj.valueAfter) ? obj.valueAfter : '[complex value]';
      let line;

      switch (obj.type) {
        case 'nested': {
          return iter(obj.children, currentPath);
        }
        case 'removal':
          line = `Property '${currentPath}' was removed`;
          break;
        case 'addition':
          line = `Property '${currentPath}' was added with value: ${stringify(obj.value)}`;
          break;
        case 'noChange':
          line = 'No change';
          break;
        case 'update':
          line = `Property '${currentPath}' was updated. From ${stringify(obj.valueBefore)} to ${stringify(obj.valueAfter)}`;
          break;
        default:
          line = 'No change';
      }
      return line;
    });

    const filteredLines = lines.filter((line) => line !== 'No change');
    const result = [...filteredLines].join('\n');
    return result;
  };

  return iter(dataToFormat);
};

export default plain;

// [
//     {
//       key: 'common',
//       type: 'nested',
//       children: [
//         {
//             key: 'follow',
//             type: 'addition',
//             value: false
//         },
//         {
//             key: 'settings3',
//             type: 'update',
//             valueBefore: true,
//             valueAfter: null
//         },
//         {
//             key: 'settings5',
//             type: 'addition',
//             value: { key: 'key5', value: 'value5' }
//         }
//       ]
//     },
//     {
//       key: 'group2',
//       type: 'removal',
//       value: { abc: 12345, deep: { key: 'key5', value: 'value5' } }
//     },
//     {
//       key: 'group3',
//       type: 'addition',
//       value: { fee: 100500 }
//     }
//   ]

// добавить ребенка без изменений
