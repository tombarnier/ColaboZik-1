// Initializes the `musics` service on path `/musics`
const createService = require('feathers-nedb');
const createModel = require('../../models/musics.model');
const hooks = require('./musics.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/musics', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('musics');

  service.hooks(hooks);
};
