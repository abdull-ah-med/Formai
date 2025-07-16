import { Send, Edit2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "../../contexts/FormContext";
import { generateForm, reviseForm } from "../../api";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "./dialog";
import {
	FormSchema,
	FormQuestion,
	GenerateFormResponse,
	ReviseFormResponse,
	FormSection,
	FormCondition,
} from "../../types/form";
import FormFinalizeButton from "./FormFinalizeButton";
import DOMPurify from "dompurify";
import { Loader } from "./loader";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

const UserDashboard: React.FC = () => {
	useDocumentTitle("Dashboard");
	const { user } = useAuth();
	const { formSchema, formId, setFormData, clearFormData } = useForm();
	const [prompt, setPrompt] = useState("");
	const [response, setResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [loadingMessage, setLoadingMessage] = useState("");
	const [error, setError] = useState("");
	const [revisionPrompt, setRevisionPrompt] = useState("");
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [showWarning, setShowWarning] = useState(false);

	useEffect(() => {
		if (user && !user.isGoogleLinked) {
			setShowWarning(true);
		}
	}, [user]);

	useEffect(() => {
		if (formSchema && formId) {
			let processedSchema = { ...formSchema };

			// Handle case when form is loaded from history without proper sections
			if (!processedSchema.sections || !processedSchema.sections.length) {
				// Create sections from fields if they exist
				if (processedSchema.fields && processedSchema.fields.length) {
					processedSchema.sections = [
						{
							title: processedSchema.title,
							description: processedSchema.description,
							fields: processedSchema.fields,
						},
					];
				}
				// Convert questions to fields format if they exist
				else if (processedSchema.questions && Array.isArray(processedSchema.questions)) {
					processedSchema.fields = processedSchema.questions.map(
						(question: FormQuestion) => ({
							label: question.label,
							type: question.type === "dropdown" ? "select" : "text",
							required: false,
							options: question.options?.map((opt) => opt.text),
						})
					);

					processedSchema.sections = [
						{
							title: processedSchema.title,
							description: processedSchema.description,
							fields: processedSchema.fields,
						},
					];
				}

				setFormData(processedSchema, formId);
			}
		}
	}, [formSchema, formId, setFormData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!prompt.trim()) return;

		// Sanitize user input
		const sanitizedPrompt = DOMPurify.sanitize(prompt.trim());

		setIsLoading(true);
		setError("");
		setResponse(`Creating a form for: "${sanitizedPrompt}"`);

		// Start progress simulation for the long-running Claude call
		const stopProgress = simulateProgress();

		try {
			const response = (await generateForm(sanitizedPrompt)) as GenerateFormResponse;

			// Set progress to 100% when API returns
			setLoadingProgress(100);
			setLoadingMessage("Form complete!");

			if (response.success) {
				setFormData(response.data.schema, response.data.formId);
				setResponse(""); // Clear response when form is displayed
			} else {
				setError(response.error || "Failed to generate form");
				setResponse(`Error: ${response.error || "Failed to generate form"}`);
			}
		} catch (err: any) {
			if (err.response?.status === 429) {
				setError("Daily form generation limit reached. Try again tomorrow.");
				setResponse("Error: Daily form generation limit reached. Try again tomorrow.");
			} else if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
				setError(
					"The request timed out. This form may be too complex or our servers are busy."
				);
				setResponse(
					"Error: The request timed out. This form may be too complex or our servers are busy."
				);
			} else {
				setError(err.response?.data?.error || "An error occurred while generating the form");
				setResponse(
					`Error: ${
						err.response?.data?.error ||
						"An error occurred while generating the form"
					}`
				);
			}
		} finally {
			// Stop progress simulation
			stopProgress();
			setIsLoading(false);
		}
	};

	const handleFormSuccess = (googleFormUrl: string) => {
		// Reset form state
		setResponse("");
		setPrompt("");
		clearFormData();

		// Show success message
		alert("Form creation successful!");
	};

	const resetForm = () => {
		setResponse("");
		setPrompt("");
		clearFormData();
	};

	const handleRevisionSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!revisionPrompt.trim() || !formId) return;

		// Sanitize user input
		const sanitizedPrompt = DOMPurify.sanitize(revisionPrompt.trim());

		setIsLoading(true);
		setError("");

		// Start progress simulation for the long-running Claude call
		const stopProgress = simulateProgress();
		setLoadingMessage("Revising your form...");

		reviseForm(formId, sanitizedPrompt)
			.then((response: any) => {
				// Set progress to 100% when API returns
				setLoadingProgress(100);
				setLoadingMessage("Revision complete!");

				const typedResponse = response as ReviseFormResponse;
				if (typedResponse.success) {
					setFormData(typedResponse.data.schema, formId);
					setRevisionPrompt("");
				} else {
					setError(typedResponse.error || "Failed to revise form");
				}
			})
			.catch((err: any) => {
				if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
					setError(
						"The revision request timed out. Try a simpler request or try again later."
					);
				} else {
					setError(
						err.response?.data?.error || "An error occurred while revising the form"
					);
				}
			})
			.finally(() => {
				// Stop progress simulation
				stopProgress();
				setIsLoading(false);
			});
	};

	// Render form content with sections support
	const renderFormContent = () => {
		if (!formSchema) return null;

		const renderFieldPreview = (field: any) => {
			switch (field.type) {
				case "radio":
					return (
						<div className="mt-2 space-y-2">
							{(field.options || []).map((option: any, i: number) => {
								const optionText =
									typeof option === "string"
										? option
										: option.text || option.label;
								return (
									<div key={i} className="flex items-center">
										<div className="w-4 h-4 rounded-full border border-white/30 mr-2"></div>
										<span className="text-gray-300 text-sm">
											{optionText}
										</span>
									</div>
								);
							})}
						</div>
					);
				case "select":
				case "dropdown":
					return (
						<div className="mt-2">
							<div className="bg-white/10 rounded p-2 flex justify-between items-center mb-2">
								<span className="text-gray-400 text-sm">
									Select an option
								</span>
								<svg
									className="w-4 h-4 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
							<div className="pl-2 space-y-1">
								{(field.options || []).map((option: any, i: number) => {
									const optionText =
										typeof option === "string"
											? option
											: option.text || option.label;
									return (
										<div
											key={i}
											className="text-gray-300 text-sm">
											{optionText}
										</div>
									);
								})}
							</div>
						</div>
					);
				case "checkbox":
					return (
						<div className="mt-2 flex items-center">
							<div className="w-4 h-4 border border-white/30 mr-2"></div>
							<span className="text-gray-300 text-sm">Yes</span>
						</div>
					);
				default:
					return null;
			}
		};

		if (formSchema.sections && formSchema.sections.length > 0) {
			// Render sections
			return (
				<div className="space-y-4">
					{formSchema.sections.map((section, sectionIndex) => {
						const isDefaultSection =
							formSchema.sections &&
							formSchema.sections.length === 1 &&
							section.title === formSchema.title &&
							section.description === formSchema.description;

						// Check if this section has conditions
						const hasConditions =
							section.conditions && section.conditions.length > 0;

						return (
							<div key={sectionIndex}>
								{!isDefaultSection && (
									<div className="pt-6">
										<h3 className="text-xl font-semibold mb-2">
											{DOMPurify.sanitize(
												section.title
											)}
										</h3>
										{section.description && (
											<p className="text-gray-400 mb-4">
												{DOMPurify.sanitize(
													section.description
												)}
											</p>
										)}

										{/* Display condition information if this section is conditional */}
										{hasConditions &&
											section.conditions && (
												<div className="bg-blue-900/20 border border-blue-500/30 rounded-md p-2 mb-4 text-sm">
													<p className="text-blue-300 flex items-center">
														<svg
															className="w-4 h-4 mr-2"
															viewBox="0 0 24 24"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
														Conditional
														Section
													</p>
													{section.conditions.map(
														(
															condition: FormCondition,
															i: number
														) => (
															<p
																key={
																	i
																}
																className="text-gray-300 ml-6">
																Shows
																when:
																"
																{
																	condition.fieldId
																}

																"{" "}
																{condition.equals
																	? "is"
																	: "is not"}{" "}
																"
																{condition.equals ||
																	condition.notEquals}

																"
															</p>
														)
													)}
												</div>
											)}
									</div>
								)}
								<div className="space-y-4">
									{section.fields.map((field, fieldIndex) => (
										<div
											key={fieldIndex}
											className="p-3 bg-white/5 rounded-lg">
											<p className="font-medium">
												{DOMPurify.sanitize(
													field.label
												)}
												{field.required && (
													<span className="text-red-400 ml-1">
														*
													</span>
												)}
											</p>
											<p className="text-xs text-gray-400 mb-1">
												Type: {field.type}
											</p>
											{renderFieldPreview(field)}
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			);
		} else if (formSchema.fields && formSchema.fields.length > 0) {
			// Fallback to old fields array for backward compatibility
			return (
				<div className="space-y-4 mb-6">
					{formSchema.fields.map((field, index) => (
						<div key={index} className="p-3 bg-white/5 rounded-lg">
							<p className="font-medium">
								{DOMPurify.sanitize(field.label)}
								{field.required && (
									<span className="text-red-400 ml-1">*</span>
								)}
							</p>
							<p className="text-xs text-gray-400 mb-1">Type: {field.type}</p>
							{renderFieldPreview(field)}
						</div>
					))}
				</div>
			);
		} else {
			return <p className="text-gray-400">No form fields found.</p>;
		}
	};

	// Add a function to simulate progress for long operations
	const simulateProgress = () => {
		// Reset progress
		setLoadingProgress(0);
		setLoadingMessage("Creating your form...");

		// Start progress simulation
		let progress = 0;
		const interval = setInterval(() => {
			progress += Math.random() * 5;

			if (progress < 40) {
				setLoadingMessage("Generating form structure...");
				setLoadingProgress(Math.min(progress, 40));
			} else if (progress < 70) {
				setLoadingMessage("Building form fields...");
				setLoadingProgress(Math.min(progress, 70));
			} else if (progress < 95) {
				setLoadingMessage("Adding validation and logic...");
				setLoadingProgress(Math.min(progress, 95));
			}

			// Cap at 95% - the final 5% happens when API actually returns
			if (progress >= 95) {
				setLoadingProgress(95);
				clearInterval(interval);
			}
		}, 800);

		return () => clearInterval(interval);
	};

	return (
		<div className="min-h-screen bg-black text-white flex flex-col pt-16">
			<Dialog open={showWarning} onOpenChange={setShowWarning}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Google Account Not Linked</DialogTitle>
						<DialogDescription>
							Your Google account is not linked. You will not be able to
							create Google Forms until you link your account.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<button onClick={() => setShowWarning(false)}>Close</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<main className="flex-1 p-4 md:p-6 lg:p-8 pb-32">
				<div className="max-w-4xl mx-auto">
					{/* Response Display Area - only show if not displaying a form */}
					{!formSchema && (
						<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[200px] mb-6 shadow-lg">
							{isLoading ? (
								<div className="flex flex-col items-center justify-center h-full py-8">
									<div className="w-full max-w-sm mb-4">
										<div className="h-2 bg-white/10 rounded-full overflow-hidden">
											<div
												className="h-full bg-blue-500 transition-all duration-300"
												style={{
													width: `${loadingProgress}%`,
												}}></div>
										</div>
										<div className="mt-2 text-center">
											<p className="text-gray-300">
												{loadingMessage}
											</p>
										</div>
									</div>
									<Loader variant="spinner" size="lg" />
								</div>
							) : response ? (
								<p className="text-gray-200">{response}</p>
							) : (
								<div>
									<h2 className="text-2xl font-bold mb-3">
										Welcome, {user?.fullName || "there"}!
									</h2>
									<p className="text-gray-300 mb-6">
										Create custom forms with AI in seconds.
										Just describe what you need below.
									</p>

									<h3 className="text-xl font-semibold mb-4">
										How It Works
									</h3>
									<ol className="list-decimal pl-5 space-y-2 text-gray-300">
										<li>
											Describe the form you need in
											plain English (e.g., "Create a
											job application form with fields
											for work experience")
										</li>
										<li>
											Our AI will generate a form
											based on your description
										</li>
										<li>
											Review the form and make
											revisions if needed (up to 3
											times)
										</li>
										<li>
											When you're satisfied, click
											"Create Google Form" to publish
											it to your Google account
										</li>
									</ol>
								</div>
							)}
						</div>
					)}

					{/* Form Builder when a form is generated */}
					{formSchema && formId && (
						<div className="mb-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold">Your Form</h2>
								<button
									onClick={resetForm}
									className="text-gray-400 hover:text-white">
									Create New Form
								</button>
							</div>

							{error && (
								<div className="p-4 mb-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200">
									{error}
								</div>
							)}

							<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
								<h3 className="text-xl font-semibold mb-2">
									{DOMPurify.sanitize(formSchema.title)}
								</h3>
								<p className="text-gray-400 mb-4">
									{DOMPurify.sanitize(formSchema.description)}
								</p>

								{renderFormContent()}

								<div className="flex justify-end items-center mt-6">
									<FormFinalizeButton
										formId={formId}
										onSuccess={handleFormSuccess}
										className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-neutral-200"
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</main>
			<div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/90 backdrop-blur-lg border-t border-white/10 p-4 shadow-lg">
				<div className="max-w-4xl mx-auto">
					<form
						onSubmit={formSchema ? handleRevisionSubmit : handleSubmit}
						className="relative">
						<div className="relative rounded-xl overflow-hidden border border-white p-[1px]">
							<div className="bg-black rounded-[10px] relative z-10">
								<textarea
									value={formSchema ? revisionPrompt : prompt}
									onChange={(e) =>
										formSchema
											? setRevisionPrompt(
													e.target.value
											  )
											: setPrompt(e.target.value)
									}
									placeholder={
										formSchema
											? "Describe changes you want to make to the form..."
											: "Describe the form you want to create..."
									}
									className="flex-grow bg-transparent p-4 pr-14 text-white placeholder-gray-400 focus:outline-none h-12 resize-none scrollbar-hide rounded-xl w-full"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex-shrink-0 bg-white hover:bg-neutral-200 text-black font-medium disabled:opacity-50 transition-all duration-200 flex items-center justify-center rounded-full"
									disabled={
										isLoading ||
										(formSchema ? !revisionPrompt : !prompt)
									}>
									{isLoading ? (
										<div className="flex items-center space-x-1">
											<Loader
												variant="spinner"
												size="sm"
											/>
										</div>
									) : formSchema ? (
										<Edit2 className="h-5 w-5" />
									) : (
										<Send className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
						{!formSchema && (
							<p className="text-xs text-center text-gray-500 mt-2">
								Formai may produce inaccurate information about forms,
								people, or facts.
							</p>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
