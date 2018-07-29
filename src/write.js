const { createWriteStream } = require("fs");

function getLine({ currentCount, lineOptions } = {}) {
  const opts = lineOptions.args || {};
  opts.n = currentCount;
  let line = null;
  try {
    line = lineOptions.get(opts);
  } catch (e) {
    line = lineOptions.err;
  }

  // This logic need to handle cases where getting the line function is async.
  return new Promise((resolve) => {
    if (line.constructor === Promise) {
      line
        .then((v) => {
          resolve({ i: currentCount, value: v });
        })
        .catch(() => {
          resolve({ i: currentCount, value: lineOptions.err });
        });
    } else {
      resolve({ i: currentCount, value: line });
    }
  });
}

function doWrite({ start = 1, numberOfIterations, lineOptions, stream } = {}) {
  function handler({ i, value }) {
    if (value != null) {
      stream.write(`${i}: ${value}\n`);
    }
  }

  for (let currentCount = start; currentCount <= numberOfIterations; currentCount += 1) {
    getLine({ currentCount, lineOptions })
      .then(handler)
      .catch((err) => {
        throw new Error(err);
      });
  }
}

function write({ line = {}, times = 0, filepath = null } = {}) {
  if (times > 1e5) {
    throw new Error(
      "This code is designed to work with up to 100,000 iterations. " +
        "v8 will throw heap out of memory. If you want more iterations, " +
        "then you need to increase max heap size in v8"
    );
  }

  // By default the stream will auto-close. Although testing shows it will not be closed if for
  // example there is a long-running setTimeout after the calling write function.
  // In real-world server scenario more attention needed for resource leakage.
  const stream = createWriteStream(filepath);

  stream.on("error", (err) => {
    throw err;
  });

  doWrite({ lineOptions: line, numberOfIterations: times, stream });
}

module.exports = write;
