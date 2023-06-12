import _ from 'lodash';

const stringify = (valueToStringify, newDepth) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) return `${data}`;

    const lines = Object.entries(data).map(([key, value]) => {
      const preparedValue = iter(value, depth + 1);
      const indent = ' '.repeat(depth * 4 + 4);
      return `${indent}${key}: ${preparedValue}`;
    });

    const outIndent = ' '.repeat((depth * 4));
    const rawResult = ['{', ...lines, `${outIndent}}`].join('\n');
    return rawResult;
  };

  return iter(valueToStringify, newDepth);
};

const stylish = (valueToFormat) => {
  const iter = (data, depth) => {
    const lines = data.map((obj) => {
      const spaceCount = depth * 4 - 2;
      const indent = ' '.repeat(spaceCount);

      switch (obj.type) {
        case 'nested': {
          return `${indent}  ${obj.key}: ${iter(obj.children, depth + 1)}`;
        }
        case 'removal':
          return `${indent}- ${obj.key}: ${stringify(obj.value, depth)}`;
        case 'addition':
          return `${indent}+ ${obj.key}: ${stringify(obj.value, depth)}`;
        case 'noChange':
          return `${indent}  ${obj.key}: ${stringify(obj.value, depth)}`;
        case 'update':
          return `${indent}- ${obj.key}: ${stringify(obj.valueBefore, depth)}\n${indent}+ ${obj.key}: ${stringify(obj.valueAfter, depth)}`;
        default:
          return 'IDK the case';
      }
    });

    const outIndent = ' '.repeat((depth * 4) - 4);
    const rawResult = ['{', ...lines, `${outIndent}}`].join('\n');
    return rawResult;
  };

  return iter(valueToFormat, 1);
};

export default stylish;
