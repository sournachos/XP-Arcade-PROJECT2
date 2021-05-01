const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {   //<----- When hosted on Heroku with the jaws database add-on

  sequelize = new Sequelize(process.env.JAWSDB_URL); 

} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,               //<------ Only for running locally
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
