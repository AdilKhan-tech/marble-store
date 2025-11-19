const Sequelize = require("sequelize");

const sequelize = new Sequelize("wp_marble", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

sequelize.authenticate()
    .then(() => {
        console.log("✅ Database Connected Successfully!");
    })
    .catch((error) => {
        console.error("❌ Database Connection Failed:", error);
    });

module.exports = sequelize