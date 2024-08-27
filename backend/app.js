import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import reqRouter from "./routes/reqRouter.js";
import userRouter from "./routes/userRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/request", reqRouter);
app.use("/api/v1/payment", paymentRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
