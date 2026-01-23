import type { Translations } from "../types";

const EN: Translations = {
    COMMON: {
        CANCEL: "Cancel",
    },
    LOGIN: {
        WELCOME_TO_MIGOZZ: "Welcome to Migozz!",
        CONECT_YOUR_COMUNITY: "Connect with your community",
        EMAIL_PLACEHOLDER: "Email address",
        PASSWORD_PLACEHOLDER: "Password",
        SUBMIT_BUTTON: "Log In",
        OTHER_LOGIN_TEXT: "Or log in with",
        LOGIN_WITH_GOOGLE: "Google",
        DONT_HAVE_ACCOUNT: " Don't have an account? ",
        REGISTER_TEXT: " Sign Up ",
        TERMS_AND_CONDITIONS_PART_ONE: "By signing up, you agree to our",
        TERMS_AND_CONDITIONS_PART_TWO: "terms and conditions.",
    },
    HEADER: {
        SEARCH: "Search",
    },
    LOADING: {
        LOADING: "Loading...",
    },
    SIDEBAR: {
        DASHBOARD: "Dashboard",
        USERS: "Users",
        PUBLICATIONS: "Publications",
        APP_SETTINGS: "App Settings",
        LOGOUT: "Log Out",
        LOGOUT_CONFIRM_TITLE: "Log Out",
        LOGOUT_CONFIRM_MESSAGE: "Are you sure you want to log out?",
        GENERAL: "General",
        NOTIFICATIONS: "Notifications",
        INTEGRATIONS: "Integrations",
        USER_ROLES: "User Roles",
        ADVANCED_SECURITY: "Advanced Security",
    },
    DASHBOARD: {
        TITLE: "Dashboard",
        SUBTITLE: "App overview and key statistics",
        ROL_ONE: "4dm1n",
        ROL_ONE_DESCRIPTION: "Administrator",
        ROL_TWO: "Sup3rv1s0r",
        ROL_TWO_DESCRIPTION: "Supervisors",
        ROL_THREE: "Us3r",
        ROL_THREE_DESCRIPTION: "Standard users",

        TITLE_TIME_LINE_USERS_REGISTERED: "Timeline of User Registrations",
        SUBTITLE_TIME_LINE_USERS_REGISTERED: "Evolution of registrations over time",
        REGISTER_TIME_LINE: "Registrations",
        HIGHEST_PEAK: "Highest Peak",
        LOWEST_PEAK: "Lowest Peak",

        NO_RECORD_DATA_AVAILABLE: "No record data available",
        USERS: "Users",
        REGISTERED_USERS: "Registered Users",

        PROFILE_COMPLETED_TITLE: "Profile Completed",
        PROFILE_COMPLETED_SUBTITLE: "Percentage of users with completed profiles",
        COMPLETED: "Completed",
        INCOMPLETED: "Incompleted",

        COUNTRIES_DISTRIBUTION_TITLE: "Countries Distribution",
        COUNTRIES_DISTRIBUTION_SUBTITLE: "Top countries with most users",

        SOCIAL_NETWORKS_SINCHRONIZATION_TITLE: "Linked Social Networks",
        SOCIAL_NETWORKS_SINCHRONIZATION_SUBTITLE: "Platforms connected by users",

        GENDER_DISTRIBUTION_TITLE: "Gender Distribution",
        GENDER_DISTRIBUTION_SUBTITLE: "Proportion of genders among users",
        GENDER_MALE: "Male",
        GENDER_FEMALE: "Female",
        GENDER_OTHER: "Not specified",
    },
    USERS: {
        TITLE: "Users",
        SUBTITLE: "Manage and view all user profiles",
        ALERT_TITLE: "Delete user",
        ALERT_MESSAGE_PART_ONE: "Are you sure you want to delete ",
        ALERT_MESSAGE_PART_TWO: "? This action cannot be undone.",
        ALERT_TITLE_SUCCESS: "User deleted",
        ALERT_SUCCESS_MESSAGE_PART_ONE: "The user ",
        ALERT_SUCCESS_MESSAGE_PART_TWO: " has been deleted successfully.",
        ALERT_TITLE_ERROR: "Error",
        ALERT_MESSAGE_ERROR: "Error deleting user. Please try again.",

        TABLE_NAME: "Name",
        TABLE_EMAIL: "Email",
        TABLE_ACTIONS: "Actions",
        TABLE_STATUS: "Status",
        TABLE_GO_SOCIAL_NETWORKS: "Go to Social Networks",

        TABLE_NO_USERS_FOUND: "No users found",

        EDIT_USER_TITLE: "Edit user",
        EDIT_USER_SUBTITLE: "Edit user profile",
        EDIT_USER_BASIC_INFORMATION: "Basic Information",
        EDIT_USER_EMAIL: "Email",
        EDIT_USER_DISPLAY_NAME: "Display name",
        EDIT_USER_PASSWORD: "Password",
        EDIT_USER_CATEGORY: "Category",
        EDIT_USER_INTERESTS: "Interests",
        EDIT_USER_STATUS: "Status",
        EDIT_USER_SAVE_BUTTON: "Save",
        EDIT_USER_CANCEL_BUTTON: "Cancel",
        EDIT_USER_IMAGE: "Upload Image",
        EDIT_USER_USERNAME: "Username",
        EDIT_USER_PHONE: "Phone",
        EDIT_USER_BIRTH_DATE: "Birth Date",
        EDIT_USER_GENDER: "Gender",
        EDIT_USER_ROLE: "Role",
        EDIT_USER_LANGUAGE: "Language",
        EDIT_USER_LOCATION: "Location",
        EDIT_USER_CITY: "City",
        EDIT_USER_COUNTRY: "Country",
        EDIT_USER_STATE: "State",
        EDIT_USER_LAT: "Lat",
        EDIT_USER_LNG: "Lng",
        EDIT_USER_SELECT_CATEGORIES: "Select categories",
        EDIT_USER_SELECT_INTERESTS: "Select interests",
        EDIT_USER_ACTIVATED: "Activated",
        EDIT_USER_DISABLED: "Disabled",
        EDIT_USER_TOGGLE_USER_STATUS: "Toggle user status",
        EDIT_USER_DELETE_BUTTON: "Delete",
        EDIT_USER_CATEGORIES: "Categories",

        DELETE_SELECTED_BUTTON: "Delete Selected",
        ALERT_DELETE_SELECTED_TITLE: "Delete Users",
        ALERT_DELETE_SELECTED_MESSAGE_PART_1: "Are you sure you want to delete ",
        ALERT_DELETE_SELECTED_MESSAGE_PART_2: " users? This action cannot be undone.",
        ALERT_DELETE_SELECTED_SUCCESS_TITLE: "Success",
        ALERT_DELETE_SELECTED_SUCCESS_MESSAGE_PART_1: "Successfully deleted ",
        ALERT_DELETE_SELECTED_SUCCESS_MESSAGE_PART_2: " users.",
        ALERT_UPDATE_USER_SUCCESS_MESSAGE_PART_1: "User \"",
        ALERT_UPDATE_USER_SUCCESS_MESSAGE_PART_2: "\" has been updated successfully.",
        ALERT_CONFIRM_TEXT_DELETE: "Delete",
        ALERT_CONFIRM_TEXT_OK: "OK",
    },
    PUBLICATIONS: {
        TITLE: "Publications",
        SUBTITLE: "Manage and view all publications"
    },
    APP_SETTINGS: {
        TITLE: "App Settings",
        SUBTITLE: "Manage and view all app settings",
        SEARCH_PLACEHOLDER: "Search settings",

        GENERAL: {
            TITLE: "General",
            DESCRIPTION: "App name, language, logo",
            APP_NAME: "App Name",
            APP_LANGUAGE: "App Language",
            APP_LOGO: "App Logo",
            LANGUAGE_ENGLISH: "English",
            LANGUAGE_SPANISH: "Spanish",
        },
        NOTIFICATIONS: {
            TITLE: "Notifications",
            DESCRIPTION: "Alerts, automated emails"
        },
        INTEGRATIONS: {
            TITLE: "Integrations",
            DESCRIPTION: "Instagram, Facebook, YouTube, TikTok, Spotify"
        },
        USER_ROLES: {
            TITLE: "User Roles",
            DESCRIPTION: "Permissions and hierarchies"
        },
        ADVANCED_SECURITY: {
            TITLE: "Advanced Security",
            DESCRIPTION: "Passwords, access, authentication"
        }
    },
    LANDING: {
        WELCOME_TITLE: "THE FIRST AI SOCIAL MEDIA ECOSYSTEM",
        WELCOME_SUBTITLE: "Migozz is the ultimate AI-powered social ecosystem that connects, centralizes, and monetizes your entire digital presence.",
        MORE_INFO_TITLE: "THE PROBLEM WE’RE SOLVING",
        MIGOZZ_SOLUTION_LABEL: "Migozz Solution: ",
        PROBLEMS: [
            {
                TITLE: "How do I connect all my Socials",
                PROBLEM: "Fans struggle to find creators on new platforms after an account is lost.",
                SOLUTION: "Smart linking ensures your followers always know where to find you, no matter what platform you're on."
            },
            {
                TITLE: "User's Don't own their data",
                PROBLEM: "Platforms control your audience, so if you're banned, you lose your followers.",
                SOLUTION: "We give you full ownership of your follower data, so you always have access to your community."
            },
            {
                TITLE: "How Many Followers do you really have?",
                PROBLEM: "Fans don't always realize you're active on multiple platforms.",
                SOLUTION: "Migozz seamlessly connects your followers across all platforms, making it easy for them to stay engaged."
            },
            {
                TITLE: "Wasting too much time posting",
                PROBLEM: "Manually uploading content across different social media accounts takes too long.",
                SOLUTION: "One-click cross-posting lets you share content everywhere instantly, saving you time."
            },
            {
                TITLE: "Unfair Account Suspensions",
                PROBLEM: "Accounts can be suspended without warning, leaving creators with no way to recover.",
                SOLUTION: "We provide backup and recovery options, ensuring you never lose access to your audience or content."
            },
            {
                TITLE: "Platforms are charging too much",
                PROBLEM: "Big platforms take a large percentage of a creator's income.",
                SOLUTION: "We charge lower fees so you keep more of the money you earn."
            }
        ],
        JOIN_TITLE: "Join Migozz!",
        JOIN_SUBTITLE: "Create your AI Social Ecosystem! Recieve Gifts & Monetize.",
        USERNAME_PLACEHOLDER: "migozz.ai/yourname",
        EMAIL_PLACEHOLDER: "Enter your email",
        CLAIM_BTN: "Validate availability",
        PRE_SAVE_BTN: "Pre-Save",
        SECURITY_NOTE_PART_1: "No registration fee",
        SECURITY_NOTE_PART_2: "Your information is secure.",
        SLIDE_1_TEXT: "Visualize the total number of your followers across all your platforms. Migozz shows you the true power of your community.",
        SLIDE_2_TEXT: "Your followers can follow you on other networks directly from Migozz. You decide how and where to connect.",
        SLIDE_3_TEXT: "Receive gifts for your influence and participation. The more you grow, the more rewards you unlock.",
        WHATSAPP_BTN: "Join our WhatsApp channel",
        ALERTS: {
            ENTER_USERNAME: "Please enter a username.",
            USERNAME_TAKEN: "The username '{username}' is already taken.",
            USERNAME_AVAILABLE: "The username '{username}' is available!",
            CHECK_USER_ERROR: "An error occurred while checking the username.",
            ENTER_EMAIL: "Please enter your email address.",
            INVALID_EMAIL: "Please enter a valid email address.",
            USERNAME_TAKEN_LATE: "The username '{username}' has already been taken.",
            EMAIL_REGISTERED: "The email address is already registered.",
            VERIFICATION_SENT: "A verification email has been sent.",
            REGISTRATION_ERROR: "Could not complete registration. Please try again.",
            PROCESS_ERROR: "An error occurred while processing your request."
        }
    }
}

export default EN;