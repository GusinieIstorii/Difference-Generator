// import _ from 'lodash';

const plain = (dataToFormat) => {
  const iter = (data) => {

    const lines = data.map((obj) => {
      const { key } = obj;
      let line;
      switch (obj.type) {
        case 'nested': {
          // const path = acc + obj.key;
          return iter(obj.children);
        }
        case 'removal':
          line = `Property ${key} was removed`;
          break;
        case 'addition':
          line = `Property ${key} was added with value: ${obj.value}`;
          break;
        case 'noChange':
          line = 'No change';
          break;
        case 'update':
          line = `Propery ${key} was updated. From ${obj.valueBefore} to ${obj.valueAfter}`;
          break;
        default:
          line = 'seems like an error';
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
