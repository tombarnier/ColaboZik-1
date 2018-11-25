// Transforme une string en tableau de strings en supprimant les doublons et les strings vides
const strToArray = (str) => [...new Set(str.split(/\s+/).filter(x => x))];

module.exports = function(options = {}) {
  return async context => {
    const { app, data } = context;
    data.tags = strToArray(data.tags);
    data.name = data.name.trim();
    return context;
  };
};
