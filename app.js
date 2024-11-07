import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import weatherRoutes from "./routes/weather.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.port || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as templating engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
