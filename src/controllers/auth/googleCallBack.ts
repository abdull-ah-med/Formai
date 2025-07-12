// src/controllers/auth/googleCallBack.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user.model";
import { OAuth2Client } from "google-auth-library";

const { JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FRONTEND_URL } = process.env;

if (!JWT_SECRET || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !FRONTEND_URL) {
        throw new Error("Missing required OAuth environment variables");
}

export const googleCallback = async (req: Request, res: Response) => {
        try {
                const { code, state } = req.query as {
                        code?: string;
                        state?: string;
                };
                if (!code) {
                        return res.status(400).json({
                                success: false,
                                error: "Missing authorization code",
                                message: "No authorization code was provided in the callback",
                        });
                }

                console.log("Processing Google OAuth callback with code");

                // Use environment variable for redirect URI, ensuring no trailing slash
                const redirectUri = `${(FRONTEND_URL || "").replace(/\/$/, "")}/auth/google/callback`;
                console.log("Using redirect URI:", redirectUri);

                // Include clientSecret in production for secure exchanges
                const client = new OAuth2Client({
                        clientId: GOOGLE_CLIENT_ID,
                        clientSecret: GOOGLE_CLIENT_SECRET,
                        redirectUri,
                });

                // Exchange code for tokens, explicitly passing redirectUri
                console.log("Exchanging code for tokens...");
                const { tokens } = await client.getToken({
                        code,
                        redirect_uri: redirectUri,
                });

                if (!tokens.access_token) {
                        console.error("No access token received from Google");
                        return res.status(400).json({
                                success: false,
                                error: "No access token received",
                                message: "Failed to obtain access token from Google",
                        });
                }

                console.log("Received tokens from Google. Verifying ID token...");
                // Check if we got a refresh token (needed for Google Forms API)
                const hasRefreshToken = !!tokens.refresh_token;
                console.log("Refresh token received:", hasRefreshToken ? "Yes" : "No");

                // Verify the ID token
                const ticket = await client.verifyIdToken({
                        idToken: tokens.id_token!,
                        audience: GOOGLE_CLIENT_ID,
                });

                const payload = ticket.getPayload();
                if (!payload?.email) {
                        return res.status(400).json({
                                success: false,
                                error: "Invalid Google user",
                                message: "Could not retrieve email from Google account",
                        });
                }

                console.log("Google account verified for email:", payload.email);

                // Find or create user in your DB
                let user = await User.findOne({ email: payload.email });
                if (!user) {
                        console.log("Creating new user for:", payload.email);
                        user = await User.create({
                                fullName: payload.name || "Google User",
                                email: payload.email,
                                googleId: payload.sub,
                                googleTokens: {
                                        accessToken: tokens.access_token!,
                                        refreshToken: tokens.refresh_token,
                                        expiryDate: tokens.expiry_date || Date.now() + 3600 * 1000,
                                },
                        });
                } else {
                        console.log("Updating existing user:", payload.email);
                        // Check if user already has a different Google ID linked
                        if (user.googleId && user.googleId !== payload.sub) {
                                return res.status(400).json({
                                        success: false,
                                        error: "Account conflict",
                                        message: "This account is already linked to a different Google account.",
                                });
                        }

                        // If no Google ID yet, link it
                        if (!user.googleId) user.googleId = payload.sub;

                        // Always update the Google tokens
                        user.googleTokens = {
                                accessToken: tokens.access_token!,
                                refreshToken: tokens.refresh_token || user.googleTokens?.refreshToken,
                                expiryDate: tokens.expiry_date || Date.now() + 3600 * 1000,
                        };

                        user.lastLogin = new Date();
                        await user.save();
                }

                // Sign your JWT
                const token = jwt.sign({ sub: user._id, email: user.email, role: user.role }, JWT_SECRET, {
                        expiresIn: "30d",
                        audience: "api:auth",
                        issuer: "auth-service",
                });

                // Set cookie with proper cross-domain settings for production
                res.cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                        path: "/",
                        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });

                console.log("Authentication successful, returning token");

                // Finally redirect back to your frontend app
                return res.status(200).json({
                        success: true,
                        message: "Login successful",
                        token,
                        hasFormsScope: true, // We requested the forms scope in the OAuth URL
                        hasRefreshToken,
                });
        } catch (err: any) {
                console.error("Google OAuth callback error:", err);

                // Log detailed error information
                if (err.response) {
                        console.error("Error response data:", err.response.data);
                }

                // Return a more helpful error message
                return res.status(500).json({
                        success: false,
                        error: "OAuth callback failed",
                        message: err.message || "An error occurred during Google authentication",
                        details: process.env.NODE_ENV !== "production" ? err.toString() : undefined,
                });
        }
};
