/** Test whether something is a promise. Works across realms. */
function toBeAPromise(actual) {
  const pass = Object.prototype.toString.call(actual) === "[object Promise]";
  return {
    pass,
    message: () => `expected ${this.utils.printReceived(actual)}${pass ? " not" : ""} to be a promise`,
  };
}

async function toBePending(actual) {
  const pending = Symbol();
  const resolution = await Promise.race([actual, Promise.resolve(pending)]);
  const pass = resolution === pending;

  return {
    pass,
    message: () => `expected ${this.utils.printReceived(actual)}${pass ? " not" : ""} to be a pending`,
  };
}

expect.extend({
  toBeAPromise,
  toBePending,
});
