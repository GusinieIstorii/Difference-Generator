#!/usr/bin/env node

import { Command } from 'commander';
import getFormattedDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<path1>', 'first file')
  .argument('<path2>', 'second file')
  .action((path1, path2) => {
    console.log(getFormattedDiff(path1, path2, program.opts().format));
  });

program.parse();
