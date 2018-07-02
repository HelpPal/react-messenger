// @flow

export type CancelablePromise = {|
  isPending: () => boolean,
  cancel: () => boolean,
  promise: Promise<any>
|};
