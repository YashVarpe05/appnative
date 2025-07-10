export default function ProjectPage({
	params,
}: {
	params: { projectid: string };
}) {
	return <div>Project {params.projectid}</div>;
}
