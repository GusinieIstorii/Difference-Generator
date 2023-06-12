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
      let line;

      switch (obj.type) {
        case 'nested': {
          return `${indent}  ${obj.key}: ${iter(obj.children, depth + 1)}`;
        }
        case 'removal':
          line = `${indent}- ${obj.key}: ${stringify(obj.value, depth)}`;
          break;
        case 'addition':
          line = `${indent}+ ${obj.key}: ${stringify(obj.value, depth)}`;
          break;
        case 'noChange':
          line = `${indent}  ${obj.key}: ${stringify(obj.value, depth)}`;
          break;
        case 'update':
          line = `${indent}- ${obj.key}: ${stringify(obj.valueBefore, depth)}\n${indent}+ ${obj.key}: ${stringify(obj.valueAfter, depth + 1)}`;
          break;
        default:
          line = 'IDK the case';
      }
      return line;
    });

    const outIndent = ' '.repeat((depth * 4) - 4);
    const rawResult = ['{', ...lines, `${outIndent}}`].join('\n');
    return rawResult;
  };

  return iter(valueToFormat, 1);
};

export default stylish;
