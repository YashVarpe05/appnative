import { Appbar } from "@/components/ui/Appbar";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/components/ui/Prompt";
import { TemplateButton } from "@/components/ui/TemplateButton";
import Image from "next/image";

export default function Home() {
	return (
		<div className="p-4">
			<Appbar />
			<div className="max-w-2xl mx-auto pt-32">
				<div className="text-2xl font-bold text-center">
					What do you want to build?
				</div>
				<div className="text-sm text-muted-foreground text-center p-4">
					Prompt, click generate and watch your app come to life
				</div>
				<div className="pt-4">
					<Prompt />
				</div>
			</div>
			<div className="max-w-2xl mx-auto pt-4">
				<TemplateButton />
			</div>
		</div>
	);
}
