import { FormSchema as UserFormSchema, Question, Option } from "@formai/types";
import { FormSchema as ClaudeFormSchema, FormField } from "./claudeClient";

/**
 * Converts a Claude API form schema to the user model form schema format
 */
export function convertClaudeSchemaToUserSchema(claudeSchema: ClaudeFormSchema): UserFormSchema {
	const userSchema: UserFormSchema = {
		title: claudeSchema.title,
		description: claudeSchema.description,
		questions: [],
	};

	const processField = (field: FormField): Question => ({
		id: Math.random().toString(36).substring(2, 15),
		type: field.type === "dropdown" ? "dropdown" : "short_answer",
		label: field.label,
		options: field.options
			?.map((opt) => {
				if (typeof opt === "string") {
					return { id: Math.random().toString(36).substring(2, 15), text: opt };
				}
				return {
					id: Math.random().toString(36).substring(2, 15),
					text: opt.text || opt.label || "",
				};
			})
			// Filter out any options that might be empty
			.filter((opt): opt is Option => !!opt),
	});

	// Handle sections-based schema (newer format)
	if (claudeSchema.sections && claudeSchema.sections.length > 0) {
		claudeSchema.sections.forEach((section) => {
			section.fields.forEach((field) => {
				userSchema.questions.push(processField(field));
			});
		});
	}
	// Handle old flat fields-based schema for backward compatibility
	else if (claudeSchema.fields && claudeSchema.fields.length > 0) {
		claudeSchema.fields.forEach((field) => {
			userSchema.questions.push(processField(field));
		});
	}

	return userSchema;
}

/**
 * Converts a user model form schema to the Claude API schema format
 */
export function convertUserSchemaToClaudeSchema(userSchema: UserFormSchema): ClaudeFormSchema {
	const claudeSchema: ClaudeFormSchema = {
		title: userSchema.title,
		description: userSchema.description,
		sections: [
			{
				title: userSchema.title,
				description: userSchema.description,
				fields: userSchema.questions.map(
					(question): FormField => ({
						label: question.label,
						type: question.type === "dropdown" ? "dropdown" : "text",
						options: question.options?.map((opt) => opt.text),
					})
				),
			},
		],
	};
	return claudeSchema;
}

export function convertToGoogleForm(schema: UserFormSchema): any {
	const requests = [];

	// Set form title and description
	requests.push({
		updateFormInfo: {
			info: {
				title: schema.title,
				description: schema.description,
			},
			updateMask: "title,description",
		},
	});

	// Add questions
	schema.questions.forEach((question, index) => {
		const googleQuestion: any = {
			createItem: {
				item: {
					title: question.label,
					questionItem: {
						question: {
							required: false, // You might want to add a 'required' field in your schema
						},
					},
				},
				location: {
					index: index,
				},
			},
		};

		if (question.type === "short_answer") {
			googleQuestion.createItem.item.questionItem.textQuestion = {
				paragraph: false,
			};
		} else if (question.type === "dropdown" && question.options) {
			googleQuestion.createItem.item.questionItem.choiceQuestion = {
				type: "RADIO",
				options: question.options.map((opt) => ({
					value: opt.text,
				})),
			};
		}

		requests.push(googleQuestion);
	});

	return {
		requests,
	};
}
