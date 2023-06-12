import plain from './formatPlain.js';
import stylish from './formatStylish.js';
import json from './formatJson.js';

const formatDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error('IDK this format');
  }
};

export default formatDiff;
