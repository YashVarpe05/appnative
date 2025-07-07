import { Appbar } from "@/components/ui/Appbar";
import { Prompt } from "@/components/ui/Prompt";
import { TemplateButton } from "@/components/ui/TemplateButton";

export default function Home() {
	return (
		<div className="w-full relative">
			<Appbar /	>
			{/* Gradient background */}

			{/* Content */}
			<div className="relative z-10 w-full">
				<div className="max-w-2xl mx-auto pt-16 md:pt-24 px-4">
					<div className="text-3xl md:text-4xl font-bold text-center text-white">
						What do you want to build?
					</div>
					<div className="text-sm text-gray-400 text-center p-4 max-w-lg mx-auto">
						Prompt, click generate and watch your app come to life
					</div>
					<div className="pt-4">
						<Prompt />
					</div>
				</div>
				<div className="max-w-2xl mx-auto pt-8 px-4">
					<TemplateButton />
				</div>
			</div>
		</div>
	);
}
