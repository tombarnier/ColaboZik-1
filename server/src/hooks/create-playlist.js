// Transforme une string en tableau de strings en supprimant les doublons et les strings vides
const strToArray = (str) => [...new Set(str.split(/\s+/).filter(x => x))];

module.exports = function(options = {}) {
  return async context => {
    const { app, data } = context
    const {name, tags} = data
    data.name = name.trim()
    if (data.name === "") throw new Error('champ nom vide')
    data.tags = tags ? strToArray(tags) : []

    return context;
  };
};
