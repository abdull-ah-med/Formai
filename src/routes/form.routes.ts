import { Router } from "express";
import { generateForm, reviseForm, finalizeForm } from "../controllers/formController";
import verifyJWT from "../middleware/verifyJWT";
import { formGenerationLimiter, formRevisionLimiter } from "../middleware/rateLimiter";
import User from "../models/user.model";
import { AuthTokenPayload } from "../middleware/verifyJWT";
import { Request, Response } from "express";
import { FormSchema } from "../models/user.model";

const router = Router();

// All form routes are protected, so we apply the middleware to all routes in this file.
router.use(verifyJWT);

/**
 * @route POST /api/form/generate-form
 * @desc Generate a form schema from a text prompt.
 * @access Private
 */
router.post("/generate-form", generateForm);

/**
 * @route POST /api/form/revise-form/:formId
 * @desc Revise a form schema based on feedback.
 * @access Private
 */
router.post("/revise-form/:formId", reviseForm);

/**
 * @route POST /api/form/finalize-form/:formId
 * @desc Finalize a form by creating it in Google Forms.
 * @access Private
 */
router.post("/finalize-form/:formId", finalizeForm);

/**
 * @route GET /api/form/forms/history
 * @desc Get a user's form history
 * @access Private
 */
router.get("/forms/history", async (req: Request, res: Response) => {
        try {
                const userId = (req.user as AuthTokenPayload)?.sub;
                if (!userId) {
                        return res.status(401).json({
                                success: false,
                                error: "Authentication required",
                        });
                }

                const user = await User.findById(userId);
                if (!user) {
                        return res.status(404).json({
                                success: false,
                                error: "User not found",
                        });
                }

                // Map the user's form history to the expected format
                const formHistory = (user.formsHistory || []).map((form, index) => ({
                        id: index.toString(), // Use index as a fallback ID
                        formId: form.formId,
                        title: form.schema?.title || "Untitled Form",
                        createdAt: form.finalizedAt?.toISOString() || new Date().toISOString(),
                        schema: form.schema,
                }));

                return res.status(200).json({
                        success: true,
                        data: formHistory,
                });
        } catch (error: any) {
                console.error("Error fetching form history:", error);
                return res.status(500).json({
                        success: false,
                        error: "Failed to fetch form history",
                });
        }
});

/**
 * @route POST /api/form/forms/history
 * @desc Save a form to history
 * @access Private
 */
router.post("/forms/history", async (req: Request, res: Response) => {
        try {
                const { formId, title } = req.body;
                const userId = (req.user as AuthTokenPayload)?.sub;

                if (!formId) {
                        return res.status(400).json({
                                success: false,
                                error: "Form ID is required",
                        });
                }

                if (!userId) {
                        return res.status(401).json({
                                success: false,
                                error: "Authentication required",
                        });
                }

                const user = await User.findById(userId);
                if (!user) {
                        return res.status(404).json({
                                success: false,
                                error: "User not found",
                        });
                }

                // Check if this form is already in history to avoid duplicates
                const existingFormIndex = (user.formsHistory || []).findIndex((form) => form.formId === formId);
                if (existingFormIndex >= 0) {
                        return res.status(200).json({
                                success: true,
                                message: "Form already exists in history",
                                data: {
                                        id: existingFormIndex.toString(),
                                        formId: formId,
                                },
                        });
                }

                // Initialize formsHistory array if it doesn't exist
                if (!user.formsHistory) {
                        user.formsHistory = [];
                }

                // Create a minimal FormSchema with required properties
                const minimalSchema: FormSchema = {
                        title: title || "Untitled Form",
                        description: "",
                        questions: [], // Empty questions array
                };

                const historyEntry = {
                        schema: minimalSchema,
                        formId: formId,
                        responderUri: "", // Will be populated on finalization
                        finalizedAt: new Date(),
                };

                user.formsHistory.push(historyEntry);

                try {
                        await user.save();
                } catch (saveError) {
                        console.error("Error saving user with form history:", saveError);
                        return res.status(500).json({
                                success: false,
                                error: "Database error while saving form to history",
                        });
                }

                return res.status(201).json({
                        success: true,
                        message: "Form added to history",
                        data: {
                                id: (user.formsHistory.length - 1).toString(),
                                formId: formId,
                        },
                });
        } catch (error: any) {
                console.error("Error saving form to history:", error);
                return res.status(500).json({
                        success: false,
                        error: "Failed to save form to history",
                });
        }
});

export default router;
