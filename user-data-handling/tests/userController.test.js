import request from "supertest";
import express from "express";
import { UserController } from "../controllers/users/UserController.js";
import { UserRepository } from "../repositories/users/UserRepository.js";
import { STATUS_CODES } from "../utilities/constants.js";

jest.mock("../repositories/users/UserRepository.js");

const app = express();
app.use(express.json());

const userController = new UserController();

app.post("/users", (req, res, next) =>
	userController.createUser(req, res, next),
);
app.get("/users", (req, res, next) => userController.getUsers(req, res, next));
app.get("/users/:id", (req, res, next) =>
	userController.getUserById(req, res, next),
);
app.put("/users/:id", (req, res, next) =>
	userController.updateUser(req, res, next),
);
app.delete("/users/:id", (req, res, next) =>
	userController.deleteUser(req, res, next),
);

describe("UserController", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create a new user", async () => {
		const newUser = {
			name: "Amir Tarek",
			email: "amir.tarek@gmail.com",
			age: 30,
		};

		UserRepository.prototype.createUser.mockResolvedValue(newUser);

		const response = await request(app).post("/users").send(newUser);

		expect(response.status).toBe(STATUS_CODES.CREATED);
		expect(response.body).toEqual(newUser);
	});

	it("should return a list of users with pagination", async () => {
		const users = [
			{ name: "Amir Tarek", email: "amir.tarek@gmail.com", age: 30 },
			{ name: "Mero Awad", email: "mero.awad@gmail.com", age: 28 },
		];

		UserRepository.prototype.getUsers.mockResolvedValue(users);

		const response = await request(app).get("/users?page=1&limit=2");

		expect(response.status).toBe(STATUS_CODES.OK);
		expect(response.body).toEqual(users);
	});

	it("should return a user by ID", async () => {
		const user = { name: "Amir Tarek", email: "amir.tarek@gmail.com", age: 30 };

		UserRepository.prototype.getUserById.mockResolvedValue(user);

		const response = await request(app).get("/users/1");

		expect(response.status).toBe(STATUS_CODES.OK);
		expect(response.body).toEqual(user);
	});

	it("should return 404 if user not found by ID", async () => {
		UserRepository.prototype.getUserById.mockResolvedValue(null);

		const response = await request(app).get("/users/999");

		expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
		expect(response.body).toHaveProperty("message", "User not found");
	});

	it("should update an existing user", async () => {
		const updatedUser = {
			name: "Ahmed Ali",
			email: "ahmed.ali@gmail.com",
			age: 35,
		};

		UserRepository.prototype.updateUser.mockResolvedValue(updatedUser);

		const response = await request(app).put("/users/1").send(updatedUser);

		expect(response.status).toBe(STATUS_CODES.OK);
		expect(response.body).toEqual(updatedUser);
	});

	it("should return 404 when updating a non-existing user", async () => {
		UserRepository.prototype.updateUser.mockResolvedValue(null);

		const updatedUser = {
			name: "Ahmed Ali",
			email: "ahmed.ali@gmail.com",
			age: 35,
		};

		const response = await request(app).put("/users/999").send(updatedUser);

		expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
		expect(response.body).toHaveProperty("message", "User not found");
	});

	it("should delete an existing user", async () => {
		UserRepository.prototype.deleteUser.mockResolvedValue(true);

		const response = await request(app).delete("/users/1");

		expect(response.status).toBe(STATUS_CODES.NO_CONTENT);
	});

	it("should return 404 when deleting a non-existing user", async () => {
		UserRepository.prototype.deleteUser.mockResolvedValue(null);

		const response = await request(app).delete("/users/999");

		expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
		expect(response.body).toHaveProperty("message", "User not found");
	});
});
