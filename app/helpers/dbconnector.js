/**
 * http://usejsdoc.org/
 */

import mysql from "mysql";

const connection = mysql.createPool({
  //function to connect to the db
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b0d4782ac235fa",
  password: "e9eaa8cc",
  database: "heroku_1458a3842f31492"
});
export default connection;
