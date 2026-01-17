import React, { createContext, useState, useEffect, useContext } from "react";
import type { Translations } from "../../language/types";
import Language from "../../language/Language";

interface LanguageContextProps {
    language: Translations | null;
    code: string;
    isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextProps>({
    language: null,
    code: "en",
    isLoading: true,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Translations | null>(null);
    const [detectedCode, setDetectedCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const detectLanguage = async () => {
        const language = new Language();
        const { code, translations } = await language.getLanguage();
        setLanguage(translations);
        setDetectedCode(code);
        setIsLoading(false);
    };

    useEffect(() => {
        detectLanguage();
    }, []);

    return (
        <LanguageContext.Provider value={{ language, code: detectedCode, isLoading }}>
            {children}
        </LanguageContext.Provider>
    );
};
