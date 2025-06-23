import { Button } from "./button";

export function TemplateButton() {
	return (
		<div className="flex gap-2">
			<Button
				className="cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-green-100 "
				variant="outline"
			>
				Build a chess app
			</Button>
			<Button variant="outline">Create a todo app</Button>
			<Button variant="outline">Create a docs app</Button>
			<Button variant="outline">Create a base app using nativewind</Button>
		</div>
	);
}
