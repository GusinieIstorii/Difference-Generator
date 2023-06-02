import _ from 'lodash';

const stylish = (valueToFormat, depth) => {
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

  return iter(valueToFormat, depth);
};

export default stylish;
