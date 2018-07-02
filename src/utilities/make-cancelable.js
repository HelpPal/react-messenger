function CancelledPromiseError(originalError) {
  this.name = 'CancelledPromiseError';
  this.originalError = originalError;
  this.isCanceled = true;
}

CancelledPromiseError.prototype = Error.prototype;


export const makeCancelable = (promise) => {
  let hasCanceled = false;

  let isPending = true;
  promise.then(val => {
    isPending = false;
    if (hasCanceled) {
      throw new CancelledPromiseError();
    }
    return val;
  })
  .catch(error => {
    isPending = false;
    if (hasCanceled) {
      return new CancelledPromiseError(error);
    }
    return error;
  });

  return {
    isPending() {
      return isPending;
    },
    promise,
    cancel() {
      hasCanceled = true;
    },
  };
};
