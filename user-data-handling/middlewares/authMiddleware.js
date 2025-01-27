import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../utilities/constants.js";

export const auth = async (req, res, next) => {
	try {
		const authHeader = req.header("Authorization");

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(STATUS_CODES.UNAUTHORIZED).json({
				message: "Authentication required",
			});
		}

		const token = authHeader.replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};

export const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "24h",
	});
};
