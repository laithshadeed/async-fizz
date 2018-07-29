const { basename, dirname, resolve } = require("path");

function getPath(filename) {
  const dir = dirname(filename);
  const name = basename(filename);
  return resolve(`${dir}/../${name}`.replace(/\.js$/, ".txt"));
}

module.exports = getPath;
