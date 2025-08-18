import { z } from "zod";

export const choiceOptionSchema = z.object({
	label: z.string().min(1).optional(),
	text: z.string().min(1).optional(),
	goTo: z.union([
		z.literal("NEXT_SECTION"),
		z.literal("SUBMIT_FORM"),
		z.string().min(1), // section title
	]),
});

export const formFieldSchema = z.object({
	label: z.string().min(1),
	type: z.enum([
		"radio",
		"select",
		"checkbox",
		"text",
		"textarea",
		"email",
		"number",
		"tel",
		"date",
		"time",
		"url",
		"rating",
	]),
	required: z.boolean().optional(),
	scale: z.number().int().positive().optional(),
	options: z.array(z.union([z.string(), choiceOptionSchema])).optional(),
});

export const sectionConditionSchema = z.object({
	fieldId: z.string().min(1),
	equals: z.string().optional(),
	notEquals: z.string().optional(),
});

export const formSectionSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	fields: z.array(formFieldSchema).min(1),
	conditions: z.array(sectionConditionSchema).optional(),
});

export const formSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	sections: z.array(formSectionSchema).min(1),
});

export type FormSchemaStrict = z.infer<typeof formSchema>;

export function validateFormSchemaStrict(data: unknown): { valid: boolean; error?: string } {
	try {
		formSchema.parse(data);
		return { valid: true };
	} catch (err: any) {
		return { valid: false, error: err.message };
	}
}
