// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data} = context;
    app.service('playlists').get(data.playlist).then((playlist) => {
      console.log(data);
      console.log(context.result._id);
      playlist.musics.push(context.result._id);
      return app.service('playlists').update(playlist._id,playlist);
    });
  };
};
