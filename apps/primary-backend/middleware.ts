import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization; //Bearer token
	if (!token) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}
	const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
		algorithm: ["RS256"],
	});
	if (!decoded) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	const userId = (decoded as any).payload.sub;
	if (!userId) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	req.userId = userId;
	next();
}
