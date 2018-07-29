function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fizzBuzz(n) {
  let value = null;

  if (n % 3 === 0 && n % 5 === 0) {
    value = "FizzBuzz";
  } else if (n % 3 === 0) {
    value = "Fizz";
  } else if (n % 5 === 0) {
    value = "Buzz";
  }

  return value;
}

function getFizzBuzzSync({ n = 0, withErrors = false } = {}) {
  if (withErrors && randomInRange(0, 5) === 5 && fizzBuzz(n)) {
    throw new Error("It failed :(");
  }
  return fizzBuzz(n);
}

function getFizzBuzz({ n = 0, withErrors = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return withErrors && randomInRange(0, 5) === 5 && fizzBuzz(n)
        ? reject(new Error("It failed :("))
        : resolve(fizzBuzz(n));
    }, randomInRange(1, 10));
  });
}

module.exports = { getFizzBuzz, getFizzBuzzSync };
