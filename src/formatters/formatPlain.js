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

      switch (obj.type) {
        case 'nested': {
          return iter(obj.children, currentPath);
        }
        case 'removal':
          return `Property '${currentPath}' was removed`;
        case 'addition':
          return `Property '${currentPath}' was added with value: ${stringify(obj.value)}`;
        case 'noChange':
          return 'No change';
        case 'update':
          return `Property '${currentPath}' was updated. From ${stringify(obj.valueBefore)} to ${stringify(obj.valueAfter)}`;
        default:
          return 'error in type identification';
      }
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
