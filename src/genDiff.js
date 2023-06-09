import _ from 'lodash';
import getData from './parser.js';
import formatDiff from './formatters/index.js';
// import { cwd } from 'node:process';

const genDiff = (file1, file2, format = 'stylish') => {
  const fileParsed1 = getData(file1);
  const fileParsed2 = getData(file2);

  const iter = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const allKeys = _.union(keys1, keys2).sort();

    const diff = allKeys.map((key) => {
      const node = {};
      node.key = key;
      const preparedValue1 = data1[key];
      const preparedValue2 = data2[key];

      if (_.isObject(preparedValue1) && _.isObject(preparedValue2)) {
        return { key, type: 'nested', children: iter(preparedValue1, preparedValue2) };
      }

      const file1HasKey = Object.hasOwn(data1, key);
      const file2HasKey = Object.hasOwn(data2, key);

      if (file1HasKey && !file2HasKey) {
        node.type = 'removal';
        node.value = preparedValue1;
        return node;
      }

      if (!file1HasKey && file2HasKey) {
        node.type = 'addition';
        node.value = preparedValue2;
        return node;
      }

      if (file1HasKey && file2HasKey) {
        if (preparedValue1 === preparedValue2) {
          node.type = 'noChange';
          node.value = preparedValue1;
        } else {
          node.type = 'update';
          node.valueBefore = preparedValue1;
          node.valueAfter = preparedValue2;
        }
      }

      return node;
    });
    return diff;
  };

  return formatDiff(iter(fileParsed1, fileParsed2), format);
};

// console.log(genDiff(
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file3.json',
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file4.json', 'plain'
// ));

// ____________________________

//     const lines = allKeys.map((key) => {
//       const preparedValue1 = data1[key];
//       const preparedValue2 = data2[key];

//       let status;
//       let line;
//       const path = `${ancestry}.${key}`;

//       if (_.isObject(preparedValue1) && _.isObject(preparedValue2)) {
//         const indent = ' '.repeat(depth * 4 - 2);
//         switch (formater) {
//           case stylish:
//             return `${indent}  ${key}: ${iter(preparedValue1, preparedValue2, depth + 1)}`;
//           case plain:
//             return iter(preparedValue1, preparedValue2, 1, path);
//           default:
//             return null;
//         }
//         // return iter(preparedValue1, preparedValue2, depth + 1);
//       }
//       const file1HasKey = Object.hasOwn(data1, key);
//       const file2HasKey = Object.hasOwn(data2, key);

//       if (file1HasKey && !file2HasKey) {
//         status = 'removal';
//         line = formater(status, key, preparedValue1, depth);
//       }

//       if (!file1HasKey && file2HasKey) {
//         status = 'addition';
//         switch (formater) {
//           case stylish:
//             line = formater(status, key, preparedValue2, depth);
//             break;
//           case plain:
//             line = plain(path, status, key, preparedValue2);
//             break;
//           default:
//             return 'error1';
//         }
//       }

//       if (file1HasKey && file2HasKey) {
//         const checkValue1 = formater('default', key, preparedValue1, depth + 1);
//         const checkValue2 = formater('default', key, preparedValue2, depth + 1);
//         if (checkValue1 === checkValue2) {
//           status = 'noChange';
//           line = formater(status, key, preparedValue1, depth);
//         } else {
//           status = 'update';
//           line = formater(status, key, preparedValue1, depth, preparedValue2);
//         }
//       }
//       return line;
//     });

//     let result = [...lines].join('\n');
//     if (formater === stylish) {
//       const outIndent = ' '.repeat((depth * 4) - 4);
//       result = ['{', ...lines, `${outIndent}}`].join('\n');
//     }
//     return result;
//   };
//   return iter(fileParsed1, fileParsed2, 1, '');
// };

// console.log(genDiff(
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file3.json',
//   '/Users/ksenia/Documents/FRONTEND/frontend-project-46/__fixtures__/file4.json', plain
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
//       line = [`${indent}${minus}${key}: ${preparedValue1}`,
// `${indent}${plus}${key}: ${preparedValue2}`].join('\n');
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
