// import { prismaClient } from "./../../packages/db/index";
import cors from "cors";
import express from "express";
import { prismaClient } from "db/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "./systemPrompt";
import { ArtifactProcessor } from "./parser";
import { onFileUpdate, onShellCommand } from "./os";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyCoAhypjel8eCXZMpBkecY_eo-fXxRPH_Y");

app.post("/prompt", async (req, res) => {
	const { prompt, projectId } = req.body;
	await prismaClient.prompt.create({
		data: {
			content: prompt,
			projectId,
			type: "USER",
		},
	});
	const allPrompts = await prismaClient.prompt.findMany({
		where: {
			projectId,
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const chat = model.startChat({
		history: allPrompts.map((p: any) => ({
			role: p.type === "USER" ? "user" : "model",
			parts: [{ text: p.content }],
		})),
		generationConfig: {
			maxOutputTokens: 8000,
		},
		systemInstruction: systemPrompt,
	});

	const result = await chat.sendMessageStream(prompt);

	let artifactProcessor = new ArtifactProcessor(
		"",
		onFileUpdate,
		onShellCommand
	);
	let artifact = "";
	(async () => {
		for await (const chunk of result.stream) {
			const chunkText = chunk.text();
			artifactProcessor.append(chunkText);
			artifactProcessor.parse();
			artifact += chunkText;
		}
		console.log("Done!");
		await prismaClient.prompt.create({
			data: {
				content: artifact,
				projectId,
				type: "SYSTEM",
			},
		});
	})();

	res.json({ response: "ok" });
});

app.listen(9091, () => {
	console.log("Server is running on port 9091");
});
