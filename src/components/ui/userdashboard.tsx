import { BarChart, CheckSquare, Flag, Home, MessageSquare, Settings, Users } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const UserDashboard: React.FC = () => {
        const { user } = useAuth();
        const [prompt, setPrompt] = useState("");
        const [response, setResponse] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                setIsLoading(true);
                // Simulate API call
                setTimeout(() => {
                        setResponse(`This is a simulated response for: "${prompt}"`);
                        setIsLoading(false);
                }, 1500);
        };

        return (
                <div className="min-h-screen bg-black text-white flex flex-col pt-16">
                        <main className="flex-1 p-4 md:p-6 lg:p-8">
                                <div className="max-w-4xl mx-auto">
                                        <div className="text-center mb-8">
                                                <h1 className="text-4xl font-bold">
                                                        Welcome back, {user?.fullName || "User"}!
                                                </h1>
                                                <p className="text-gray-400 mt-2">What can I help you create today?</p>
                                        </div>

                                        {/* Response Display Area */}
                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[200px] mb-6 shadow-lg">
                                                {isLoading ? (
                                                        <div className="flex items-center justify-center h-full">
                                                                <div className="spinner"></div>
                                                        </div>
                                                ) : (
                                                        <p className="text-gray-200">{response}</p>
                                                )}
                                        </div>

                                        {/* Prompt Input Form */}
                                        <form onSubmit={handleSubmit} className="relative">
                                                <textarea
                                                        value={prompt}
                                                        onChange={(e) => setPrompt(e.target.value)}
                                                        placeholder="e.g., Create a survey for customer satisfaction..."
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-24 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                                                        rows={3}
                                                />
                                                <button
                                                        type="submit"
                                                        className="absolute right-4 bottom-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
                                                        disabled={isLoading || !prompt}
                                                >
                                                        {isLoading ? "Generating..." : "Generate"}
                                                </button>
                                        </form>
                                </div>
                        </main>
                </div>
        );
};

export default UserDashboard;
