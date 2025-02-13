import express from "express";
import connectDB from "./config/db.js";
import Routers from "./routes/routes.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use("/api", Routers);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Serverda  xatolik yuz berdi.";
  console.error(` Xatolik: ${message}`);
  res.status(status).json({ success: false, error: message });
});

const PORT = process.env.PORT || 8080;
const URL = process.env.DB_URL;

const running = async () => {
  try {
    await connectDB(URL);
    console.log(`DB Connected`);
    app.listen(PORT, () => console.log(`Server is running : ${PORT}`));
  } catch ({ message }) {
    console.error(message);
  }
};
running();
// console.log("DB_URL:", URL);

// console.log("PORT:", process.env.PORT);
// console.log("DB_URL:", process.env.DB_URL);
// console.log("JWT_SK:", process.env.JWT_SK);
