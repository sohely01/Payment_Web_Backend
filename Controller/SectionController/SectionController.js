import connection from "../../DB_Connection/connection.js";

class SectionController {
    static findOneSection = (req, res) => {
        if (!req.body) {
            return res.send({ status: "failed", message: "body is empty." });
        }

        if (!req.body.id) {
            return res.send({ status: "failed", message: "Section ID is empty." });
        }

        const query = "SELECT heading, description, s_image, sectionData FROM sections WHERE id = ? AND s_hide_show = ?";
        connection.query(query, [req.body.id, 1], (err, results) => {
            if (err) {
                console.error("❌ Error fetching data:", err);
                return res.send({ status: "error", message: "Failed to fetch data" });
            }

            if (results.length === 0) {
                return res.send({ status: "failed", message: "There is no section...!!!" });
            }

            const { heading, description, s_image, sectionData } = results[0];

            const imageBase64 = s_image
                ? `data:image/jpeg;base64,${Buffer.from(s_image).toString("base64")}`
                : null;






            return res.status(200).json({
                status: "success",
                message: "section Data fetched successfully",
                data: {
                    heading,
                    description,
                    s_image: imageBase64,
                    sectionData,
                },
            });
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

        // Check for empty body
        if (!req.body) { return res.send({ "status": "failed", "message": "Request body is empty." }) }

        const { id, heading, description, sectionData } = req.body;
        if (!id) { return res.status(400).json({ status: "failed", message: "Section ID is required." }) }

        // Step 1: Check if record exists
        const checkQuery = `SELECT * FROM sections WHERE id = ${id}`;
        connection.query(checkQuery, (checkErr, checkResult) => {
            if (checkErr) {
                console.error("❌ Error checking section:", checkErr.sqlMessage || checkErr);
                return res.status(500).json({ status: "error", message: "Error validating Section ID" });
            }

            if (checkResult.length === 0) {
                return res.status(404).json({ status: "failed", message: "Section ID does not exist." });
            }
        });

        // Step 2: Update the section
        const sectionDataString = JSON.stringify(sectionData); // Convert array to JSON string

        const updateQuery = "UPDATE sections SET heading = ?, description = ?, sectionData = ? WHERE id = ?";
        connection.query(updateQuery, [heading, description, sectionDataString, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("❌ Error updating section:", updateErr.sqlMessage || updateErr);
                return res.status(500).json({ status: "error", message: "Error updating section" });
            }

            if (updateResult.affectedRows === 0) {
                return res.status(400).json({ status: "failed", message: "No rows were updated." });
            }

            return res.status(200).json({ status: "success", message: "Section updated successfully." });
        });

    };

    static deleteSection = (req, res) => {
        console.log(req.body);

        if (!req.body) {
            return res.status(400).json({ status: "failed", message: "Body is empty." });
        }

        const { id } = req.body;

        // Validate s_id
        if (id === undefined || id === null || id === '') {
            return res.status(400).json({ status: "failed", message: "sections ID is empty or invalid." });
        }

        // Step 1: Check if the record with s_id exists
        const checkQuery = "SELECT * FROM sections WHERE id = ?";
        connection.query(checkQuery, [id], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("❌ Error checking sections:", checkErr);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to validate sections ID"
                });
            }

            if (checkResult.length === 0) {
                return res.status(404).json({
                    status: "failed",
                    message: "sections ID does not exist"
                });
            }

            // Step 2: Delete the sections
            const deleteQuery = "DELETE FROM sections WHERE id = ?";
            connection.query(deleteQuery, [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error("❌ Error deleting data:", deleteErr);
                    return res.status(500).json({
                        status: "error",
                        message: "Failed to delete sections"
                    });
                }

                res.status(200).json({
                    status: "success",
                    message: "sections deleted successfully"
                });
            });
        });
    };

    static hideShowSection = (req, res) => {
        if (!req.body) {
            return res.send({ status: "failed", message: "Body is empty." });
        }

        const { id, s_hide_show } = req.body;

        if (!id) {
            return res.send({ status: "failed", message: "ID is invalid." });
        }

        if (typeof s_hide_show !== 'boolean') {
            return res.send({ status: "failed", message: "Hide/Show must be a boolean." });
        }

        const query = `UPDATE sections SET s_hide_show = ? WHERE id = ?`;

        connection.query(query, [s_hide_show ? 1 : 0, id], (err, result) => {
            if (err) {
                console.error("❌ Error updating hide/show status:", err);
                return res.status(500).json({ status: "error", message: "Failed to update hide/show status" });
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({ status: "failed", message: "Invalid ID. No section found with the given ID." });
            }

            return res.status(200).json({
                status: "success",
                message: `Hide/Show status updated to ${s_hide_show}`
            });
        });
    };


    static createSection = (req, res) => {
        if (!req.body) {
            return res.send({ status: "failed", message: "Body is empty." });
        }

        const { heading, description, s_image, sectiondata, s_hide_show, screen_id } = req.body;



        const query = `
           INSERT INTO sections (
            heading,
            description,
            sectiondata,
            s_hide_show,
            screen_id
        ) VALUES ("${heading}","${description}","${sectiondata}",${s_hide_show ? 1 : 0},"${screen_id}")
    
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


    static getSectionDetailsByScreenId = (req, res) => {
        if (!req.body) {
            return res.send({ status: "failed", message: "Body is empty." });
        }

        const { screen_id } = req.body;


        // Ensure your query uses proper parameterized inputs to avoid SQL injection
        const query = `SELECT * FROM sections WHERE screen_Id = screen_id?`;

        // Use parameterized query to prevent SQL injection
        connection.query(query, [screen_id,], (err, result) => {
            if (err) {
                console.error("❌ Error fetching data:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to fetch data",
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    status: "failed",
                    message: "No section found matching the criteria",
                });
            }

            res.status(200).json({
                status: "success",
                message: "Section found successfully",
                data: result,
            });
        });
    };

}

export default SectionController;
