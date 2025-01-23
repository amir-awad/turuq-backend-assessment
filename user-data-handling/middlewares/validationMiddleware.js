import { STATUS_CODES } from "../utilities/constants.js";

export const validateRequest = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body, { abortEarly: false });

	if (error) {
		const errorMessages = error.details.map((detail) => detail.message);
		return res.status(STATUS_CODES.BAD_REQUEST).json({
			message: "Validation Error",
			errors: errorMessages,
		});
	}

	next();
};
