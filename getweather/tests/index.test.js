require('jest')
const cmd = require('./cmd')

describe('env conf works', () => {
    test('it works', () => {
        expect(process.env.TESTING).toBe('TRUE')  
    })
})

describe('Command line', () => {
    test('requires a city', async () => {
        const response = await cmd.execute(
            './index.js',
            ['-c', 'Orlando']
        )
        
        console.log('response =', response)
        console.log('length of response is', response.length)
        console.log('The type for response is', typeof(response))

        expect(response).toBe('Orlando')
    })
})
