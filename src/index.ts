import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import dotenv from "dotenv";
import router from "./routes/router.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.listen(PORT, () => {
  console.log("server started");
  pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.error("DB CONNECTION ERROR: ", err.stack);
      process.exit(1);
    }
    console.log("Postgres connected. DB Time: ", res.rows[0].now);
  });
});
