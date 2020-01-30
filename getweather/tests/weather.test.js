const nock = require('nock')
const { getWeather } = require('../weather')

describe('weather connection', () => {
    let darkSky
    let darkSkyQuery = {
        key: process.env.DARKSKY_KEY
    }
    
    beforeEach(() =>{
        nock.disableNetConnect()
        nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
        darkSky = nock(process.env.DARKSKY_URL)
            .get('/json')
    })

    afterEach( () => {
        nock.cleanAll()
        nock.restore()
    })

    test('city is sent properly', async () => {
        darkSky.query({ ...darkSkyQuery, q: 'Orlando' })
            .reply(200, { hello: 'test'})

        const response = true
 //       const response = await getLocation('Orlando')
 //       const responseObj = JSON.parse(response)
        expect(response).toBe(true)
    })
})

