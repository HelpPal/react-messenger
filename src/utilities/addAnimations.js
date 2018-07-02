// @flow

export function addAnimations(animations) {
  return animations.reduce((result, animation) => {
    if (animation.ref) {
      result.push(animation.ref[animation.animationType](animation.duration));
      return result;
    }
    return result;
  }, []);
}
