'use strict';

const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX, DEFAULT_RADIX, DEFAULT_QYANTITY} = require(`../../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const userCommand = userArguments[0];
const mockCount = Number.parseInt(userArguments[1], DEFAULT_RADIX) || DEFAULT_QYANTITY;

if (Cli[userCommand]) {
  Cli[userCommand].run(mockCount);
  return;
}

Cli[DEFAULT_COMMAND].run();
