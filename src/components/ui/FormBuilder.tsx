import React from "react";
import { FormSchema, Question, Option } from "../../types/form";

// Helper to generate unique IDs
const generateId = () =>
        Date.now().toString(36) + Math.random().toString(36).substring(2);

// Component Signature
interface FormBuilderProps {
        schema: FormSchema;
        onSchemaChange: (updated: FormSchema) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
        schema,
        onSchemaChange,
}) => {
        const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const newSchema = { ...schema, title: e.target.value };
                onSchemaChange(newSchema);
        };

        const handleDescriptionChange = (
                e: React.ChangeEvent<HTMLTextAreaElement>
        ) => {
                const newSchema = { ...schema, description: e.target.value };
                onSchemaChange(newSchema);
        };

        const handleQuestionChange = (
                index: number,
                updatedQuestion: Partial<Question>
        ) => {
                const newQuestions = [...schema.questions];
                newQuestions[index] = {
                        ...newQuestions[index],
                        ...updatedQuestion,
                };
                onSchemaChange({ ...schema, questions: newQuestions });
        };

        const addQuestion = () => {
                const newQuestion: Question = {
                        id: generateId(),
                        type: "short_answer",
                        label: "New Question",
                };
                onSchemaChange({
                        ...schema,
                        questions: [...schema.questions, newQuestion],
                });
        };

        const deleteQuestion = (index: number) => {
                const newQuestions = schema.questions.filter(
                        (_: Question, i: number) => i !== index
                );
                onSchemaChange({ ...schema, questions: newQuestions });
        };

        const addOption = (questionIndex: number) => {
                const newOption: Option = {
                        id: generateId(),
                        text: "New Option",
                };
                const newQuestions = [...schema.questions];
                const question = newQuestions[questionIndex];
                if (question.type === "dropdown") {
                        question.options = [
                                ...(question.options || []),
                                newOption,
                        ];
                        onSchemaChange({ ...schema, questions: newQuestions });
                }
        };

        const deleteOption = (questionIndex: number, optionIndex: number) => {
                const newQuestions = [...schema.questions];
                const question = newQuestions[questionIndex];
                if (question.type === "dropdown" && question.options) {
                        question.options = question.options.filter(
                                (_: Option, i: number) => i !== optionIndex
                        );
                        onSchemaChange({ ...schema, questions: newQuestions });
                }
        };

        const handleOptionTextChange = (
                questionIndex: number,
                optionIndex: number,
                text: string
        ) => {
                const newQuestions = [...schema.questions];
                const question = newQuestions[questionIndex];
                if (question.type === "dropdown" && question.options) {
                        question.options[optionIndex].text = text;
                        onSchemaChange({ ...schema, questions: newQuestions });
                }
        };

        return (
                <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="mb-6">
                                <input
                                        type="text"
                                        value={schema.title}
                                        onChange={handleTitleChange}
                                        className="text-3xl font-bold w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-2"
                                        placeholder="Form Title"
                                />
                        </div>
                        <div className="mb-8">
                                <textarea
                                        value={schema.description}
                                        onChange={handleDescriptionChange}
                                        className="w-full text-gray-600 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                                        placeholder="Form Description"
                                        rows={2}
                                />
                        </div>

                        {schema.questions.map((question: Question, qIndex: number) => (
                                <div
                                        key={question.id}
                                        className="mb-6 p-4 border rounded-md bg-white shadow-sm"
                                >
                                        <div className="flex justify-between items-center mb-4">
                                                <input
                                                        type="text"
                                                        value={question.label}
                                                        onChange={(e) =>
                                                                handleQuestionChange(
                                                                        qIndex,
                                                                        {
                                                                                label: e
                                                                                        .target
                                                                                        .value,
                                                                        }
                                                                )
                                                        }
                                                        className="text-xl font-semibold w-full border-b border-gray-200 focus:border-blue-400 outline-none"
                                                        placeholder="Question Label"
                                                />
                                                <button
                                                        onClick={() =>
                                                                deleteQuestion(
                                                                        qIndex
                                                                )
                                                        }
                                                        className="ml-4 text-red-500 hover:text-red-700 font-bold text-2xl"
                                                >
                                                        &times;
                                                </button>
                                        </div>

                                        {question.type === "short_answer" && (
                                                <input
                                                        type="text"
                                                        disabled
                                                        placeholder="Short answer text"
                                                        className="w-full p-2 bg-gray-100 border rounded-md"
                                                />
                                        )}

                                        {question.type === "dropdown" && (
                                                <div>
                                                        <select
                                                                disabled
                                                                className="w-full p-2 bg-gray-100 border rounded-md mb-2"
                                                        >
                                                                <option>
                                                                        Dropdown
                                                                        preview
                                                                </option>
                                                        </select>
                                                        <div className="ml-4">
                                                                {question.options?.map(
                                                                        (
                                                                                option: Option,
                                                                                oIndex: number
                                                                        ) => (
                                                                                <div
                                                                                        key={
                                                                                                option.id
                                                                                        }
                                                                                        className="flex items-center mb-2"
                                                                                >
                                                                                        <input
                                                                                                type="text"
                                                                                                value={
                                                                                                        option.text
                                                                                                }
                                                                                                onChange={(
                                                                                                        e
                                                                                                ) =>
                                                                                                        handleOptionTextChange(
                                                                                                                qIndex,
                                                                                                                oIndex,
                                                                                                                e
                                                                                                                        .target
                                                                                                                        .value
                                                                                                        )
                                                                                                }
                                                                                                className="w-full p-1 border-b focus:border-blue-400 outline-none"
                                                                                        />
                                                                                        <button
                                                                                                onClick={() =>
                                                                                                        deleteOption(
                                                                                                                qIndex,
                                                                                                                oIndex
                                                                                                        )
                                                                                                }
                                                                                                className="ml-2 text-red-500 hover:text-red-600 font-bold"
                                                                                        >
                                                                                                &times;
                                                                                        </button>
                                                                                </div>
                                                                        )
                                                                )}
                                                                <button
                                                                        onClick={() =>
                                                                                addOption(
                                                                                        qIndex
                                                                                )
                                                                        }
                                                                        className="text-blue-500 hover:text-blue-700"
                                                                >
                                                                        + Add
                                                                        Option
                                                                </button>
                                                        </div>
                                                </div>
                                        )}
                                </div>
                        ))}

                        <button
                                onClick={addQuestion}
                                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                                + Add Question
                        </button>
                </div>
        );
};

export default FormBuilder;
