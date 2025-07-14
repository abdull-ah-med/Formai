import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { createPortal } from "react-dom";

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
                const originalStyle = window.getComputedStyle(document.body).overflow;
                const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

                if (open) {
                        // Store the current scroll position
                        const scrollY = window.scrollY;

                        // Add padding right to prevent layout shift when scrollbar disappears
                        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                        document.body.style.paddingRight = `${scrollbarWidth}px`;

                        // Disable scrolling
                        document.body.style.overflow = "hidden";

                        // Keep the body at the same scroll position
                        document.body.style.position = "fixed";
                        document.body.style.top = `-${scrollY}px`;
                        document.body.style.width = "100%";
                } else {
                        // Re-enable scrolling
                        document.body.style.overflow = originalStyle;
                        document.body.style.paddingRight = originalPaddingRight;

                        // Restore scroll position
                        const scrollY = document.body.style.top;
                        document.body.style.position = "";
                        document.body.style.top = "";
                        document.body.style.width = "";
                        window.scrollTo(0, parseInt(scrollY || "0") * -1);
                }

                return () => {
                        // Cleanup in case component unmounts while dialog is open
                        document.body.style.overflow = originalStyle;
                        document.body.style.paddingRight = originalPaddingRight;
                        document.body.style.position = "";
                        document.body.style.top = "";
                        document.body.style.width = "";
                };
        }, [open]);

        if (!open) return null;

        const dialogContent = (
                <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => onOpenChange(false)}
                        aria-modal="true"
                        role="dialog"
                >
                        {children}
                </div>
        );

        // Use createPortal to render the dialog at the document root level
        return createPortal(dialogContent, document.body);
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
                                "border border-white/10 max-h-[80vh] overflow-y-auto",
                                "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                                "mx-auto max-w-[calc(100vw-2rem)]",
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
