import connection from "../../DB_Connection/connection.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const SECRET = 'your_jwt_secret_key';


class UserFormController {
    static register = async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "All fields are required.",
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = `CALL RegisterUser(?, ?, ?)`;
            connection.query(query, [name, email, hashedPassword], (err, results) => {
                if (err) {
                    if (err.sqlState === '45000') {
                        return res.status(409).json({
                            status: "failed",
                            message: err.sqlMessage || "Email already registered.",
                        });
                    }

                    console.error("❌ Error during registration:", err);
                    return res.status(500).json({
                        status: "error",
                        message: "Database error.",
                    });
                }

                // Optional: you can fetch last inserted ID here if needed.
                // Generate token (you might need to get last insert ID some other way)
                const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });

                return res.status(201).json({
                    status: "success",
                    message: "User registered successfully.",
                    token,
                });
            });
        } catch (hashError) {
            console.error("❌ Error hashing password:", hashError);
            return res.status(500).json({ status: "error", message: "Internal server error." });
        }
    };



    static login = async (req, res) => {
        const { email, password } = req.body;
        //// empty body


        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Email and password are required.",
            });
        }

        const query = `CALL LoginUser(?)`;

        connection.query(query, [email], async (err, results) => {
            if (err) {
                console.error("❌ Error calling stored procedure:", err);
                return res.status(500).json({ status: "error", message: "Database error." });
            }

            // Stored procedures return results in an array of arrays
            const userRows = results[0];

            if (userRows.length === 0) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid email or password.",
                });
            }

            const user = userRows[0];

            try {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(401).json({
                        status: "failed",
                        message: "Invalid email or password.",
                    });
                }

                const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

                return res.status(200).json({
                    status: "success",
                    message: "Login successful",
                    token,
                });
            } catch (compareError) {
                console.error("❌ Error comparing passwords:", compareError);
                return res.status(500).json({ status: "error", message: "Internal server error." });
            }
        });
    };

}


export default UserFormController;