// Initializes the `playlist` service on path `/playlist`
const createService = require('feathers-nedb');
const createModel = require('../../models/playlist.model');
const hooks = require('./playlist.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/playlist', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('playlist');

  service.hooks(hooks);
};
