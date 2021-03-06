require(`dotenv`).config();

const modules = [
  require(`./src/commands/version`),
  require(`./src/commands/description`),
  require(`./src/commands/license`),
  require(`./src/commands/author`),
  require(`./src/commands/help`),
  require(`./src/modules/server`),
];
const defaultModule = require(`./src/commands/default`);
const errorModule = require(`./src/commands/error`);

const args = process.argv.slice(2);
const userCommand = args[0];

if (userCommand === undefined) {
  defaultModule.execute();
} else {
  const currentCommand = modules.find((mod) => `--${mod.name}` === userCommand.toLowerCase());

  if (currentCommand === undefined) {
    errorModule.execute(userCommand);
    process.exit(1);
  } else {
    currentCommand.execute(args);
  }
}
