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
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(obj.value)}`;
        case 'unchanged':
          return 'No change';
        case 'updated':
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
