const {Router} = require('express')
const User = require('./Models/User')
const router = Router()

module.exports = router

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    pageHtml = '<a href="http://localhost:3000/users">User</a>'
    res.send(pageHtml)
})

router.get('/users', async (req, res, next) => {
    try {
        let users = await User.findAll()
        res.set('Content-Type', 'text/html')
        let table = '<table border="1"><caption>Users</caption><tr><th>id</th><th>login</th><th>money amount</th><th>card number</th><th>status</th></tr>'
        users.forEach(user => {
            table += `<tr><th>${user.id}</th><th>${user.login}</th><th>${user.money_amount}</th><th>${user.card_number}</th><th>${user.status ? 'not active' : 'active'}</th></tr>`
        })
        table += '</table>'
        console.log("All users:", JSON.stringify(users, null, 2))
        res.send(table)
    } catch (err) {
        next(err)
    }
})