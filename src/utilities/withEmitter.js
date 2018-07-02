// @flow

import EventEmitter from 'events';
import { Logger } from './Logger';

const logger = new Logger('withEmitter');

const MAX_EVENT_LISTENERS: number = 100;
export const emitter = new EventEmitter();

emitter.setMaxListeners(MAX_EVENT_LISTENERS);

const FIELD_TO_ADD = 'emitter';

/**
 * @param key {String} - Class field to attach
 * @returns {Function} - decorator
 * @example
 *
 *  @withEmitter()
 *  class FavoriteScene extends Component {
 *    this.emitter.on(eventName, callback);
 *  }
 */
export default function (key?: string = FIELD_TO_ADD) {
  return function (target: ReactClass<*>) {
    if (target[key]) {
      logger.warn(`${key} field already exists in ${target.displayName || target.name} component`);
    }
    target.prototype[key] = emitter;
  };
}
