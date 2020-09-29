const {Router} = require('express')
const User = require('./Models/User')
const router = Router()

module.exports = router

const makeUsersTable = (users) => {
    let table = '<table border="1"><caption>Users</caption><tr><th>id</th><th>login</th><th>money amount</th><th>card number</th></tr>'
    users.forEach(user => {
        table += `<tr><th>${user.id}</th><th>${user.login}</th><th>${user.money_amount}</th><th>${user.card_number}</th></tr>`
    })
    table += '</table>'
    return table
}


router.get(/^\/by-*/, async (req, res) => {
    const method = req.originalUrl.split('?')[0]
    const num = Object.values(req.query).length
    let queryResult

    if (method === '/by-login' && num === 1 && req.query.login) {
        queryResult = await User.findAll({where: {login: req.query.login}})
    } else if (method === '/by-id' && num === 1 && req.query.id) {
        queryResult = await User.findAll({where: {id: req.query.id}})
    } else res.send('<span>Invalid request</span>')

    try {
        if (queryResult.length !== 0) {
            const table = makeUsersTable(queryResult)
            res.send(table)
        } else res.send('<span>No such user</span>')
    } catch (e) {
    }

})


router.get('/users', async (req, res, next) => {
    try {
        let users = await User.findAll({where: {status: 1}})
        res.set('Content-Type', 'text/html')
        const table = makeUsersTable(users)
        res.send(table)
    } catch (e) {
        next(e)
    }
})

const byId = () => {
    console.log(document.getElementById('id').value)
}

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    let pageHtml = '<a href="http://localhost:3000/users">Users</a>'
    pageHtml += '<form action="http://localhost:3000/by-id"><div>' +
        '<span>id</span><input type="text" name="id"/>' +
        '<button type="submit">Query by id</button>' +
        '</div></form>' +
        '<form action="http://localhost:3000/by-login"><div>' +
        '<span>login</span><input type="text" name="login"/>' +
        '<button type="submit">Query by login</button>' +
        '</div></form>'
    res.send(pageHtml)
})


router.get('*', (req, res) => {
    res.redirect('/')
})