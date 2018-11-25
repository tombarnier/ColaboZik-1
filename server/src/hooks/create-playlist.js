const strToArray = (str) => [...new Set(str.trim().split(/\s+/))];

module.exports = function(options = {}) {
  return async context => {
    const { app, data } = context;
    data.tags = strToArray(data.tags);
    return context;
  };
};
