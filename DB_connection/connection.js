import mysql from "mysql";

const confifDB = {
  host: "localhost",
  user: "root",
  password: "",  
  database: "payment_getway", 
};

const connection = mysql.createConnection(confifDB);

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database");
});





export default connection;