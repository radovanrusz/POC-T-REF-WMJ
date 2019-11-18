const app = require('./app')
const port = process.env.PORT
require('./kafka')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})