import connection from "../../DB_Connection/connection.js";



class ScreenController {
    static findOneScreen = (req, res) => {
        console.log(req.body);

        if (!req.body) {
            return res.send({ "status": "faild", "message": "body is empty." })
        }

        // validating request ID here.
        if (!req.body.s_id) {
            return res.send({ "status": "faild", "message": "Screen ID is empty." })
        }

        const query = `SELECT * FROM Screen WHERE s_id = ${req.body.s_id}`;
        connection.query(query, (err, results) => {

            if (err) {
                console.error("❌ Error fetching data:", err);
                return res.send({ status: "error", message: "Failed to fetch Screen" });
            }


            if (results.length === 0) {
                return res.send({ status: "failed", message: "There is no Screen...!!!" });
            }

            const { s_id, s_name, s_description } = results[0];
            return res.status(200).json({ status: "success", message: "Screen Data fetched successfully", data: { s_id, s_name, s_description } });
        });
    };

    static findAllScreen = (req, res) => {
        const query = "SELECT * FROM Screen";

        connection.query(query, (err, results) => {
            if (err) {
                console.error("❌ Error fetching data:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to fetch data",
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "No Screen data found",
                });
            }

            console.log("✅ OUTPUT:", results);

            res.status(200).json({
                status: "success",
                message: "Screen data fetched successfully",
                data: results,
            });
        });
    };

    static updateScreen = (req, res) => {
        if (!req.body) {
            return res.send({ status: "failed", message: "Body is empty." });
        }

        const { s_id, s_name, s_description } = req.body;

        // Check if s_id is provided
        if (!s_id) {
            return res.send({ status: "failed", message: "Screen ID is empty or invalid." });
        }

        // Step 1: Check if the record with s_id exists
        const checkQuery = "SELECT * FROM screen WHERE s_id = ?";
        connection.query(checkQuery, [s_id], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("❌ Error checking screen:", checkErr);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to validate screen ID"
                });
            }

            if (checkResult.length === 0) {
                return res.status(404).json({
                    status: "failed",
                    message: "Screen ID does not exist"
                });
            }

            // Step 2: If exists, update the record
            const updateQuery = `
                UPDATE screen SET 
                    s_name = '${s_name}', 
                    s_description = '${s_description}'
                WHERE s_id = '${s_id}'
            `;

            connection.query(updateQuery, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("❌ Error updating screen:", updateErr);
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to update Screen data"
                    });
                }

                res.status(200).json({
                    status: "success",
                    message: "Screen updated successfully"
                });
            });
        });
    };

    static deleteScreen = (req, res) => {
        console.log(req.body);

        if (!req.body) {
            return res.status(400).json({ status: "failed", message: "Body is empty." });
        }

        const { s_id } = req.body;

        // Validate s_id
        if (s_id === undefined || s_id === null || s_id === '') {
            return res.status(400).json({ status: "failed", message: "Screen ID is empty or invalid." });
        }

        // Step 1: Check if the record with s_id exists
        const checkQuery = "SELECT * FROM screen WHERE s_id = ?";
        connection.query(checkQuery, [s_id], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("❌ Error checking screen:", checkErr);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to validate screen ID"
                });
            }

            if (checkResult.length === 0) {
                return res.status(404).json({
                    status: "failed",
                    message: "Screen ID does not exist"
                });
            }

            // Step 2: Delete the screen
            const deleteQuery = "DELETE FROM screen WHERE s_id = ?";
            connection.query(deleteQuery, [s_id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error("❌ Error deleting data:", deleteErr);
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to delete screen"
                    });
                }

                res.status(200).json({
                    status: "success",
                    message: "Screen deleted successfully"
                });
            });
        });
    };


    static hideShowScreen = (req, res) => {
        if (!req.body) {
            return res.status(400).json({ status: "failed", message: "Body is empty." });
        }

        const { s_id, s_hide_show } = req.body;

        // Validate s_id
        if (s_id === undefined || s_id === null || s_id === '') {
            return res.status(400).json({ status: "failed", message: "Screen ID is empty or invalid." });
        }

        // Validate s_hide_show
        if (typeof s_hide_show !== 'boolean') {
            return res.status(400).json({ status: "failed", message: "Hide/Show must be a boolean value." });
        }

        // Step 1: Check if the record exists
        const checkQuery = "SELECT * FROM screen WHERE s_id = ?";
        connection.query(checkQuery, [s_id], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("❌ Error checking screen:", checkErr);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to validate screen ID"
                });
            }

            if (checkResult.length === 0) {
                return res.status(404).json({
                    status: "failed",
                    message: "Screen ID does not exist"
                });
            }

            // Step 2: Update the hide/show status
            const updateQuery = "UPDATE screen SET s_hide_show = ? WHERE s_id = ?";
            connection.query(updateQuery, [s_hide_show ? 1 : 0, s_id], (err, result) => {
                if (err) {
                    console.error("❌ Error updating hide/show status:", err);
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to update hide/show status"
                    });
                }

                return res.status(200).json({
                    status: "success",
                    message: `Hide/Show status updated to ${s_hide_show}`
                });
            });
        });
    };



    static createScreen = (req, res) => {
        console.log(req.body);

        if (!req.body) {
            return res.status(400).json({ status: "failed", message: "Body is empty." });
        }

        const { s_name, s_description, s_hide_show } = req.body;

        if (!s_name || !s_description || typeof s_hide_show === 'undefined') {
            return res.status(400).json({ status: "failed", message: "Missing required fields." });
        }

        const query = `
            INSERT INTO screen (
                s_name,
                s_description,
                s_hide_show
            ) VALUES ("${s_name}","${s_description}","${s_hide_show ? 1 : 0}")
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("❌ Error inserting data:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to insert a row",
                });
            }

            res.status(200).json({
                status: "success",
                message: "Screen inserted successfully",
            });
        });
    };


}

export default ScreenController;
