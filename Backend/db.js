import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "127.0.0.1",      
  user: "root",
  password: "",
  port: 3307,             
  database: "instaclone", 
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;
