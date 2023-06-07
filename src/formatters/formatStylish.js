import _ from 'lodash';

const stylish = (status, keyToFormat, valueToFormat, depth, valueToFormat2) => {
  const iter = (data, newDepth) => {
    if (!_.isObject(data)) return `${data}`;

    const lines = Object.entries(data).map(([key, value]) => {
      const preparedValue = iter(value, newDepth + 1);
      const indent = ' '.repeat(newDepth * 4);
      return `${indent}${key}: ${preparedValue}`;
    });

    const outIndent = ' '.repeat((newDepth * 4) - 4);
    const rawResult = ['{', ...lines, `${outIndent}}`].join('\n');
    return rawResult;
  };

  const initialIndent = ' '.repeat(depth * 4 - 2);

  switch (status) {
    case 'removal':
      return `${initialIndent}- ${keyToFormat}: ${iter(valueToFormat, depth + 1)}`;
    case 'addition':
      return `${initialIndent}+ ${keyToFormat}: ${iter(valueToFormat, depth + 1)}`;
    case 'noChange':
      return `${initialIndent}  ${keyToFormat}: ${iter(valueToFormat, depth + 1)}`;
    case 'update':
      return [`${initialIndent}- ${keyToFormat}: ${iter(valueToFormat, depth + 1)}`, `${initialIndent}+ ${keyToFormat}: ${iter(valueToFormat2, depth + 1)}`].join('\n');
    default:
      return iter(valueToFormat, depth);
  }
};

export default stylish;

// НАСТАЛО ВРЕМЯ ВСЕ ПЕРЕПИСАТЬ К ЧЕРТОВОЙ МАТЕРИ
// const stylish = (valueToFormat, depth) => {
//   const iter = (data, newDepth) => {
//     if (!_.isObject(data)) return `${data}`;

//     const lines = Object.entries(data).map(([key, value]) => {
//       const preparedValue = iter(value, newDepth + 1);
//       const indent = ' '.repeat(newDepth * 4);
//       return `${indent}${key}: ${preparedValue}`;
//     });

//     const outIndent = ' '.repeat((newDepth * 4) - 4);
//     const rawResult = ['{', ...lines, `${outIndent}}`].join('\n');
//     return rawResult;
//   };

//   return iter(valueToFormat, depth);
// };
