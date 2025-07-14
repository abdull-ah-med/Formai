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
        useEffect(() => {
                if (open) {
                        document.body.style.overflow = "hidden";
                } else {
                        document.body.style.overflow = "unset";
                }

                return () => {
                        document.body.style.overflow = "unset";
                };
        }, [open]);

        if (!open) return null;

        return (
                <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
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
                                "bg-white/15 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-xl animate-in slide-in-from-bottom-5 duration-200",
                                "border border-white/10 max-h-[85vh] overflow-y-auto",
                                className
                        )}
                >
                        {children}
                </div>
        );
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className }) => {
        return <div className={cn("mb-6", className)}>{children}</div>;
};

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className }) => {
        return <div className={cn("mt-8 flex flex-wrap gap-2 justify-end", className)}>{children}</div>;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => {
        return <h3 className={cn("text-xl font-medium text-white", className)}>{children}</h3>;
};

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className }) => {
        return <p className={cn("text-gray-300 mt-2 leading-relaxed", className)}>{children}</p>;
};
