const { getFizzBuzz } = require("fizzbuzz-maker");
const filepath = require("./get-path")(__filename);
const write = require("./write");

write({
  filepath,
  times: 100,
  line: { get: getFizzBuzz, args: { withErrors: true }, err: "Doh!" },
});
