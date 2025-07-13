import * as React from "react";
import { cn } from "../../lib/utils";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
        /**
         * The variant of the loader to use
         * @default "spinner"
         */
        variant?: "spinner" | "dots" | "pulse";
        /**
         * The size of the loader
         * @default "md"
         */
        size?: "sm" | "md" | "lg";
        /**
         * The color of the loader (uses Tailwind classes)
         * @default "white"
         */
        color?: string;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
        ({ className, variant = "spinner", size = "md", color = "white", ...props }, ref) => {
                const sizeClasses = {
                        sm: {
                                spinner: "h-4 w-4",
                                dots: "gap-1",
                                dotsSize: "h-1.5 w-1.5",
                                pulse: "h-6 w-6",
                        },
                        md: {
                                spinner: "h-6 w-6",
                                dots: "gap-2",
                                dotsSize: "h-2 w-2",
                                pulse: "h-8 w-8",
                        },
                        lg: {
                                spinner: "h-10 w-10",
                                dots: "gap-3",
                                dotsSize: "h-3 w-3",
                                pulse: "h-12 w-12",
                        },
                };

                return (
                        <div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
                                {variant === "spinner" && (
                                        <div
                                                className={cn(
                                                        "animate-spin rounded-full border-2 border-opacity-25",
                                                        sizeClasses[size].spinner
                                                )}
                                                style={{
                                                        borderTopColor: `currentColor`,
                                                        borderRightColor: "transparent",
                                                        borderBottomColor: "transparent",
                                                        borderLeftColor: "transparent",
                                                }}
                                        ></div>
                                )}

                                {variant === "dots" && (
                                        <div className={cn("flex items-center", sizeClasses[size].dots)}>
                                                {[0, 1, 2].map((i) => (
                                                        <div
                                                                key={i}
                                                                className={cn(
                                                                        "rounded-full bg-current animate-bounce",
                                                                        sizeClasses[size].dotsSize
                                                                )}
                                                                style={{
                                                                        animationDelay: `${i * 150}ms`,
                                                                        animationDuration: "1s",
                                                                }}
                                                        ></div>
                                                ))}
                                        </div>
                                )}

                                {variant === "pulse" && (
                                        <div
                                                className={cn(
                                                        "rounded-full bg-current/20 animate-pulse flex items-center justify-center",
                                                        sizeClasses[size].pulse
                                                )}
                                        >
                                                <div
                                                        className={cn(
                                                                "rounded-full bg-current animate-pulse",
                                                                size === "sm"
                                                                        ? "h-3 w-3"
                                                                        : size === "md"
                                                                        ? "h-4 w-4"
                                                                        : "h-6 w-6"
                                                        )}
                                                ></div>
                                        </div>
                                )}
                        </div>
                );
        }
);

Loader.displayName = "Loader";

export { Loader };
