const {Router} = require('express')
const User = require('./Models/User')
const router = Router()
const querystring = require('querystring')

module.exports = router

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    let pageHtml = '<a href="http://localhost:3000/users">Users</a>'
    pageHtml += '<form autocomplete="off">' +
        '<div><span>id</span><input type="text" name="id"/></div>' +
        '<div><span>login</span><input type="text" name="login"/></div></form>' +
        '<button type="submit">Query</button>'
    res.send(pageHtml)
})

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    let pageHtml = '<a href="http://localhost:3000/users">Users</a>'
    pageHtml += '<form autocomplete="off">' +
        '<div><span>id</span><input type="text" name="id"/></div>' +
        '<div><span>login</span><input type="text" name="login"/></div></form>' +
        '<button type="submit">Query</button>'
    res.send(pageHtml)
})

const makeUsersTable = (users) => {
    let table = '<table border="1"><caption>Users</caption><tr><th>id</th><th>login</th><th>money amount</th><th>card number</th><th>status</th></tr>'
    users.forEach(user => {
        table += `<tr><th>${user.id}</th><th>${user.login}</th><th>${user.money_amount}</th><th>${user.card_number}</th><th>${user.status ? 'active' : 'not active'}</th></tr>`
    })
    table += '</table>'
    return table
}

router.get('/by-login', async (req, res) => {
    const querydata = req.originalUrl.split('?')[1]
    const login = querydata.split('=')[1]
    try {
        let queryResult = await User.findAll({where: {login}})
        if (queryResult.length !== 0) {
            const table = makeUsersTable(queryResult)
            res.send(table)
        }
        else res.send('<span>No such user</span>')
    } catch (e) {}
})

router.get('/by-id', async (req, res) => {
    const querydata = req.originalUrl.split('?')[1]
    const id = querydata.split('=')[1]
    try {
        let queryResult = await User.findAll({where: {id}})
        if (queryResult.length !== 0) {
            const table = makeUsersTable(queryResult)
            res.send(table)
        }
        else res.send('<span>No such user</span>')
    } catch (e) {}
})

router.get('/users', async (req, res, next) => {
    try {
        let users = await User.findAll()
        res.set('Content-Type', 'text/html')
        const table = makeUsersTable(users)
        res.send(table)
    } catch (e) {
        next(e)
    }
})

router.get('*', (req, res) => {
    res.redirect('/')
})