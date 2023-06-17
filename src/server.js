const app = require("./app");
const db = require("./models/database");

require("dotenv").config();

db.sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

// // db.BCDS_Achievement.sync({ alter: true }); //force: true
// // db.sequelize.sync({ alter: true }); //force: true

const port = process.env.PORT || 3600;

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
