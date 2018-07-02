// @flow

let id:number = 0;

const ReactId = {
  generate: () => {
    ++id;
    return id;
  }
};

Object.freeze(ReactId);
export default ReactId;
