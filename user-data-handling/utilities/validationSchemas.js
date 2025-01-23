import Joi from "joi";

export const createUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	age: Joi.number().integer().min(0).optional(),
});

export const updateUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).optional(),
	email: Joi.string().email().optional(),
	age: Joi.number().integer().min(0).optional(),
}).or("name", "email", "age");
