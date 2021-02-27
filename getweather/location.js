const rp = require('request-promise');

module.exports.getLocation = async (location, url, key) => {
  const apiUrl = `${url}/json?key=${key}`;
  return await rp(`${apiUrl}&q=${location}&limit=1`);
};
