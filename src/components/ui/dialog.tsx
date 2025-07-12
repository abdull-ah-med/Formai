import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface DialogProps {
        open: boolean;
        onOpenChange: (open: boolean) => void;
        children: React.ReactNode;
}

interface DialogContentProps {
        children: React.ReactNode;
        className?: string;
}

interface DialogHeaderProps {
        children: React.ReactNode;
        className?: string;
}

interface DialogFooterProps {
        children: React.ReactNode;
        className?: string;
}

interface DialogTitleProps {
        children: React.ReactNode;
        className?: string;
}

interface DialogDescriptionProps {
        children: React.ReactNode;
        className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
        if (!open) return null;

        return (
                <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                        onClick={() => onOpenChange(false)}
                >
                        {children}
                </div>
        );
};

export const DialogContent: React.FC<DialogContentProps> = ({ children, className }) => {
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
                const handleClickOutside = (event: MouseEvent) => {
                        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                                // Click outside content, handled by parent Dialog component
                        }
                };

                document.addEventListener("mousedown", handleClickOutside);
                return () => {
                        document.removeEventListener("mousedown", handleClickOutside);
                };
        }, []);

        return (
                <div
                        ref={contentRef}
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                                "bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl",
                                className
                        )}
                >
                        {children}
                </div>
        );
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className }) => {
        return <div className={cn("mb-4", className)}>{children}</div>;
};

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className }) => {
        return <div className={cn("flex justify-end space-x-2 mt-6", className)}>{children}</div>;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => {
        return <h3 className={cn("text-xl font-semibold text-white", className)}>{children}</h3>;
};

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className }) => {
        return <p className={cn("text-gray-300 mt-2", className)}>{children}</p>;
};
