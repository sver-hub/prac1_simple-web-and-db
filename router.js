const {Router} = require('express')
const User = require('./Models/User')
const router = Router()

module.exports = router

const makeUsersTable = (users, caption) => {
    let table = `<table><caption>${caption}</caption><thead><tr><th>id</th><th>login</th></tr></thead>`
    users.forEach(user => {
        table += `<tr><th>${user.id}</th><th>${user.login}</th>`
    })
    table += '</table>'
    return table
}


router.get(/^\/by-*/, async (req, res) => {
    const method = req.originalUrl.split('?')[0]
    const num = Object.values(req.query).length
    let queryResult

    if (method === '/by-login' && num === 1 && req.query.login) {
        queryResult = await User.findAll({
            attributes: ['id', 'login'],
            where: {login: req.query.login}
        })
    } else if (method === '/by-id' && num === 1 && req.query.id) {
        queryResult = await User.findAll({
            attributes: ['id', 'login'],
            where: {id: req.query.id}
        })
    } else res.render('error', {error: 'Invalid request'})

    try {
        if (queryResult.length !== 0) {
            const table = makeUsersTable(queryResult, 'Query result')
            res.render('table', {table})
        } else res.render('error', {error: 'No such user'})
    } catch (e) {
    }

})


router.get('/users', async (req, res, next) => {
    try {
        let users = await User.findAll({
            attributes: ['id', 'login'],
            where: {status: 1}
        })
        res.set('Content-Type', 'text/html')
        const table = makeUsersTable(users, 'Users')
        res.render('table', {table})
    } catch (e) {
        next(e)
    }
})


router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.render('main')
})


router.get('*', (req, res) => {
    res.redirect('/')
})