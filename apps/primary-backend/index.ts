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
		origin: ["http://localhost:3000", "http://localhost:3001"],
		credentials: true,
	})
);
// Body parser
app.use(express.json());

// Test endpoint (no auth required)
app.get("/test", (req, res) => {
	res.json({ message: "Backend is working!", timestamp: new Date().toISOString() });
});

app.post("/project", authMiddleware, async (req, res) => {
	const { prompt } = req.body;
	const userId = (req as any).userId!;
	//TODO: add logic to get a useful name for the project from the prompt
	const description = prompt.split("\n")[0];
	const project = await prismaClient.project.create({
		data: { description, userId },
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

// Start the Express server directly
app.listen(8082, () => {
	console.log("Server is running on port 8082");
});
