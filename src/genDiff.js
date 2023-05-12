import _ from 'lodash';
import fs from 'fs';
import path from 'node:path';
// import { cwd } from 'node:process';

const getPath = (filePath) => (filePath.startsWith('/') ? filePath : path.resolve(filePath));

const getData = (file) => {
  const filePath = getPath(file);
  const data = fs.readFileSync(filePath);
  const format = file.slice(-4);
  if (format === 'json') {
    return JSON.parse(data);
  }
  return file;
};

const genDiff = (file1, file2) => {
  const file1Parsed = getData(file1);
  const file2Parsed = getData(file2);
  const keys1 = Object.keys(file1Parsed);
  const keys2 = Object.keys(file2Parsed);
  const allKeys = (_.union(keys1, keys2)).sort();
  const result = allKeys.reduce((acc, key) => {
    const value1 = file1Parsed[key];
    const value2 = file2Parsed[key];
    const file1HasKey = Object.hasOwn(file1Parsed, key);
    const file2HasKey = Object.hasOwn(file2Parsed, key);
    if (file1HasKey && !file2HasKey) {
      return `${acc} - ${key}: ${value1} \n`;
    }
    if (!file1HasKey && file2HasKey) {
      return `${acc} + ${key}: ${value2} \n`;
    }
    if (file1HasKey && file2HasKey) {
      if (value1 === value2) {
        return `${acc}   ${key}: ${value1} \n`;
      }
      return `${acc} - ${key}: ${value1} \n + ${key}: ${value2} \n`;
    }
    return acc;
  }, '');
  console.log(result);
  return result;
};

// console.log(genDiff('/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file1.json', '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file2.json'));
export default genDiff;

// try to implement and then google how to compare two objects
