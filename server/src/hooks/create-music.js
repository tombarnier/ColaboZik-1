// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const fetchVideo = require('youtube-info');

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const {app, data} = context;
    console.log('on est la');
    let regex = /^(?:(?:http(?:s)?:\/\/|)(?:www\.youtube\.com\/(?:watch\?v=|embed\/)|youtu.be\/)|)([A-Za-z0-9_-]{11})$/g;
    let id = regex.exec(data.link);
    return fetchVideo(id[1])
      .then((info) => {
        console.log('pk');
        data.embed = info.embedURL;
        data.title = info.title;
        data.thumbnail = info.thumbnailUrl;
        data.dislike = 0;
        console.log(context.data);
        console.log('aprés la promise');
        return context;
      })
      .catch((err) => {throw err;});

  };
};
