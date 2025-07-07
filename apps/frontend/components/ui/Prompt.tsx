"use client";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Send, Sparkle } from "lucide-react";
// import { Prompt } from "@/components/Prompt";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/config";

export function Prompt() {
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);
	const { getToken } = useAuth();

	const handleSubmit = async () => {
		if (!prompt.trim()) return;

		try {
			setLoading(true);
			const token = await getToken();
			const response = await axios.post(
				`${BACKEND_URL}/project`,
				{
					prompt: prompt,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data);
			// You can add navigation or notification here
		} catch (error) {
			console.error("Error submitting prompt:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full bg-gray-900 rounded-lg border border-gray-800 p-4">
			<Textarea
				placeholder="Enter what you want to build, e.g., 'A chess app with multiplayer support'..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				className="min-h-[100px] bg-transparent border-gray-800 focus:border-blue-600 text-white placeholder:text-gray-500"
			/>
			<div className="flex justify-between items-center pt-3">
				<div className="text-xs text-gray-500 flex items-center">
					<Sparkle size={14} className="mr-1" /> Powered by AI
				</div>
				<Button
					onClick={handleSubmit}
					disabled={loading || !prompt.trim()}
					className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 transition-all"
				>
					{loading ? "Generating..." : "Generate"}
					{!loading && <Send size={16} className="ml-2" />}
				</Button>
			</div>
		</div>
	);
}
