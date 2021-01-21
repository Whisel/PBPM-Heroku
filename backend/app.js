const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const config = require('./utils/config')
const errorHandler = require('./middlewares/error_handler')
const log = require('./utils/log')
require('express-async-errors')

log.info('Connecting to ', config.DB_URI)
const connect = async () => {
    try {
        await mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        log.info('Connected to database')
    } catch (err) {
        log.info('Error connecting to database: ', error.message)
    }
}
connect()



const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json())

const loginApi   = require('./routes/login.js')
const teamApi    = require('./routes/teams.js')
const projectApi = require('./routes/projects.js')
const userApi    = require('./routes/users.js')
const verifyApi  = require('./routes/verify.js')
const stationApi = require('./routes/stationary_maps.js')

app.use('/api/login',           loginApi)
app.use('/api/teams',           teamApi)
app.use('/api/projects',        projectApi)
app.use('/api/users',           userApi)
app.use('/api/verify',          verifyApi)
app.use('/api/stationary_maps', stationApi)

app.use(errorHandler)

app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.js')(passport)

const expressSession = require('express-session')({
  secret: config.PRIVATE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

const server = app.listen(config.PORT, () => {
    log.info(`Server is running on port ${config.PORT}`)
})

module.exports = server