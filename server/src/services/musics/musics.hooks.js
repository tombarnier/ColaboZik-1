const { authenticate } = require('@feathersjs/authentication').hooks;

const createMusic = require('../../hooks/create-music');

const addMusicPlaylist = require('../../hooks/add-music-playlist');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createMusic()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addMusicPlaylist()],
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
