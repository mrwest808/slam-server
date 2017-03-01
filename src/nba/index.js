import { cache, createRequest } from './utils';

/**
 * Fetch all NBA teams.
 *
 * @param {Function} callback
 */
export const getTeams = callback => {
  const endpoint = '/teams.json';
  const cachedResponse = cache.get(endpoint);

  if (cachedResponse) {
    return callback(null, cachedResponse);
  }

  createRequest(endpoint, (err, response) => {
    if (err) {
      return callback(err);
    }

    cache.set(endpoint, response);
    callback(null, response);
  });
};

/**
 * Fetch all games in the current season for a given team.
 *
 * @param {String}   teamId
 * @param {Function} callback
 */
export const getGamesForTeam = (teamId, callback) => {
  const endpoint = `/results/${teamId}.json`;
  const cachedResponse = cache.get(endpoint);

  if (cachedResponse) {
    return callback(null, cachedResponse);
  }

  createRequest(endpoint, (err, response) => {
    if (err) {
      return callback(err);
    }

    cache.set(endpoint, response);
    callback(null, response);
  });
};
