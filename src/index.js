import fs from 'fs';
import path from 'node:path';
import parse from './parser.js';
import genDiff from './genDiff.js';
import formatDiff from './formatters/index.js';

const getPath = (filePath) => (filePath.startsWith('/') ? filePath : path.resolve(filePath));

const getData = (file) => {
  const filePath = getPath(file);
  const data = fs.readFileSync(filePath);
  return data;
};

const getFormattedDiff = (file1, file2, format = 'stylish') => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const extName1 = path.extname(file1);
  const extName2 = path.extname(file2);
  const fileParsed1 = parse(data1, extName1);
  const fileParsed2 = parse(data2, extName2);
  const diff = genDiff(fileParsed1, fileParsed2);
  const formattedDiff = formatDiff(diff, format);
  return formattedDiff;
};

export default getFormattedDiff;

// console.log(getFormattedDiff(
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file3.json',
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file4.json'
// ));
