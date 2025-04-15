import express from "express";
import route from "./routes/routes_index.js";
import cors from 'cors';



const app = express();
const PORT = 8989;

app.use(cors());



// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Users API....");
});



app.use('/api',route);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started on: http://localhost:${PORT}`);
});
