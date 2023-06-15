import plain from './formatPlain.js';
import stylish from './formatStylish.js';
import json from './formatJson.js';

const format = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`Unknown format name: ${formatName}`);
  }
};

export default format;
