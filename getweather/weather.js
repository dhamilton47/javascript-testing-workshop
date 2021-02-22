const { DARKSKY_KEY, DARKSKY_URL } = process.env;
const rp = require('request-promise');

module.exports.getWeather = async (latitude,longitude) => {
  const url = `${DARKSKY_URL}/${DARKSKY_KEY}`;
  return await rp(`${url}/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags`);
};
