const app = require("./app");
const db = require("./models/database");
const host = '0.0.0.0';


require("dotenv").config();

db.sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

// // db.BCDS_Achievement.sync({ alter: true }); //force: true
// // db.sequelize.sync({ alter: true }); //force: true

const port = 8080;

app.listen(port, host, () =>
  console.log(`Server listening on http://${host}:${port}`)
);

