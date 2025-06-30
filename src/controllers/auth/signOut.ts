import { Request, Response } from "express";

export const logoutUser = async (_: Request, res: Response) => {
        // Clear the token cookie with proper cross-domain settings
        res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:
                        process.env.NODE_ENV === "production" ? "none" : "lax",
                path: "/",
        });

        res.status(200).json({ success: true, message: "Logged out" });
};
