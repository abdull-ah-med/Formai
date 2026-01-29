import React, { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

const getTiers = (annual: boolean) => [
        {
                name: "Free",
                price: "$0",
                frequency: "/month",
                features: [
                        "Up to 3 active forms",
                        "100 submissions/month",
                        "Basic AI form generation",
                        "Community support",
                ],
                cta: "Get Started",
                highlight: false,
                badge: null,
                showMoneyBack: false,
        },
        {
                name: "Premium",
                price: annual ? "$10" : "$12",
                frequency: "/month",
                annualCharge: annual
                        ? "$120 charged per annum, upon upgrading"
                        : undefined,
                features: [
                        annual
                                ? "120,000 submissions/year"
                                : "10,000 submissions/month",
                        "Unlimited forms",
                        "Advanced AI form generation",
                        "Custom branding",
                        "Advanced analytics",
                        "Priority email support",
                        "Integrations (Zapier, Slack, etc.)",
                        "Export to CSV/Excel",
                ],
                cta: annual ? "Go Annual & Save" : "Upgrade Now",
                highlight: true,
                badge: annual ? "Best Deal" : "Most Popular",
                showMoneyBack: true,
        },
        {
                name: "Enterprise",
                price: "Custom",
                frequency: "",
                features: [
                        "All Premium features",
                        "Unlimited submissions",
                        "Custom branding",
                        "Advanced analytics",
                        "Priority support",
                        "Team collaboration",
                        "API access",
                ],
                cta: "Contact Sales",
                highlight: false,
                badge: null,
                showMoneyBack: true,
        },
];

const Pricing: React.FC = () => {
        useDocumentTitle("Pricing");
        const [annual, setAnnual] = useState(false);
        const tiers = getTiers(annual);
        const scrollRef = useRef<HTMLDivElement>(null);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [autoScroll, setAutoScroll] = useState(true);
        const cardCount = tiers.length;

        // Auto-scroll logic
        useEffect(() => {
                if (!autoScroll) return;
                const interval = setInterval(() => {
                        setCurrentIndex((prev) => (prev + 1) % cardCount);
                }, 2000);
                return () => clearInterval(interval);
        }, [autoScroll, cardCount]);

        // Scroll to card when currentIndex changes
        useEffect(() => {
                if (scrollRef.current) {
                        const container = scrollRef.current;
                        const card = container.children[
                                currentIndex
                        ] as HTMLElement;
                        if (card) {
                                card.scrollIntoView({
                                        behavior: "smooth",
                                        inline: "center",
                                        block: "nearest",
                                });
                        }
                }
        }, [currentIndex, autoScroll]);

        // Stop auto-scroll on user interaction
        useEffect(() => {
                const stopAuto = () => setAutoScroll(false);
                const container = scrollRef.current;
                if (container) {
                        container.addEventListener("touchstart", stopAuto, {
                                passive: true,
                        });
                        container.addEventListener("wheel", stopAuto, {
                                passive: true,
                        });
                        container.addEventListener("mousedown", stopAuto, {
                                passive: true,
                        });
                }
                return () => {
                        if (container) {
                                container.removeEventListener(
                                        "touchstart",
                                        stopAuto
                                );
                                container.removeEventListener(
                                        "wheel",
                                        stopAuto
                                );
                                container.removeEventListener(
                                        "mousedown",
                                        stopAuto
                                );
                        }
                };
        }, []);

        // Arrow navigation handlers
        const handleArrow = (dir: "left" | "right") => {
                setAutoScroll(false);
                setCurrentIndex((prev) => {
                        if (dir === "left")
                                return prev === 0 ? cardCount - 1 : prev - 1;
                        return prev === cardCount - 1 ? 0 : prev + 1;
                });
        };

        return (
                <div className="min-h-screen bg-black text-white flex flex-col items-center pt-24 pb-16 px-4">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                                Pricing Plans
                        </h1>
                        {/* Toggle Switch at the top of cards */}
                        <div className="w-full flex justify-center mb-8">
                                <div className="flex items-center gap-4">
                                        <span
                                                className={
                                                        !annual
                                                                ? "text-white font-semibold"
                                                                : "text-white/60"
                                                }
                                        >
                                                Monthly
                                        </span>
                                        <button
                                                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${annual
                                                                ? "bg-white/30"
                                                                : "bg-white/60"
                                                        }`}
                                                onClick={() =>
                                                        setAnnual((a) => !a)
                                                }
                                                aria-label="Toggle annual pricing"
                                        >
                                                <span
                                                        className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${annual
                                                                        ? "translate-x-6"
                                                                        : "translate-x-0"
                                                                }`}
                                                />
                                        </button>
                                        <span
                                                className={
                                                        annual
                                                                ? "text-white font-semibold"
                                                                : "text-white/60"
                                                }
                                        >
                                                Annual
                                        </span>
                                        {annual && (
                                                <span className="ml-2 px-2 py-1 text-xs rounded bg-green-600 text-white">
                                                        Save 17%
                                                </span>
                                        )}
                                </div>
                        </div>
                        {/* Arrows for mobile */}
                        {cardCount > 1 && (
                                <div className="relative w-full max-w-5xl md:hidden mb-4 h-0">
                                        <button
                                                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                                                onClick={() =>
                                                        handleArrow("left")
                                                }
                                                aria-label="Previous card"
                                        >
                                                <ChevronLeft size={20} />
                                        </button>
                                        <button
                                                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                                                onClick={() =>
                                                        handleArrow("right")
                                                }
                                                aria-label="Next card"
                                        >
                                                <ChevronRight size={20} />
                                        </button>
                                </div>
                        )}
                        {/* Swipeable Cards for Mobile, Grid for Desktop */}
                        <div
                                ref={scrollRef}
                                className="w-full max-w-5xl flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide pl-4 pr-4 md:pl-0 md:pr-0 py-4 md:py-0"
                                style={{
                                        scrollSnapType: "x mandatory",
                                        WebkitOverflowScrolling: "touch",
                                }}
                        >
                                {tiers.map((tier) => (
                                        <div
                                                key={tier.name}
                                                className={`relative flex-shrink-0 w-80 md:w-auto bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform duration-300 mx-2 ${tier.highlight
                                                                ? "border-2 border-white shadow-white/30"
                                                                : ""
                                                        } md:hover:scale-105 md:transition-transform snap-center md:snap-none`}
                                                style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                }}
                                        >
                                                {/* Badge: Only one at a time */}
                                                {tier.badge && (
                                                        <span
                                                                className={`absolute -top-4 left-1/2 -translate-x-1/2 z-20 ${tier.badge ===
                                                                                "Best Deal"
                                                                                ? "bg-green-600"
                                                                                : "bg-blue-600"
                                                                        } text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                                                        >
                                                                {tier.badge}
                                                        </span>
                                                )}
                                                <h2 className="text-2xl font-semibold mb-2">
                                                        {tier.name}
                                                </h2>
                                                <div className="flex flex-col items-center mb-6 w-full">
                                                        <div className="flex items-end">
                                                                <span className="text-4xl font-bold">
                                                                        {
                                                                                tier.price
                                                                        }
                                                                </span>
                                                                <span className="text-lg text-white/60 ml-1">
                                                                        {
                                                                                tier.frequency
                                                                        }
                                                                </span>
                                                        </div>
                                                        {tier.annualCharge && (
                                                                <span className="text-sm text-white/60 mt-1 text-center w-full block">
                                                                        {
                                                                                tier.annualCharge
                                                                        }
                                                                </span>
                                                        )}
                                                </div>
                                                <ul className="mb-8 space-y-3 w-full">
                                                        {tier.features.map(
                                                                (feature) => (
                                                                        <li
                                                                                key={
                                                                                        feature
                                                                                }
                                                                                className="flex items-center text-white/90"
                                                                        >
                                                                                <span className="inline-block w-2 h-2 bg-white rounded-full mr-3"></span>
                                                                                {
                                                                                        feature
                                                                                }
                                                                        </li>
                                                                )
                                                        )}
                                                </ul>
                                                <div className="flex-grow" />
                                                <div className="w-full flex flex-col items-center">
                                                        {tier.name ===
                                                                "Free" ? (
                                                                <Link
                                                                        to="/signup"
                                                                        className="w-full"
                                                                >
                                                                        <Button
                                                                                size="lg"
                                                                                className="bg-white text-black hover:bg-transparent hover:border-white hover:text-white border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 w-full"
                                                                        >
                                                                                {
                                                                                        tier.cta
                                                                                }
                                                                        </Button>
                                                                </Link>
                                                        ) : tier.name ===
                                                                "Premium" ? (
                                                                <Link
                                                                        to="/signin"
                                                                        className="w-full"
                                                                >
                                                                        <Button
                                                                                size="lg"
                                                                                className="bg-white text-black hover:bg-transparent hover:border-white hover:text-white border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 w-full"
                                                                        >
                                                                                {
                                                                                        tier.cta
                                                                                }
                                                                        </Button>
                                                                </Link>
                                                        ) : (
                                                                <Button
                                                                        size="lg"
                                                                        className="bg-white text-black hover:bg-transparent hover:border-white hover:text-white border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 w-full"
                                                                >
                                                                        {
                                                                                tier.cta
                                                                        }
                                                                </Button>
                                                        )}
                                                        {tier.name !==
                                                                "Free" && (
                                                                        <Link
                                                                                to="/signup"
                                                                                className="w-full mt-3"
                                                                        >
                                                                                <Button
                                                                                        size="lg"
                                                                                        className="bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 w-full"
                                                                                >
                                                                                        Sign
                                                                                        Up
                                                                                </Button>
                                                                        </Link>
                                                                )}
                                                        {tier.showMoneyBack && (
                                                                <div className="mt-4 text-sm text-white/70 text-center w-full">
                                                                        7-day
                                                                        money-back
                                                                        guarantee,
                                                                        no
                                                                        questions
                                                                        asked
                                                                </div>
                                                        )}
                                                        {tier.name ===
                                                                "Free" && (
                                                                        <div
                                                                                className="mt-4 text-sm invisible select-none"
                                                                                style={{
                                                                                        height: "40px",
                                                                                }}
                                                                        >
                                                                                placeholder
                                                                        </div>
                                                                )}
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
};

export default Pricing;
