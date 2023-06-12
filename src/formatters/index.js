import plain from './formatPlain.js';
import stylish from './formatStylish.js';

const formatDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    // case 'json':
    //   return json(data);
    default:
      throw new Error('IDK this format');
  }
};

export default formatDiff;
