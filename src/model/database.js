var Sequelize = require('sequelize');
const sequelize = new Sequelize(
'd410g3fj5360o1',
'wjilpqmgptaske',
'1e50e55305a99be6700829c171254c9a17b1c76bd69843023247fceee2bed360',
{
host: 'ec2-54-228-174-49.eu-west-1.compute.amazonaws.com',
port: '5432',
dialect: 'postgres',
dialectOptions:{
        ssl:{          
            rejectUnauthorized: false        
        }
    },
}
);
module.exports = sequelize;