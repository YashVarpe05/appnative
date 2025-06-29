import { prismaClient } from "../../packages/db/index";

import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";
// Extend Express Request to include userId
declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

const app = express();
// Configure CORS for frontend
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
// Body parser
app.use(express.json());

app.post("/project", authMiddleware, async (req, res) => {
	const { prompt, type } = req.body;
	const userId = (req as any).userId!;
	//TODO: add logic to get a useful name for the project from the prompt
	const description = prompt.split("\n")[0];
	const project = await prismaClient.project.create({
		data: { description, userId, type },
	});
	res.json({ projectId: project.id });
});

app.get("/projects", authMiddleware, async (req, res) => {
	const userId = (req as any).userId!;
	const projects = await prismaClient.project.findMany({
		where: { userId },
	});
	res.json({ projects });
});

const allowedOrigin = "http://localhost:3002";

const server = Bun.serve({
	port: 8081,
	fetch(req) {
		// Handle preflight OPTIONS request
		if (req.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: {
					"Access-Control-Allow-Origin": allowedOrigin,
					"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
					"Access-Control-Allow-Credentials": "true",
				},
			});
		}

		// ... your existing logic for other methods ...
		// For example:
		if (req.method === "POST" && new URL(req.url).pathname === "/project") {
			// your POST logic here
			return new Response("OK", {
				headers: {
					"Access-Control-Allow-Origin": allowedOrigin,
					"Access-Control-Allow-Credentials": "true",
				},
			});
		}

		// Default response
		return new Response("Not found", {
			status: 404,
			headers: {
				"Access-Control-Allow-Origin": allowedOrigin,
				"Access-Control-Allow-Credentials": "true",
			},
		});
	},
});

console.log("Server is running on port 8080");
