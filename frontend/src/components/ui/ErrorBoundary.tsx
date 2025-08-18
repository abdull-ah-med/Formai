import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
        children: ReactNode;
        fallback?: ReactNode;
}

interface State {
        hasError: boolean;
        error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
        constructor(props: Props) {
                super(props);
                this.state = { hasError: false };
        }

        static getDerivedStateFromError(error: Error): State {
                return { hasError: true, error };
        }

        componentDidCatch(error: Error, errorInfo: ErrorInfo) {
                // Error tracking could be implemented here for production monitoring
        }

        render() {
                if (this.state.hasError) {
                        if (this.props.fallback) {
                                return this.props.fallback;
                        }

                        return (
                                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                                        <div className="text-center">
                                                <h1 className="text-2xl font-bold mb-4">
                                                        Something went wrong
                                                </h1>
                                                <p className="text-gray-300 mb-6">
                                                        We're sorry, but
                                                        something unexpected
                                                        happened.
                                                </p>
                                                <button
                                                        onClick={() =>
                                                                window.location.reload()
                                                        }
                                                        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                                                >
                                                        Reload Page
                                                </button>
                                        </div>
                                </div>
                        );
                }

                return this.props.children;
        }
}

export default ErrorBoundary;
