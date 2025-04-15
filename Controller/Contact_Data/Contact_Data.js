import connection from '../../DB_Connection/connection.js';

class ContactData {
  static saveAllData = (req, res) => {
    const { firstname, email, mobilenumber, subject, message } = req.body;

    if (!firstname || !email || !mobilenumber || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql =
      "INSERT INTO messages (firstname, email, mobilenumber, subject, message) VALUES (?, ?, ?, ?, ?)";

    connection.query(
      sql,
      [firstname, email, mobilenumber, subject, message],
      (err, result) => {
        if (err) {
          console.error("❌ Database error:", err.sqlMessage || err);
          return res.status(500).json({
            error: "Database error: " + (err.sqlMessage || "Unknown error"),
          });
        }

        console.log("✅ Insert successful:", result);
        res.status(200).json({ message: "Message submitted successfully" });
      }
    );
  };
}

export default ContactData;
