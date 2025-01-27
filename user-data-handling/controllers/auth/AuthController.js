import { UserRepository } from "../../repositories/users/UserRepository.js";
import { STATUS_CODES } from "../../utilities/constants.js";
import { generateToken } from "../../middlewares/authMiddleware.js";

const userRepository = new UserRepository();

export class AuthController {
	async register(req, res, next) {
		try {
			const user = await userRepository.createUser(req.body);
			res.status(STATUS_CODES.CREATED).json({
				user,
			});
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await userRepository.getUserByEmail(email);

			if (!user) {
				return res.status(STATUS_CODES.UNAUTHORIZED).json({
					message: "Invalid email or password",
				});
			}

			const isValidPassword = await user.verifyPassword(password);

			if (!isValidPassword) {
				return res.status(STATUS_CODES.UNAUTHORIZED).json({
					message: "Invalid email or password",
				});
			}

			const token = generateToken(user._id);

			res.status(STATUS_CODES.OK).json({
				user,
				token,
			});
		} catch (error) {
			next(error);
		}
	}
}
