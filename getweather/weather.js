const { DARKSKY_KEY, DARKSKY_URL } = process.env
const rp = require('request-promise')

module.exports.getWeather = async (city) => {
    const url = `${DARKSKY_URL}/json?key=${DARKSKY_KEY}`
    return await rp(`${url}&q=${city}`)
}
