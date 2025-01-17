import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { userRoutes } from "./Routes/user.Routes.js";
import { adminRoutes } from "./Routes/admin.Routes.js";
import { ApiError } from "./util/errorHandler.js";

dotenv.config({
    path: "./.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credientials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("welcome to Profile Asignment Backend Server...");
});

app.use("/api", userRoutes);
app.use("/api", adminRoutes);

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;

    if (err instanceof ApiError) {
        return res.status(statusCode).json({
            success: err.success,
            error: message,
            statusCode: statusCode,
        });
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode,
    });
});

export default app;
