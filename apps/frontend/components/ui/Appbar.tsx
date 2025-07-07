import { Button } from "@/components/ui/button";
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";

export function Appbar() {
	return (
		<div className="flex justify-between items-center py-6 px-2 max-w-5xl mx-auto w-full">
			<div className="text-xl font-bold text-white">AppNative</div>
			<div className="flex items-center gap-4">
				<SignedOut>
					<SignInButton>
						<Button variant="ghost" className="text-white hover:bg-gray-900">
							Sign In
						</Button>
					</SignInButton>
					<SignUpButton>
						<Button className="bg-white text-black hover:bg-gray-200">
							Sign Up
						</Button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<UserButton
						afterSignOutUrl="/"
						appearance={{
							elements: {
								userButtonAvatarBox: "border-2 border-white",
							},
						}}
					/>
				</SignedIn>
			</div>
		</div>
	);
}
