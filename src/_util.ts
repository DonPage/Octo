/*
 * Try catch retry decorator.
 */

export const wait = async (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const handleErr = (err: any) => {
  throw err;
};

export const Retry = (amount: number = 3, errHandler: Function = handleErr) => {
  return function(key: any, target: any, descriptor: any) {
    const originalFunc = descriptor.value;
    descriptor.value = async function() {
      let args = [...arguments];
      try {
        await originalFunc.apply(this, args);
      } catch (err) {
        // if out of retries, handle err.
        if (amount === 0) return errHandler(err);
        amount -= 1;
        await wait();
        console.log(`retrying`);
        // if not, call function again.
        return descriptor.value();
      }
    };
    return descriptor;
  };
};

