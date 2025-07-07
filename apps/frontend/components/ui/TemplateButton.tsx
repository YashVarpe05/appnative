import { Button } from "./button";

export function TemplateButton() {
	return (
		<div>
			<div className="mb-4 text-center text-sm text-gray-500">
				Or try one of these templates
			</div>
			<div className="flex flex-wrap gap-2 justify-center">
				<Button
					className="cursor-pointer border border-gray-800 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
					variant="outline"
				>
					Build a chess app
				</Button>
				<Button
					className="cursor-pointer border border-gray-800 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
					variant="outline"
				>
					Create a todo app
				</Button>
				<Button
					className="cursor-pointer border border-gray-800 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
					variant="outline"
				>
					Create a docs app
				</Button>
				<Button
					className="cursor-pointer border border-gray-800 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
					variant="outline"
				>
					App with nativewind
				</Button>
			</div>
		</div>
	);
}
