import _ from 'lodash';

const plain = (path, status, keyToFormat, valueToFormat, valueToFormat2) => {
  switch (status) {
    case 'removal':
      return 'was removed';
    case 'addition':
      return `Property ${path} was added with value: ${valueToFormat}`;
    case 'noChange':
      break;
    case 'update':
      return `was updated. From ${valueToFormat} to ${valueToFormat2}`;
    default:
      return 'seems like an error';
  }
  return 'error2';
};

export default plain;

// data - tree (object)
