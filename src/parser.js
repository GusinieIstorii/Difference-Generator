// import fs from 'fs';
// import path from 'node:path';
import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }
  return 'parsing failed';
};

export default parse;

// const getPath = (filePath) => (filePath.startsWith('/') ? filePath : path.resolve(filePath));

// const getData = (file) => {
//   const filePath = getPath(file);
//   const data = fs.readFileSync(filePath);
//   const format = path.extname(file);
//   if (format === '.json') {
//     return JSON.parse(data);
//   }
//   if (format === '.yaml' || format === '.yml') {
//     return yaml.load(data);
//   }
//   return 'parsing failed';
// };

// export default getData;
