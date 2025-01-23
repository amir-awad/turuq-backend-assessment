import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI);
		console.log("MongoDB Connected");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};
