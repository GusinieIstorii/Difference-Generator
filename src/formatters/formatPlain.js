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
    const lines = data.flatMap((obj) => {
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
          return [];
        case 'updated':
          return `Property '${currentPath}' was updated. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
        default:
          throw new Error('error in type identification');
      }
    });

    const result = [...lines].join('\n');
    return result;
  };

  return iter(dataToFormat);
};

export default plain;
