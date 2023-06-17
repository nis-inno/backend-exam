require("dotenv").config();
module.exports = {
  development: {
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    host: process.env.MSSQL_HOST,
    dialect: "mssql",
  },
  test: {
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    host: process.env.MSSQL_HOST,
    dialect: "mssql",
  },
  production: {
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    host: process.env.MSSQL_HOST,
    dialect: "mssql"
    // timezone: "+05:30",
  },
};
