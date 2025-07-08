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
		<div>
			<Textarea
				placeholder="Enter chess application..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>
			<div className="flex justify-end pt-2">
				<Button
					onClick={async () => {
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
					}}
				>
					<Send />
				</Button>
			</div>
		</div>
	);
}
