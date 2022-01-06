'use strict';

const {Cli} = require(`./cli`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX} = require(`../../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const userCommand = userArguments[0];

if (Cli[userCommand]) {
  Cli[userCommand].run(userArguments[1]);
  return;
}

Cli[DEFAULT_COMMAND].run();
