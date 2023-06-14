import fs from 'fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parse from './parser.js';
import genDiff from './genDiff.js';
import formatDiff from './formatters/index.js';

const getPath = (filepath) => path.resolve(cwd(), filepath);

const getData = (file) => {
  const filePath = getPath(file);
  const data = fs.readFileSync(filePath);
  return data;
};

const getFormattedDiff = (file1, file2, format = 'stylish') => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const data1Format = path.extname(file1).slice(1);
  const data2Format = path.extname(file2).slice(1);
  const fileParsed1 = parse(data1, data1Format);
  const fileParsed2 = parse(data2, data2Format);
  const diff = genDiff(fileParsed1, fileParsed2);
  const formattedDiff = formatDiff(diff, format);
  return formattedDiff;
};

export default getFormattedDiff;
