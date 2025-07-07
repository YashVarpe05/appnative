import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "AppNative",
	description: "Bring your ideas to life with AI-powered app creation",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<ClerkProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white items-center`}
					suppressHydrationWarning={true}
				>
					<SidebarProvider>
						<AppSidebar />
						<SidebarTrigger className="fixed top-4 left-4 z-50 md:hidden" />
						{children}
					</SidebarProvider>
				</body>
			</ClerkProvider>
		</html>
	);
}
