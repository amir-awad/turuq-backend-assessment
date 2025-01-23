import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "User Management API",
			version: "1.0.0",
			description: "API for managing user operations",
		},
		components: {
			schemas: {
				User: {
					type: "object",
					properties: {
						id: { type: "string" },
						name: { type: "string" },
						email: { type: "string" },
						age: { type: "number" },
					},
				},
				CreateUserInput: {
					type: "object",
					properties: {
						name: { type: "string", required: true },
						email: { type: "string", required: true },
						age: { type: "number" },
					},
				},
			},
		},
		tags: [{ name: "Users", description: "User management operations" }],
	},
	apis: ["./routes/users/userRoutes.js"],
};

export default swaggerJsdoc(swaggerOptions);
