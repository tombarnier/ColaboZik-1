// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { params, result } = context;
    const { user } = context.params;
    let playlists = result.data.filter((playlist) => {
      console.log(playlist.members.includes(user.email));
      return playlist.members.includes(user.email);
    })
    console.log(playlists);
    context.result.data = playlists;
    return context;
  };
};
