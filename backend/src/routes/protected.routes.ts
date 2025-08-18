import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT"; // or whatever middleware you're using

const router = Router();

router.get("/protected", verifyJWT, (req, res) => {
        res.json({ message: "Access granted to protected route" });
});

// Debug route to check authentication status and token
router.get("/auth-debug", verifyJWT, (req, res) => {
        res.json({
                message: "Authentication debug info",
                user: req.user,
                hasCookies: !!req.cookies?.token,
                hasAuthHeader: !!req.headers.authorization,
                cookies: req.cookies,
        });
});

export default router;
