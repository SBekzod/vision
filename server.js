const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mysql = require("mysql2/promise");

mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
  })
  .then((connection) => {
    console.log("MySQL connection succeed");

    const MySql = require("./MySQL");
    const db = new MySql(connection);
    module.exports = db;

    const app = require("./app");
    const server = http.createServer(app);
    let PORT = process.env.PORT || 3077;
    server.listen(PORT, function () {
      console.log(
        `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
      );
    });
  })
  .catch();
