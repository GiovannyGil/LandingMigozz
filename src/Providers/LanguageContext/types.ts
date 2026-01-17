import { createContext, useContext } from "react";


export interface LanguageContextType {
    languageCode: string;
    languageName: string;
    isLoading: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
    }
    return context;
};

export const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
        'es': 'Español',
        'en': 'English',
    };
    return languages[code] || `Unknown (${code})`;
};