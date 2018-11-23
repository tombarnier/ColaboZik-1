

module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;
    data.tags = data.tags.split(' ')
    return context
  }
}
