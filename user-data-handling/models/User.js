import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		age: { type: Number },
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);	

const User = mongoose.model("User", UserSchema);

export default User;
