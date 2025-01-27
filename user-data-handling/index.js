import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./utilities/db.js";
import userRoutes from "./routes/users/userRoutes.js";
import authRoutes from "./routes/auth/authRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utilities/swagger.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
