import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import getFormattedDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1json = getFixturePath('file3.json');
const file2json = getFixturePath('file4.json');
const file1yml = getFixturePath('filepath3.yml');
const file2yml = getFixturePath('filepath4.yml');
const expectedResultStylish = readFile('expectedResult2.txt');
const expectedResultPlain = readFile('plainFormatResult.txt');
const expectedResultJson = readFile('jsonFormatResult.json');

const jsonFilesStylishFormat = [file1json, file2json, 'stylish', expectedResultStylish];
const ymlFilesStylishFormat = [file1yml, file2yml, 'stylish', expectedResultStylish];
const jsonFilesPlainFormat = [file1json, file2json, 'plain', expectedResultPlain];
const ymlFilesPlainFormat = [file1yml, file2yml, 'plain', expectedResultPlain];
const jsonFilesJsonFormat = [file1json, file2json, 'json', expectedResultJson];
const ymlFilesJsonFormat = [file1yml, file2yml, 'json', expectedResultJson];

const cases = [
  jsonFilesStylishFormat,
  ymlFilesStylishFormat,
  jsonFilesPlainFormat,
  ymlFilesPlainFormat,
  jsonFilesJsonFormat,
  ymlFilesJsonFormat,
];

describe('gendiff utility', () => {
  test.each(cases)(
    'given %p, %p and %p as arguments, returns %p',
    (firstArg, secondArg, format, expectedResult) => {
      const result = getFormattedDiff(firstArg, secondArg, format);
      expect(result).toEqual(expectedResult);
    },
  );
});
