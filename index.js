const express = require('express')
const Sequelize = require('sequelize')
const parser = require('body-parser')

const app = express()

app.use(parser.urlencoded({extended: true}))
app.use(parser.json({}))
app.use(express.static('styles'))
app.set('view engine', 'pug')


const config = {
    database: {
        dialect: 'sqlite',
        storage: 'local.db',
        define: {
            timestamps: false
        }
    },
    port: 3000
}

db = new Sequelize(config.database)

app.use(require('./router'))

async function start() {
    try {
        await db.authenticate()
        console.log('Connection has been established successfully.');
        db.sync();
        app.listen(config.port, console.log.bind(null, `Listening on port ${config.port}`));
    
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
}

start()