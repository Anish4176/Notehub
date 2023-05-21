require('./db')
const express = require('express')
const app = express()
const port =process.env.port || 5000;
var cors = require('cors')


app.use(cors())
app.use(express.json());
//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
