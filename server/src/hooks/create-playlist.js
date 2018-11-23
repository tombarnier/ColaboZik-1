

module.exports = function (options = {}) {
  return async context => {
    await new Promise((resolve,reject) => {
      const { app, data } = context;
      app.service('playlists').find(data.name).then(async (res) => {
        if (res.total > 0){
          reject(new Error('playlist existante'));
        }
        else {
          let musics =[];
          await data.musics.map((music) => {
            app.service('musics').find(music.id).then((res) =>{
              if(res.total > 0) musics.push(res.data[0]._id);
              else console.log('musique inexistante');
            });
            context.musics = musics; 
          });
          resolve();
        }
      });
    })
      .then(() => {return context;})
      .catch((err) => {throw err;});
  };
};
