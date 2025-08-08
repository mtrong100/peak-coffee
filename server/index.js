import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port: ${PORT}`);
});
