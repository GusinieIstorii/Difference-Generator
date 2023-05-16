import _ from 'lodash';
import getData from './parser.js';
// import { cwd } from 'node:process';

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
      return `${acc}   - ${key}: ${value1} \n`;
    }
    if (!file1HasKey && file2HasKey) {
      return `${acc}   + ${key}: ${value2} \n`;
    }
    if (file1HasKey && file2HasKey) {
      if (value1 === value2) {
        return `${acc}     ${key}: ${value1} \n`;
      }
      return `${acc}   - ${key}: ${value1} \n   + ${key}: ${value2} \n`;
    }
    return acc;
  }, '');
  console.log(`{\n${result}}`);
  return `{\n${result}}`;
};

// console.log(genDiff(
// '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file1.json',
// '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file2.json'));
export default genDiff;
