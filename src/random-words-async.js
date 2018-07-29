const { getRandomWord } = require("word-maker");
const filepath = require("./get-path")(__filename);
const write = require("./write");

write({ filepath, times: 100, line: { get: getRandomWord } });
