import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedResult = readFile('expectedResult.txt');
  expect(genDiff(file1, file2)).toEqual(expectedResult);
});

test('genDiff yml', () => {
  const file1 = getFixturePath('filepath1.yml');
  const file2 = getFixturePath('filepath2.yml');
  const expectedResult = readFile('expectedResult.txt');
  expect(genDiff(file1, file2)).toEqual(expectedResult);
});

test('genDiff recursive json', () => {
  const file1 = getFixturePath('file3.json');
  const file2 = getFixturePath('file4.json');
  const expectedResult = readFile('expectedResult2.txt');
  expect(genDiff(file1, file2)).toEqual(expectedResult);
});

test('genDiff recursive yml', () => {
  const file1 = getFixturePath('filepath3.yml');
  const file2 = getFixturePath('filepath4.yml');
  const expectedResult = readFile('expectedResult2.txt');
  expect(genDiff(file1, file2)).toEqual(expectedResult);
});
