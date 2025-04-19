import connection from "../../DB_Connection/connection.js";

class SectionController {
    static findOneSection = (req, res) => {
        console.log(req.body);

        if (!req.body) {
            return res.send({ "status": "faild", "message": "body is empty." })
        }

        // validating request ID here.
        if (!req.body.id) {
            return res.send({ "status": "faild", "message": "Section ID is empty." })
        }

        const query = `SELECT heading, description,s_image FROM sections WHERE id = ${req.body.id}`;
        connection.query(query, (err, results) => {

            if (err) {
                console.error("❌ Error fetching data:", err);
                return res.send({ status: "error", message: "Failed to fetch data" });
            }

            // console.log("OUTPUT:", results.length);

            if (results.length === 0) {
                return res.send({ status: "failed", message: "There is no section...!!!" });
            }

            const { heading, description, image } = results[0];
            return res.status(200).json({ status: "success", message: "section Data fetched successfully", data: { heading, description, image } });
        });
    };

    static findAllSection = (req, res) => {
        const query = "SELECT * FROM sections";

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
                    message: "No section data found",
                });
            }

            console.log("✅ OUTPUT:", results);

            res.status(200).json({
                status: "success",
                message: "Section data fetched successfully",
                data: results,
            });
        });
    };

    static updateSection = (req, res) => {

        if (req.method !== 'POST') {
            return res.status(405).json({
                status: "failed",
                message: "Method Not Allowed. Only POST requests are accepted."
            });
        }
        if (!req.body) {
            return res.status(400).json({ status: "failed", message: "Request body is empty." });
        }

        const { id, heading, description } = req.body;

        // Validate ID
        if (!id) {
            return res.status(400).json({ status: "failed", message: "Section ID is empty or invalid." });
        }

        // Step 1: Check if record with given ID exists
        const checkQuery = "SELECT * FROM sections  WHERE id = ?";
        connection.query(checkQuery, [id], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("❌ Error checking sections:", checkErr.sqlMessage || checkErr);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to validate Section ID"
                });
            }

            if (checkResult.length === 0) {
                return res.status(404).json({
                    status: "failed",
                    message: "Section ID does not exist"
                });
            }

            // Step 2: Update the section
            const updateQuery = `
                UPDATE sections SET 
                    heading = ?, 
                    description = ?
                WHERE id = ?
            `;

            connection.query(updateQuery, [heading, description, id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("❌ Error updating sections:", updateErr.sqlMessage || updateErr);
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to update sections data"
                    });
                }

                // If no rows affected, let user know (optional)
                if (updateResult.affectedRows === 0) {
                    return res.status(400).json({
                        status: "failed",
                        message: "No rows were updated"
                    });
                }

                // ✅ Success
                return res.status(200).json({
                    status: "success",
                    message: "sections updated successfully"
                });
            });
        });
    };




    static deleteSection = (req, res) => {

        console.log(req.body);

        if (!req.body) {
            return res.send({ "status": "faild", "message": "body is empty." })
        }

        // validating request ID here.
        if (!req.body.id) {
            return res.send({ "status": "faild", "message": "Section ID is empty." })
        }
        const { id } = req.body;

        if (id === 0 || id === undefined || id === null) {
            return res.send({ status: "failed", message: "ID is invalid." });
        }

        const query = `
          DELETE FROM sections
          WHERE id = ${req.body.id}
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("❌ Error deleting data:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to delete data",
                });
            }

            res.status(200).json({
                status: "success",
                message: "Row deleted successfully",
            });
        });
    };

    static hideShowSection = (req, res) => {
        // console.log(req.body);

        if (!req.body) {
            return res.send({ status: "failed", message: "Body is empty." });
        }

        const { id, hide_show } = req.body;

        if (!id) {
            return res.send({ status: "failed", message: "ID is invalid." });
        }

        if (!hide_show && typeof hide_show !== 'boolean') {
            return res.send({ status: "failed", message: "Hide/Show must be a boolean." });
        }

        const query = `UPDATE sections SET s_hide_show = ${hide_show ? 1 : 0} WHERE id = ${req.body.id}`;
        connection.query(query, (err, result) => {
            if (err) {
                console.error("❌ Error updating hide/show status:", err);
                return res.status(500).json({ status: "error", message: "Failed to update hide/show status" });
            }

            return res.status(200).json({ status: "success", message: `Hide/Show status updated to ${hide_show}` });
        });
    };

    static createSection = (req, res) => {
        if (!req.body) {
            return res.send({ status: "failed", message: "Body is empty." });
        }

        const { heading, description, s_image, sectiondata, s_hide_show, sections_id } = req.body;



        const query = `
           INSERT INTO sections (
            heading,
            description,
            sectiondata,
            s_hide_show,
            sections_id
        ) VALUES ("${heading}","${description}","${sectiondata}",${s_hide_show ? 1 : 0},"${sections_id}")
    
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("❌ Error updating data:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to Insert a row ",
                });
            }

            res.status(200).json({
                status: "success",
                message: "Section Inserted successfully",
            });
        });
    };







}

export default SectionController;
