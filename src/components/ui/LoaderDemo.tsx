import React from "react";
import { Loader } from "./loader";

const LoaderDemo: React.FC = () => {
        return (
                <div className="p-6 space-y-10">
                        <div>
                                <h2 className="text-2xl font-bold mb-4">Spinner Variant</h2>
                                <div className="flex gap-8">
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Small</span>
                                                <Loader variant="spinner" size="sm" />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Medium</span>
                                                <Loader variant="spinner" size="md" />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Large</span>
                                                <Loader variant="spinner" size="lg" />
                                        </div>
                                </div>
                        </div>

                        <div>
                                <h2 className="text-2xl font-bold mb-4">Dots Variant</h2>
                                <div className="flex gap-8">
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Small</span>
                                                <Loader variant="dots" size="sm" />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Medium</span>
                                                <Loader variant="dots" size="md" />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Large</span>
                                                <Loader variant="dots" size="lg" />
                                        </div>
                                </div>
                        </div>

                        <div>
                                <h2 className="text-2xl font-bold mb-4">Pulse Variant</h2>
                                <div className="flex gap-8">
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Small</span>
                                                <Loader variant="pulse" size="sm" />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Medium</span>
                                                <Loader variant="pulse" size="md" />
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                                <span className="text-sm">Large</span>
                                                <Loader variant="pulse" size="lg" />
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default LoaderDemo;
