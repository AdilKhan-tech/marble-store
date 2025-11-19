const Sequelize = require("sequelize");

const sequelize = new Sequelize("wp_marble", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize