const Sequelize = require('sequelize')

const User = db.define('users', {
    login: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    money_amount: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    card_number: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {underscored: true})

module.exports = User