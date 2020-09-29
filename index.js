const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const app = express();
const router = express.Router();


const config = {
    database: {
        dialect: 'sqlite',
        storage: 'local.db',
        define: {
            timestamps: false
        }
    },
    port: 3000
};

const db = new Sequelize(config.database);

/*------------------MODELS------------------*/

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
}, {underscored: true});

const Password = db.define('passwords',  {
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {underscored: true});

Password.belongsTo(User, /*{as: 'password'}*/);

/*-----------------------------------------*/

/*------------------ROUTES------------------*/

// router.get('/adduser', async (req, res, next) => {
//     try {
//         const required = ['login', 'password', 'money_amount', 'card_number', 'status'];
//         for(let field of required) {
//           if(req.body[field] === undefined) {
//                 let err = new Error(`Required field '${field}' is missing.`);
//                 err.status = 400;
//                 throw err;
//             }
//         }
//         let found = await User.findOne({where: {login: req.body.login}});
//         if(found !== null) {
//           let err = new Error(`Passed login '${req.body.login}' is used.`);
//           err.status = 400;
//           throw err;
//         }

//         let result = await User.create(req.body);
//         res.status(201).json(result);
//       }
//       catch(err) {
//         next(err);
//       }
// });

router.get('/users', async (req, res, next) => {
    try {
        let users = await User.findAll();
        res.set('Content-Type', 'text/html');
        let table = '<table border="1"><caption>Users</caption><tr><th>id</th><th>login</th><th>money anount</th><th>card number</th><th>status</th></tr>'
        users.forEach(user => {
            table += `<tr><th>${user.id}</th><th>${user.login}</th><th>${user.money_amount}</th><th>${user.card_number}</th><th>${user.status? 'not active':'active'}</th></tr>`
        });
        table += '</table>'
        console.log("All users:", JSON.stringify(users, null, 2));
        // res.json(users);
        res.send(table);
    }
    catch(err) {
        next(err);
    }
});

/*-----------------------------------------*/

app.use(parser.urlencoded({extended: true}));
app.use(parser.json({extended: true}));
app.use(router);

(async function() {
    try {

        await db.authenticate();
        console.log('Connection has been established successfully.');
        db.sync();
        app.listen(config.port, console.log.bind(null, `Listening on port ${config.port}`));
    
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
})();