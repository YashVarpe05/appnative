"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarSeparator,
	SidebarRail,
} from "@/components/ui/sidebar";

import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

type Project = {
	id: string;
	description: string;
	createdAt: string;
};

function useProjects() {
	const { getToken } = useAuth();
	const [projects, setProjects] = useState<{ [date: string]: Project[] }>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const token = await getToken();
				if (!token) {
					setLoading(false);
					return;
				}

				const response = await axios.get(`${BACKEND_URL}/projects`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const projectsByDate = response.data.projects.reduce(
					(acc: { [date: string]: Project[] }, project: Project) => {
						const date = new Date(project.createdAt).toLocaleDateString(
							"en-US",
							{
								year: "numeric",
								month: "long",
								day: "numeric",
							}
						);
						if (!acc[date]) {
							acc[date] = [];
						}
						acc[date].push(project);
						return acc;
					},
					{}
				);
				setProjects(projectsByDate);
				setError(null);
			} catch (err: unknown) {
				console.error("Failed to fetch projects:", err);
				setError(
					err instanceof Error ? err.message : "Failed to fetch projects"
				);
				setProjects({});
			} finally {
				setLoading(false);
			}
		})();
	}, [getToken]);

	return { projects, loading, error };
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [searchString, setSearchString] = useState("");
	const { projects, loading, error } = useProjects();

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="flex space-between border-2 bg-gray-500/10 focus-within:outline-1 focus-within:outline-teal-300/30 rounded-md pr-2 pl-1">
							<Input
								className="w-full p-1 placeholder:text-gray-400 focus-visible:ring-0 text-sm border-none ouline-none"
								placeholder="Search projects..."
								value={searchString}
								onChange={(e) => setSearchString(e.target.value)}
							/>
							<div className="flex items-center">
								<SearchIcon className="w-5 h-5" />
							</div>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{loading ? (
								<div className="flex items-center justify-center p-4">
									<p className="text-sm text-gray-400">Loading projects...</p>
								</div>
							) : error ? (
								<div className="flex flex-col items-center justify-center p-4 space-y-2">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar text-red-400">
										<GalleryVerticalEnd className="size-4" />
									</div>
									<p className="text-sm text-red-400 text-center">
										Failed to load projects
									</p>
									<p className="text-xs text-gray-500 text-center">
										Make sure the backend is running
									</p>
								</div>
							) : Object.keys(projects).length === 0 ? (
								<div className="flex flex-col items-center justify-center p-4 space-y-2">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar text-teal-400">
										<GalleryVerticalEnd className="size-4" />
									</div>
									<p className="text-sm text-teal-400 text-center">
										No projects found
									</p>
								</div>
							) : (
								Object.keys(projects)
									.sort(
										(a: string, b: string) =>
											new Date(b).getTime() - new Date(a).getTime()
									)
									.map((date, index) => (
										<SidebarMenuItem key={index}>
											<SidebarGroupLabel>{date}</SidebarGroupLabel>
											{projects[date]
												.filter((project: Project) =>
													project.description
														.toLowerCase()
														.includes(searchString.toLowerCase())
												)
												.sort(
													(a: Project, b: Project) =>
														new Date(b.createdAt).getTime() -
														new Date(a.createdAt).getTime()
												)
												.map((project: Project) => (
													<SidebarMenuButton
														asChild
														key={project.id}
														className="my-2 rounded-md"
													>
														<Link href={`/project/${project.id}`}>
															<span className="">
																{project.description.length > 20
																	? `${project.description.substring(0, 50)}...`
																	: project.description}
															</span>
														</Link>
													</SidebarMenuButton>
												))}
											<SidebarSeparator />
										</SidebarMenuItem>
									))
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<span>New Calendar</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
