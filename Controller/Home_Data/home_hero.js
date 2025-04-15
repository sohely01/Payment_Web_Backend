import connection from "../../DB_Connection/connection.js";

class HomeHeroData {
  static getHomeHeroData = (req, res) => {
    const query = "SELECT heading FROM Home_Data WHERE id = 1";

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
        console.log(results);
        
      const heading = results[0].heading;

      res.status(200).json({
        status: "success",
        message: "Home heading fetched successfully",
        data: heading,
      });
    });
  };
}

export default HomeHeroData;
