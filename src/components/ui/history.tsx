import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFormHistory } from "../../api";
import { useForm } from "../../contexts/FormContext";

interface FormHistoryItem {
        id: string;
        formId: string;
        title: string;
        createdAt: string;
        schema?: any;
}

interface HistoryResponse {
        success: boolean;
        data?: FormHistoryItem[];
        error?: string;
}

const History: React.FC = () => {
        const [history, setHistory] = useState<FormHistoryItem[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState("");
        const navigate = useNavigate();
        const { setFormData } = useForm();

        useEffect(() => {
                const fetchHistory = async () => {
                        try {
                                setIsLoading(true);
                                const response = (await getFormHistory()) as HistoryResponse;
                                if (response.success) {
                                        setHistory(response.data || []);
                                } else {
                                        setError(response.error || "Failed to fetch history");
                                }
                        } catch (err: any) {
                                setError(err.message || "An error occurred while fetching history");
                        } finally {
                                setIsLoading(false);
                        }
                };

                fetchHistory();
        }, []);

        const handleFormClick = (item: FormHistoryItem) => {
                if (item.schema && item.formId) {
                        // Set form data in context
                        setFormData(item.schema, item.formId);
                        // Navigate to dashboard
                        navigate("/dashboard");
                }
        };

        const formatDate = (dateString: string) => {
                const date = new Date(dateString);
                return (
                        date.toLocaleDateString() +
                        " at " +
                        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                );
        };

        return (
                <div className="w-full max-w-4xl mx-auto p-6 pt-20">
                        <h1 className="text-3xl font-bold mb-6 text-white">Form History</h1>

                        {isLoading ? (
                                <div className="flex justify-center items-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                        ) : error ? (
                                <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 text-red-200">
                                        {error}
                                </div>
                        ) : (
                                <div className="space-y-4">
                                        {history.length > 0 ? (
                                                history.map((item) => (
                                                        <div
                                                                key={item.id}
                                                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                                                                onClick={() => handleFormClick(item)}
                                                        >
                                                                <div className="flex justify-between items-start">
                                                                        <div>
                                                                                <h3 className="font-medium text-white">
                                                                                        {item.title || "Untitled Form"}
                                                                                </h3>
                                                                                <p className="text-sm text-gray-400">
                                                                                        {formatDate(item.createdAt)}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))
                                        ) : (
                                                <div className="text-center py-12">
                                                        <p className="text-gray-400">No form history yet</p>
                                                </div>
                                        )}
                                </div>
                        )}
                </div>
        );
};

export default History;
