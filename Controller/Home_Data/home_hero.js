import connection from "../../DB_Connection/connection.js";

class HomeHeroData {
  
  static getHomeHeroData = (req, res) => {
    const query = "SELECT heading, description FROM Home_Data WHERE id = 1";

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
          message: "No data found for ID = 1",
        });
      }

      const { heading, description } = results[0];

      res.status(200).json({
        status: "success",
        message: "Home data fetched successfully",
        data: {
          heading,
          description,
        },
      });
    });
  };

  static getImgData = (req, res) => {
    const query = "SELECT image FROM home_Data WHERE id = 1";

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
          message: "No data found for ID = 1",
        });
      }

      const image = results[0].image;

      res.status(200).json({
        status: "success",
        data: {
          image,
        },
      });
    });
  };

  static getPaymentData = (req, res) => {
    const query = "SELECT heading, description FROM Home_Data WHERE id = 3";

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
          message: "No data found for ID = 1",
        });
      }

      const { heading, description } = results[0];

      res.status(200).json({
        status: "success",
        message: "Home data fetched successfully",
        data: {
          heading,
          description,
        },
      });
    });
  };

  static getHomeAboutData = (req, res) => {
    const query = "SELECT heading, description FROM Home_Data WHERE id = 2";

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
          message: "No data found for ID = 1",
        });
      }

      const { heading, description } = results[0];

      res.status(200).json({
        status: "success",
        message: "Home data fetched successfully",
        data: {
          heading,
          description,
        },
      });
    });
  };

  static getSectionData = (req, res) => {
    const { titlesection } = req.body;

    if (!Array.isArray(titlesection)) {
      return res.status(400).json({
        status: "error",
        message: "titlesection must be an array",
      });
    }

    // Convert the array to JSON string
    const titleSectionJSON = JSON.stringify(titlesection);

    // Update query to store JSON string
    const query = `UPDATE home_data SET TitleSection = ? WHERE id = 1`;

    connection.query(query, [titleSectionJSON], (err, results) => {
      if (err) {
        console.error("❌ Error updating data:", err);
        return res.status(500).json({
          status: "error",
          message: "Failed to update TitleSection",
        });
      }

      console.log("✅ Update Result:", results);

      return res.status(200).json({
        status: "success",
        message: "TitleSection updated successfully",
        affectedRows: results.affectedRows,
      });
    });
  };

  static getCreateData = (req, res) => {
    const query = "SELECT heading, description FROM Home_Data WHERE id = 4";

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
          message: "No data found for ID = 1",
        });
      }

      const { heading, description } = results[0];

      res.status(200).json({
        status: "success",
        message: "Home data fetched successfully",
        data: {
          heading,
          description,
        },
      });
    });
  };
}

export default HomeHeroData;
