import index from "./Index";
import type { Translations } from "./types";

class Language {
    private availableLanguages = Object.keys(index);

    async getLanguage(): Promise<{ code: string, translations: Translations }> {
        return this.getBrowserLanguage();
    }

    private getBrowserLanguage(): { code: string, translations: Translations } {
        // Intentar obtener el idioma del navegador
        const browserLanguage = navigator.language || (navigator as any).userLanguage;
        const code = browserLanguage.split("-")[0].toLowerCase();

        // Verificar si el idioma está disponible
        if (this.availableLanguages.includes(code)) {
            return { code, translations: index[code as keyof typeof index] };
        }

        // Idioma por defecto: inglés
        return { code: "en", translations: index.en };
    }
}

export default Language;