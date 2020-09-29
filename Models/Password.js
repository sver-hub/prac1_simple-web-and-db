const Sequelize = require('sequelize')

const Password = db.define('passwords', {
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {underscored: true})

Password.belongsTo(require('./User'))

module.exports = Password