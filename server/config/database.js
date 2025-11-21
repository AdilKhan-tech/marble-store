const Sequelize = require("sequelize");

const sequelize = new Sequelize("marble_store", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize