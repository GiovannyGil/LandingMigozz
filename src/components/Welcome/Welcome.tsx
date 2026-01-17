import type { JSX } from "react";
import "./style.css";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";

export const Welcome = (): JSX.Element => {
    const { language } = useLanguage();

    return (
        <section className="welcome-container">
            <div className="welcome-content">
                <h1 className="welcome-title">
                    {language?.LANDING?.WELCOME_TITLE}
                </h1>
                <p className="welcome-subtitle">
                    {language?.LANDING?.WELCOME_SUBTITLE}
                </p>
            </div>

            {/* Scroll indicator with infinite bounce animation */}
            <div className="scroll-indicator">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </div>
        </section>
    );
};