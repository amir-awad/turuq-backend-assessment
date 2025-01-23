import { STATUS_CODES, ERROR_CODES } from "../utilities/constants.js";

const errorHandler = (err, req, res, next) => {
	console.error(err);

	const message = err.message || ERROR_CODES.SERVER_ERROR;

	if (err.name === "ValidationError") {
		return res.status(STATUS_CODES.BAD_REQUEST).json({
			message: message,
			error: err.errors,
		});
	}

	return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
		message: message,
		error: err.stack,
	});
};

export default errorHandler;
