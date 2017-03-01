import LRU from 'lru-cache';
import request from 'request';

const cacheOptions = { max: 500, maxAge: 1000 * 60 * 60 };
export const cache = LRU(cacheOptions);

const accessToken = process.env.ACCESS_TOKEN;

/**
 * Make a request to the erikberg.com API.
 *
 * @param {String}   endpoint
 * @param {Function} callback
 */
export const createRequest = (endpoint, callback) => {
  if (!accessToken) {
    return callback(new Error('Missing access token'));
  }

  const requestOptions = {
    url: `https://erikberg.com/nba${endpoint}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'Slam/1.0 (https://github.com/mrwest808/slam)',
    },
  };

  request(requestOptions, (err, _, body) => {
    if (err) {
      return callback(err);
    }

    try {
      const response = JSON.parse(body);
      return callback(null, response);
    } catch (err) {
      return callback(err);
    }
  });
};
