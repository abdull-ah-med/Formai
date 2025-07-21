import { Request, Response } from "express";
import {
	generateSchemaFromPrompt,
	reviseSchemaWithPrompt,
	FormSchema as ClaudeFormSchema,
} from "../utils/claudeClient";
import { createGoogleForm } from "../utils/googleFormService";
import Form, { IForm } from "../models/form.model";
import User from "../models/user.model";
import { convertClaudeSchemaToUserSchema } from "../utils/formSchemaConverter";
import { OAuth2Client } from "google-auth-library";
import { AuthTokenPayload } from "../middleware/verifyJWT";

const isSameDay = (date1: Date, date2: Date) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

export const generateForm = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const user = await User.findById((req.user as AuthTokenPayload).sub);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check daily form creation limit
		if (user.dailyFormCreations && isSameDay(user.dailyFormCreations.date, new Date())) {
			if (user.dailyFormCreations.count >= 5) {
				return res.status(429).json({
					error: "Daily limit reached",
					message: "You have reached the daily limit of 5 form creations.",
				});
			}
		} else {
			// Reset the counter for a new day
			user.dailyFormCreations = { count: 0, date: new Date() };
		}

		const newSchema = await generateSchemaFromPrompt(req.body.prompt);
		const userSchema = convertClaudeSchemaToUserSchema(newSchema);

		const form = new Form({
			userId: user._id,
			prompt: req.body.prompt,
			history: [userSchema],
		});
		await form.save();

		user.dailyFormCreations.count++;
		await user.save();

		res.status(200).json({ success: true, data: { schema: newSchema, formId: form._id } });
	} catch (error: any) {
		res.status(500).json({ error: "Failed to generate form", message: error.message });
	}
};

export const reviseForm = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const form: IForm | null = await Form.findById(req.body.formId);
		if (!form) {
			return res.status(404).json({ error: "Form not found" });
		}
		if (form.revisionHistory.length >= 3) {
			return res.status(403).json({
				error: "Revision limit reached",
				message: "You can only revise a form up to 3 times.",
			});
		}

		const claudeSchema = form.history[form.history.length - 1];
		const newSchema = await reviseSchemaWithPrompt(claudeSchema, req.body.prompt);
		const userSchema = convertClaudeSchemaToUserSchema(newSchema);

		form.history.push(userSchema);
		form.revisionHistory.push({
			prompt: req.body.prompt,
			revisedAt: new Date(),
		});
		await form.save();

		res.status(200).json({
			success: true,
			data: { schema: newSchema, formId: form._id },
		});
	} catch (error: any) {
		res.status(500).json({ error: "Failed to revise form", message: error.message });
	}
};

export const finalizeForm = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		const user = await User.findById((req.user as AuthTokenPayload).sub);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const form: IForm | null = await Form.findById(req.body.formId);
		if (!form) {
			return res.status(404).json({ error: "Form not found" });
		}
		const finalSchema = form.history[form.history.length - 1];

		const oauth2Client = new OAuth2Client();
		oauth2Client.setCredentials({ access_token: user.googleTokens?.accessToken });

		const googleForm = await createGoogleForm(finalSchema, oauth2Client);

		user.formsHistory.push({
			schema: finalSchema,
			formId: googleForm.formId!,
			responderUri: googleForm.responderUri!,
			finalizedAt: new Date(),
		});
		await user.save();

		res.status(200).json({ success: true, googleFormUrl: googleForm.responderUri });
	} catch (error: any) {
		res.status(500).json({ error: "Failed to finalize form", message: error.message });
	}
};
