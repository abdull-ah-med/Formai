import React from "react";

const History: React.FC = () => {
        return (
                <div className="w-full max-w-4xl mx-auto p-6 pt-20">
                        <h1 className="text-3xl font-bold mb-6 text-white">
                                Chat History
                        </h1>

                        <div className="space-y-4">
                                {/* Sample history items - would be replaced with actual data */}
                                {[1, 2, 3].map((item) => (
                                        <div
                                                key={item}
                                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                                        >
                                                <div className="flex justify-between items-start">
                                                        <div>
                                                                <h3 className="font-medium text-white">
                                                                        Chat
                                                                        Session
                                                                        #{item}
                                                                </h3>
                                                                <p className="text-sm text-gray-400">
                                                                        Today at
                                                                        2:30 PM
                                                                </p>
                                                        </div>
                                                        <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                                                                {item * 5}{" "}
                                                                messages
                                                        </span>
                                                </div>
                                                <p className="text-gray-300 mt-2 text-sm truncate">
                                                        Sample conversation
                                                        preview text would
                                                        appear here...
                                                </p>
                                        </div>
                                ))}

                                {/* Empty state */}
                                {[1, 2, 3].length === 0 && (
                                        <div className="text-center py-12">
                                                <p className="text-gray-400">
                                                        No chat history yet
                                                </p>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default History;
