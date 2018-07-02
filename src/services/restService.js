// @flow

import { AsyncStorage } from 'react-native';
import { set, isEmpty, includes } from 'lodash';
import { emitter } from 'AppUtilities';

const black_list = ['patient', 'users/login', 'social/facebook', 'users/forgot'];

export async function ResetApiService({
  api,
  third_party,
  method,
  params
}) {
  const headers = {};

  let path = `http://jdevsrv-2.hopto.org:720/${api}`;

  if (third_party) {
    path = api;
  }

  set(headers, 'Cache-Control', 'no-cache');
  set(headers, 'Content-Type', 'application/json');

  if (!includes(black_list, api)) {
    const token = await AsyncStorage.getItem('@PROJECTX:ACCESS_TOKEN');
    if (token) {
      set(headers, 'X-Auth-Token', token);
    }
  }

  const reqBody = {
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  console.log('end point = ', path);
  console.log('req body = ', reqBody);

  return fetch(path, reqBody)
    .then(response => response.json())
    .then((data) => {
      console.log('response json data = ', data);
      if (data.errors || data.error || data.message) {
        if (third_party) {
          return {
            result: 'error',
            data
          };
        }
        if (data.code === 401 && api !== 'users/patients') {
          emitter.emit('AppRoot:TOKEN_EXPIRED');
        } else {
          if (data.code === 403 && data.number === 1006) {
            emitter.emit('AppRoot:VERSION_UPDATED');
          }
          return {
            result: 'error',
            ...data
          };
        }
      }
      if (third_party) {
        return {
          result: 'ok',
          data
        };
      }
      return {
        result: 'ok',
        ...data
      };
    })
    .catch(() => {
      return {
        result: 'error',
        message: 'Please check your internet connection!'
      };
    });
}
