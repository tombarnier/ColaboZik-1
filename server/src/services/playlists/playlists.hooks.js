const { authenticate } = require('@feathersjs/authentication').hooks;

const createPlaylist = require('../../hooks/create-playlist');

const findPlaylistsByUser = require('../../hooks/find-playlists-by-user');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createPlaylist()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [findPlaylistsByUser()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
