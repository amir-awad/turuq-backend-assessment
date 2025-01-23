import { UserRepository } from "../../repositories/users/UserRepository.js";
import { STATUS_CODES } from "../../utilities/constants.js";

const userRepository = new UserRepository();

export class UserController {
	async createUser(req, res, next) {
		try {
			const user = await userRepository.createUser(req.body);
			res.status(STATUS_CODES.CREATED).json(user);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req, res, next) {
		try {
			const { page = 1, limit = 10, age } = req.query;
			const users = await userRepository.getUsers(page, limit, age);
			res.status(STATUS_CODES.OK).json(users);
		} catch (error) {
			next(error);
		}
	}

	async getUserById(req, res, next) {
		try {
			const user = await userRepository.getUserById(req.params.id);
			if (user) {
				res.status(STATUS_CODES.OK).json(user);
			} else {
				res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
			}
		} catch (error) {
			next(error);
		}
	}

	async updateUser(req, res, next) {
		try {
			const user = await userRepository.updateUser(req.params.id, req.body);
			if (user) {
				res.status(STATUS_CODES.OK).json(user);
			} else {
				res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
			}
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req, res, next) {
		try {
			const user = await userRepository.deleteUser(req.params.id);
			if (user) {
				res.status(STATUS_CODES.NO_CONTENT).send();
			} else {
				res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
			}
		} catch (error) {
			next(error);
		}
	}
}
