import mongoose from "mongoose";
import mongooseBcrypt from "mongoose-bcrypt";

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, bcrypt: true },
		age: { type: Number },
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

UserSchema.plugin(mongooseBcrypt);

UserSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
	return userObject;
};

const User = mongoose.model("User", UserSchema);

export default User;
