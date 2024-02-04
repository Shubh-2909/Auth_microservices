    const express = require('express');
    const sequelize = require('sequelize');
    const bodyParser = require('body-parser')
    const {PORT} = require('./config/serverConfig');
    const app = express();
    const apiRoutes = require('./routes/index')
    const db = require('./models/index')
    const {User , Role} = require('./models/index')
    const prepareAndStartServer = () => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use('/api' , apiRoutes);

        app.listen(PORT , async () => {
            console.log(`Server Started on Port: ${PORT}`);
            if(process.env.DB_SYNC){
                db.sequelize.sync({alert:true})
            }

            // const u1 = await User.findByPk(1);
            // const r1 = await Role.findByPk(1);
            // u1.addRole(r1)
            // const response1 = await r1.getUsers();
            // const response2 = await u1.hasRoles(r1);

            // console.log("Response 1: ",response1)
            // console.log("Response 2: ",response2)
        })
    }

    prepareAndStartServer();