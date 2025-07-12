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

// Helper function to validate the form schema
function validateFormSchema(schema: FormSchema): { valid: boolean; error?: string } {
        try {
                // Check for required top-level fields
                if (!schema.title) {
                        return { valid: false, error: "Form schema is missing title" };
                }
                if (!schema.description) {
                        return { valid: false, error: "Form schema is missing description" };
                }

                // Check that either sections or fields exist
                if (!schema.sections?.length && !schema.fields?.length) {
                        return { valid: false, error: "Form schema must have either sections or fields" };
                }

                // If using sections, validate each section
                if (schema.sections?.length) {
                        for (const section of schema.sections) {
                                if (!section.title) {
                                        return { valid: false, error: "Section is missing title" };
                                }
                                if (!section.fields || !Array.isArray(section.fields) || section.fields.length === 0) {
                                        return { valid: false, error: `Section "${section.title}" has no fields` };
                                }

                                // Validate each field in the section
                                for (const field of section.fields) {
                                        if (!field.label) {
                                                return { valid: false, error: "Field is missing label" };
                                        }
                                        if (!field.type) {
                                                return {
                                                        valid: false,
                                                        error: `Field "${field.label}" is missing type`,
                                                };
                                        }
                                }
                        }
                }

                // If using fields directly, validate each field
                if (schema.fields?.length) {
                        for (const field of schema.fields) {
                                if (!field.label) {
                                        return { valid: false, error: "Field is missing label" };
                                }
                                if (!field.type) {
                                        return { valid: false, error: `Field "${field.label}" is missing type` };
                                }
                        }
                }

                return { valid: true };
        } catch (error) {
                return { valid: false, error: `Schema validation error: ${(error as Error).message}` };
        }
}

export async function createGoogleForm(
        schema: FormSchema,
        oauth2Client: OAuth2Client
): Promise<{ formId: string; responderUri: string }> {
        // Validate the schema first
        const validation = validateFormSchema(schema);
        if (!validation.valid) {
                throw new Error(`Invalid form schema: ${validation.error}`);
        }

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
        } catch (error: any) {
                console.error("Error creating Google Form:", error);

                // Provide more detailed error information
                if (error.response) {
                        // Google API error with response
                        const status = error.response.status;
                        const errorDetails = error.response.data?.error || {};

                        console.error(`Google Forms API error (${status}):`, errorDetails);

                        if (status === 403) {
                                throw new Error(
                                        "Permission denied: You don't have permission to create Google Forms. Please check your Google account permissions."
                                );
                        } else if (status === 401) {
                                throw new Error(
                                        "Authentication failed: Your Google authentication has expired or is invalid. Please reconnect your Google account."
                                );
                        } else {
                                throw new Error(
                                        `Google Forms API error (${status}): ${errorDetails.message || "Unknown error"}`
                                );
                        }
                }

                throw new Error(`Failed to create Google Form: ${error.message || "Unknown error"}`);
        }
}
