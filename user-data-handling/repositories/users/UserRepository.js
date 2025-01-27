import User from "../../models/User.js";

export class UserRepository {
	async createUser(userData) {
		const user = new User(userData);
		return user.save();
	}

	async getUserByEmail(email) {
		return User.findOne({ email });
	}

	async getUsers(page, limit, age) {
		const query = age ? { age } : {};
		return User.find(query)
			.skip((page - 1) * limit)
			.limit(limit);
	}

	async getUserById(userId) {
		return User.findById(userId);
	}

	async updateUser(userId, userData) {
		return User.findByIdAndUpdate(userId, userData, { new: true });
	}

	async deleteUser(userId) {
		return User.findByIdAndDelete(userId);
	}
}
