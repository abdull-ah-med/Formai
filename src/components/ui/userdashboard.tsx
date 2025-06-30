import React, { useEffect, useState, useRef } from "react";
import { Button } from "./button";
import { Navigate, useNavigate } from "react-router-dom";
import {
        isAuthenticated,
        logoutAndRedirect,
        getUser,
} from "../../auth/authHelper";
import { Send } from "lucide-react";

interface UserData {
        id: string;
        email: string;
        role: string;
        fullName: string;
}

interface ChatMessage {
        id: string;
        content: string;
        isUser: boolean;
        timestamp: Date;
}

const UserDashboard: React.FC = () => {
        const navigate = useNavigate();
        const [status, setStatus] = useState<"loading" | "unauth" | "ready">(
                "loading"
        );
        const [userData, setUserData] = useState<UserData | null>(null);
        const [error, setError] = useState<string | null>(null);
        const [inputMessage, setInputMessage] = useState("");
        const [messages, setMessages] = useState<ChatMessage[]>([]);
        const [showWelcome, setShowWelcome] = useState(true);
        const messagesEndRef = useRef<HTMLDivElement>(null);
        const chatContainerRef = useRef<HTMLDivElement>(null);

        // Verify authentication and fetch user data
        useEffect(() => {
                (async () => {
                        const auth = await isAuthenticated();
                        if (!auth) {
                                setStatus("unauth");
                                return;
                        }
                        try {
                                const user = await getUser();

                                if (!user) {
                                        // Server said we're not authenticated
                                        setStatus("unauth");
                                        return;
                                }

                                // Ensure we always have a displayable name
                                const fullName = user.fullName || "User";

                                setUserData({
                                        id: user.id,
                                        email: user.email,
                                        role: user.role,
                                        fullName,
                                });

                                setStatus("ready");
                        } catch (err: any) {
                                console.error("Error fetching account:", err);
                                setError(
                                        err.message ||
                                                "Failed to load user data"
                                );
                                setStatus("unauth");
                        }
                })();

                // Listen for browser navigation (back/forward)
                const handlePopState = async () => {
                        const auth = await isAuthenticated();
                        if (!auth) {
                                setStatus("unauth");
                        }
                };
                window.addEventListener("popstate", handlePopState);
                return () => {
                        window.removeEventListener("popstate", handlePopState);
                };
        }, [navigate]);

        useEffect(() => {
                if (messages.length > 0) {
                        setShowWelcome(false);

                        // Save current scroll position
                        const chatContainer = chatContainerRef.current;
                        if (!chatContainer) return;

                        const { scrollHeight, scrollTop, clientHeight } =
                                chatContainer;
                        const isScrolledToBottom =
                                scrollHeight - scrollTop - clientHeight < 10;

                        setTimeout(() => {
                                if (isScrolledToBottom) {
                                        messagesEndRef.current?.scrollIntoView({
                                                behavior: "smooth",
                                        });
                                }
                        }, 100);
                }
        }, [messages]);

        if (status === "loading") {
                return (
                        <div className="min-h-screen flex items-center justify-center">
                                Loading dashboard...
                        </div>
                );
        }
        if (status === "unauth") {
                logoutAndRedirect("/signin");
                return null;
        }

        const handleSendMessage = () => {
                if (!inputMessage.trim()) return;

                // Add user message
                const userMessage: ChatMessage = {
                        id: Date.now().toString(),
                        content: inputMessage,
                        isUser: true,
                        timestamp: new Date(),
                };

                setMessages((prev) => [...prev, userMessage]);
                setInputMessage("");
                setTimeout(() => {
                        const aiMessage: ChatMessage = {
                                id: (Date.now() + 1).toString(),
                                content: `This is a simulated response to: "${inputMessage}"`,
                                isUser: false,
                                timestamp: new Date(),
                        };
                        setMessages((prev) => [...prev, aiMessage]);
                }, 1000);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
                if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                }
        };

        return (
                <div className="flex flex-col h-screen pt-12 md:pt-20 pb-0">
                        {/* Chat Messages */}
                        <div
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-3 md:p-4"
                        >
                                <div className="max-w-4xl mx-auto h-full">
                                        {/* Welcome message - shown only when no messages */}
                                        {showWelcome && (
                                                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                                        <h1 className="text-3xl font-bold text-white/80 mb-2">
                                                                Hello,{" "}
                                                                {userData?.fullName ||
                                                                        "User"}
                                                        </h1>
                                                        <p className="text-gray-400 max-w-md">
                                                                How can I assist
                                                                you today? Type
                                                                your message
                                                                below to start a
                                                                conversation.
                                                        </p>
                                                </div>
                                        )}

                                        {/* Chat messages */}
                                        <div className="space-y-6">
                                                {messages.map((message) => (
                                                        <div
                                                                key={message.id}
                                                                className={`flex ${
                                                                        message.isUser
                                                                                ? "justify-end"
                                                                                : "justify-start"
                                                                }`}
                                                        >
                                                                <div
                                                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                                                                message.isUser
                                                                                        ? "bg-white/10 backdrop-blur-sm border border-white/10 text-white"
                                                                                        : "bg-black/40 backdrop-blur-sm border border-white/5 text-white"
                                                                        }`}
                                                                >
                                                                        <p className="whitespace-pre-wrap">
                                                                                {
                                                                                        message.content
                                                                                }
                                                                        </p>
                                                                        <div
                                                                                className={`text-xs mt-1 ${
                                                                                        message.isUser
                                                                                                ? "text-gray-400"
                                                                                                : "text-gray-500"
                                                                                }`}
                                                                        >
                                                                                {message.timestamp.toLocaleTimeString(
                                                                                        [],
                                                                                        {
                                                                                                hour: "2-digit",
                                                                                                minute: "2-digit",
                                                                                        }
                                                                                )}
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                                <div ref={messagesEndRef} />
                                        </div>
                                </div>
                        </div>

                        {/* Chat Input */}
                        <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm p-2 md:p-4">
                                <div className="max-w-4xl mx-auto">
                                        <div className="flex items-end bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 md:p-2">
                                                <textarea
                                                        value={inputMessage}
                                                        onChange={(e) =>
                                                                setInputMessage(
                                                                        e.target
                                                                                .value
                                                                )
                                                        }
                                                        onKeyDown={
                                                                handleKeyDown
                                                        }
                                                        placeholder="Type a message..."
                                                        className="flex-1 bg-transparent border-0 focus:ring-0 text-white resize-none max-h-32 min-h-[2.5rem] py-2 px-3 outline-none"
                                                        rows={1}
                                                />
                                                <div className="flex items-center px-1">
                                                        <Button
                                                                onClick={
                                                                        handleSendMessage
                                                                }
                                                                disabled={
                                                                        !inputMessage.trim()
                                                                }
                                                                className={`rounded-full p-2 ${
                                                                        !inputMessage.trim()
                                                                                ? "bg-white/20 text-gray-400 cursor-not-allowed"
                                                                                : "bg-white/10 text-white hover:bg-white/20"
                                                                }`}
                                                        >
                                                                <Send
                                                                        size={
                                                                                18
                                                                        }
                                                                />
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default UserDashboard;
