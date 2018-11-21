const users = require('./users/users.service.js');
const playlist = require('./playlist/playlist.service.js');
const musics = require('./musics/musics.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(playlist);
  app.configure(musics);
};
