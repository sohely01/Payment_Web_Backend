import connection from "../../DB_Connection/connection.js";

class ContactformController {
    static addMessage = (req, res) => {
        if (!req.body) {
            return res.send({ status: "failed", message: "Body is empty." });
        }

        const { name, email, mobile, subject, message } = req.body;

        if (!name || !email || !mobile || !subject || !message) {
            return res.send({ status: "failed", message: "All fields are required." });
        }

        const query = `
          INSERT INTO message (name, email, mobile, subject, message)
          VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(query, [name, email, mobile, subject, message], (err, result) => {
            if (err) {
                console.error("❌ Error inserting data:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to insert a row",
                });
            }

            console.log("Data inserted successfully:", result); // Log the result to check
            res.status(200).json({
                status: "success",
                message: "Message inserted successfully",

            });
        });
    };
}

export default ContactformController;
