#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

// const format = (type) => console.log(type);

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  // .action(format)
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format, <type>', 'output format')
  .arguments('<file1> <file2>');

program.parse();
