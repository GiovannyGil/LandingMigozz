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
        JOIN_SUBTITLE_ONE: string;
        JOIN_SUBTITLE_TWO: string;
        USERNAME_PLACEHOLDER: string;
        EMAIL_PLACEHOLDER: string;
        CLAIM_BTN: string;
        PRE_SAVE_BTN: string;
        SECURITY_NOTE_PART_1: string;
        SECURITY_NOTE_PART_2: string;
        SLIDE_1_TITLE: string;
        SLIDE_1_TEXT: string;
        SLIDE_2_TITLE: string;
        SLIDE_2_TEXT: string;
        SLIDE_3_TITLE: string;
        SLIDE_3_TEXT: string;
        WHATSAPP_BTN: string;
        ALERTS: {
            ENTER_USERNAME: string;
            USERNAME_TAKEN: string;
            USERNAME_AVAILABLE: string;
            CHECK_USER_ERROR: string;
            ENTER_EMAIL: string;
            INVALID_EMAIL: string;
            USERNAME_TAKEN_LATE: string;
            EMAIL_REGISTERED: string;
            VERIFICATION_SENT: string;
            REGISTRATION_ERROR: string;
            PROCESS_ERROR: string;
        }
    }
}

export interface ILanguage { code: string; translations: Translations }