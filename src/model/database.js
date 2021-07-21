var Sequelize = require('sequelize');
const sequelize = new Sequelize(
'por1clicktestar',
'postgres',
'fatimaluis1998',
{
host: 'localhost',
port: '5432',
dialect: 'postgres'
}
);
module.exports = sequelize;