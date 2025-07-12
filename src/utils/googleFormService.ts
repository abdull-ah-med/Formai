import { google, forms_v1 } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { FormSchema, FormField, FormSection } from "./claudeClient";

function mapFieldToGoogleFormsRequest(field: FormField, index: number): forms_v1.Schema$Request {
        switch (field.type) {
                case "text":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                textQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "textarea":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                textQuestion: {
                                                                        paragraph: true,
                                                                },
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "email":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                textQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "number":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                textQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "tel":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                textQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "date":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                dateQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "time":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                timeQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "url":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                textQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "checkbox":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                choiceQuestion: {
                                                                        type: "CHECKBOX",
                                                                        options: [{ value: "Yes" }],
                                                                },
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "radio":
                case "select":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                choiceQuestion: {
                                                                        type:
                                                                                field.type === "radio"
                                                                                        ? "RADIO"
                                                                                        : "DROP_DOWN",
                                                                        options: field.options?.map((opt) => {
                                                                                if (typeof opt === "string") {
                                                                                        return { value: opt };
                                                                                } else {
                                                                                        return {
                                                                                                value:
                                                                                                        opt.label ||
                                                                                                        opt.text ||
                                                                                                        "",
                                                                                        };
                                                                                }
                                                                        }) || [{ value: "Option 1" }],
                                                                },
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                case "rating":
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                scaleQuestion: {
                                                                        low: 1,
                                                                        high: field.scale || 5,
                                                                },
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
                default:
                        return {
                                createItem: {
                                        item: {
                                                title: field.label,
                                                questionItem: {
                                                        question: {
                                                                textQuestion: {},
                                                        },
                                                },
                                        },
                                        location: { index },
                                },
                        };
        }
}

export async function createGoogleForm(
        schema: FormSchema,
        oauth2Client: OAuth2Client
): Promise<{ formId: string; responderUri: string }> {
        const forms = google.forms({
                version: "v1",
                auth: oauth2Client,
        });

        try {
                // 1. Create the form with title and description
                const createResponse = await forms.forms.create({
                        requestBody: {
                                info: {
                                        title: schema.title,
                                        documentTitle: schema.title,
                                },
                        },
                });

                const formId = createResponse.data.formId;
                if (!formId) {
                        throw new Error("Failed to create form, no formId returned.");
                }

                // 2. Prepare batch update to add questions and description
                const requests: forms_v1.Schema$Request[] = [
                        // Add description
                        {
                                updateFormInfo: {
                                        info: {
                                                description: schema.description,
                                        },
                                        updateMask: "description",
                                },
                        },
                ];

                // Handle sections if they exist, otherwise use fields
                if (schema.sections && schema.sections.length > 0) {
                        let currentIndex = 0;

                        // Add each section and its fields
                        schema.sections.forEach((section, sectionIndex) => {
                                // Add section header if it's not the first section
                                if (sectionIndex > 0) {
                                        requests.push({
                                                createItem: {
                                                        item: {
                                                                pageBreakItem: {},
                                                        },
                                                        location: { index: currentIndex++ },
                                                },
                                        });
                                }

                                // Add section title as a section header
                                requests.push({
                                        createItem: {
                                                item: {
                                                        title: section.title,
                                                        description: section.description || "",
                                                        // Use a page break item for section headers
                                                        pageBreakItem: {},
                                                },
                                                location: { index: currentIndex++ },
                                        },
                                });

                                // Add fields for this section
                                section.fields.forEach((field) => {
                                        requests.push(mapFieldToGoogleFormsRequest(field, currentIndex++));
                                });
                        });
                } else if (schema.fields) {
                        // Fallback to the old fields array for backward compatibility
                        schema.fields.forEach((field, index) => {
                                requests.push(mapFieldToGoogleFormsRequest(field, index));
                        });
                }

                // 3. Apply the batch update
                if (requests.length > 0) {
                        await forms.forms.batchUpdate({
                                formId,
                                requestBody: {
                                        requests,
                                },
                        });
                }

                // 4. Get the form details to return the responder URI
                const form = await forms.forms.get({ formId });
                const responderUri = form.data.responderUri || "";

                return { formId, responderUri };
        } catch (error) {
                console.error("Error creating Google Form:", error);
                throw new Error("Failed to create Google Form.");
        }
}
