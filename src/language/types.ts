import Language from "./Language";

export interface Translations {
    [key: string]: any;
    LANDING: {
        WELCOME_TITLE: string;
        WELCOME_SUBTITLE: string;
        MORE_INFO_TITLE: string;
        MIGOZZ_SOLUTION_LABEL: string;
        PROBLEMS: {
            TITLE: string;
            PROBLEM: string;
            SOLUTION: string;
        }[];
        JOIN_TITLE: string;
        JOIN_SUBTITLE: string;
        USERNAME_PLACEHOLDER: string;
        CLAIM_BTN: string;
        PRE_SAVE_BTN: string;
        SECURITY_NOTE_PART_1: string;
        SECURITY_NOTE_PART_2: string;
        SLIDE_1_TEXT: string;
        SLIDE_2_TEXT: string;
        SLIDE_3_TEXT: string;
        WHATSAPP_BTN: string;
    }
}

export interface ILanguage { code: string; translations: Translations }