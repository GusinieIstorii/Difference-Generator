import _ from 'lodash';
import getData from './parser.js';
import stylish from './formatters/formatStylish.js';
// import { cwd } from 'node:process';

const genDiff = (file1, file2, formater = stylish) => {
  const fileParsed1 = getData(file1);
  const fileParsed2 = getData(file2);

  const iter = (data1, data2, depth) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const allKeys = _.union(keys1, keys2).sort();

    const lines = allKeys.map((key) => {
      const preparedValue1 = data1[key];
      const preparedValue2 = data2[key];

      let status;
      let line;

      if (_.isObject(preparedValue1) && _.isObject(preparedValue2)) {
        const indent = ' '.repeat(depth * 4 - 2);
        switch (formater) {
          case stylish:
            return `${indent}  ${key}: ${iter(preparedValue1, preparedValue2, depth + 1)}`;
          default:
            return null;
        }
        // return iter(preparedValue1, preparedValue2, depth + 1);
      }
      const file1HasKey = Object.hasOwn(data1, key);
      const file2HasKey = Object.hasOwn(data2, key);

      if (file1HasKey && !file2HasKey) {
        status = 'removal';
        line = formater(status, key, preparedValue1, depth);
      }

      if (!file1HasKey && file2HasKey) {
        status = 'addition';
        line = formater(status, key, preparedValue2, depth);
      }

      if (file1HasKey && file2HasKey) {
        const checkValue1 = formater('default', key, preparedValue1, depth + 1);
        const checkValue2 = formater('default', key, preparedValue2, depth + 1);
        if (checkValue1 === checkValue2) {
          status = 'noChange';
          line = formater(status, key, preparedValue1, depth);
        } else {
          status = 'update';
          line = formater(status, key, preparedValue1, depth, preparedValue2);
        }
      }
      return line;
    });

    let result = [...lines].join('\n');
    if (formater === stylish) {
      const outIndent = ' '.repeat((depth * 4) - 4);
      result = ['{', ...lines, `${outIndent}}`].join('\n');
    }
    return result;
  };
  return iter(fileParsed1, fileParsed2, 1);
};

// console.log(genDiff(
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file3.json',
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file4.json'
// ));

export default genDiff;

// ПОМЯНЕМ МОМЕНТ КОГДА ВСЕ РАБОТАЛО И НАЧИНАЕМ ВСЕ ПЕРЕПИСЫВАТЬ
// const genDiff = (file1, file2, formater = stylish) => {
//   const fileParsed1 = getData(file1);
//   const fileParsed2 = getData(file2);

//   const iter = (data1, data2, depth) => {
//     const keys1 = Object.keys(data1);
//     const keys2 = Object.keys(data2);
//     const allKeys = _.union(keys1, keys2).sort();

//     const lines = allKeys.map((key) => {
//       let preparedValue1 = data1[key];
//       let preparedValue2 = data2[key];

//       const indent = ' '.repeat(depth * 4 - 2);
//       const minus = '- ';
//       const plus = '+ ';
//       const space = '  ';
//       let line;

//       if (_.isObject(preparedValue1) && _.isObject(preparedValue2)) {
//         return `${indent}${space}${key}: ${iter(preparedValue1, preparedValue2, depth + 1)}`;
//       }
//       const file1HasKey = Object.hasOwn(data1, key);
//       const file2HasKey = Object.hasOwn(data2, key);

//       if (_.isObject(preparedValue1)) {
//         preparedValue1 = formater(preparedValue1, depth + 1);
//       }
//       if (_.isObject(preparedValue2)) {
//         preparedValue2 = formater(preparedValue2, depth + 1);
//       }

//       if (file1HasKey && !file2HasKey) {
//         line = `${indent}${minus}${key}: ${preparedValue1}`;
//       }

//       if (!file1HasKey && file2HasKey) {
//         line = `${indent}${plus}${key}: ${preparedValue2}`;
//       }

//       if (file1HasKey && file2HasKey) {
//         if (preparedValue1 === preparedValue2) {
//           line = `${indent}${space}${key}: ${preparedValue1}`;
//         } else {
//           line = [`${indent}${minus}${key}: ${preparedValue1}`, `${indent}${plus}${key}: ${preparedValue2}`].join('\n');
//         }
//       }
//       return line;
//     });
//     const outIndent = ' '.repeat((depth * 4) - 4);
//     const result = ['{', ...lines, `${outIndent}}`].join('\n');
//     return result;
//   };
//   return iter(fileParsed1, fileParsed2, 1);
// };
