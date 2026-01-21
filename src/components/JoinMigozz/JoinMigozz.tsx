import type { JSX } from "react";
import { useState } from "react";
import "./style.css";
import MigozzLogo from "../../assets/icons/Migozz.svg";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";
import { useFirebase } from "../../Providers/FirebaseContext/FirebaseContext";
import { checkUsernameExists, checkEmailExists } from "../../services/firebase/userService";
import { Alert } from "../Alert/Alert";

export const JoinMigozz = (): JSX.Element => {
    const { language } = useLanguage();
    const { db } = useFirebase();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(false);
    const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
    
    // Alert State
    const [alertState, setAlertState] = useState<{
        isOpen: boolean;
        type: 'info' | 'success' | 'warning' | 'error';
        message: string;
    }>({
        isOpen: false,
        type: 'info',
        message: ''
    });

    const closeAlert = () => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    };

    const showAlert = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
        setAlertState({
            isOpen: true,
            type,
            message
        });
    };

    const handleClaim = async () => {
        if (!username.trim()) {
            showAlert('warning', language?.LANDING?.ALERTS?.ENTER_USERNAME || "Please enter a username.");
            return;
        }

        try {
            const exists = await checkUsernameExists(db, username.trim());
            if (exists) {
                showAlert('error', (language?.LANDING?.ALERTS?.USERNAME_TAKEN || "The username '{username}' is already taken.").replace('{username}', username));
                setIsUsernameAvailable(false);
            } else {
                showAlert('success', (language?.LANDING?.ALERTS?.USERNAME_AVAILABLE || "The username '{username}' is available!").replace('{username}', username));
                setIsUsernameAvailable(true);
            }
        } catch (error) {
            console.error(error);
            showAlert('error', language?.LANDING?.ALERTS?.CHECK_USER_ERROR || "An error occurred while checking the username.");
            setIsUsernameAvailable(false);
        }
    };

    const handlePreSave = async () => {
        if (!showEmailInput) {
            // First click: Show Email Input
            setShowEmailInput(true);
        } else {
            // Second click: Validate Email
            if (!email.trim()) {
                showAlert('warning', language?.LANDING?.ALERTS?.ENTER_EMAIL || "Please enter your email address.");
                return;
            }

            // Simple email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('warning', language?.LANDING?.ALERTS?.INVALID_EMAIL || "Please enter a valid email address.");
                return;
            }

            try {
                // Check if username is still available (just in case)
                const userExists = await checkUsernameExists(db, username.trim());
                if (userExists) {
                    showAlert('error', (language?.LANDING?.ALERTS?.USERNAME_TAKEN_LATE || "The username '{username}' has already been taken.").replace('{username}', username));
                    setIsUsernameAvailable(false);
                    setShowEmailInput(false); // Reset to starts
                    return;
                }

                const emailExists = await checkEmailExists(db, email.trim());
                if (emailExists) {
                    showAlert('error', language?.LANDING?.ALERTS?.EMAIL_REGISTERED || "The email address is already registered.");
                } else {
                    // Call Pre-register Endpoint
                    const response = await fetch('https://migos-ms-895592952324.us-central1.run.app/pre-register/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email.trim(),
                            username: username.trim(),
                        }),
                    });

                    if (response.ok) {
                        showAlert('success', language?.LANDING?.ALERTS?.VERIFICATION_SENT || "A verification email has been sent.");
                        // Optional: Reset form or disable further interaction
                        setShowEmailInput(false);
                        setUsername("");
                        setEmail("");
                    } else {
                        console.error("Pre-register API failed", response.status, response.statusText);
                        showAlert('error', language?.LANDING?.ALERTS?.REGISTRATION_ERROR || "Could not complete registration. Please try again.");
                    }
                }
            } catch (error) {
                console.error(error);
                showAlert('error', language?.LANDING?.ALERTS?.PROCESS_ERROR || "An error occurred while processing your request.");
            }
        }
    };

    return (
        <section className="join-migozz-section">
            <Alert 
                isOpen={alertState.isOpen}
                type={alertState.type}
                message={alertState.message}
                onClose={closeAlert}
            />

            <div className="join-card">
                <h1 className="join-title">{language?.LANDING?.JOIN_TITLE}</h1>
                <p className="join-subtitle">
                    {language?.LANDING?.JOIN_SUBTITLE}
                </p>

                {!showEmailInput ? (
                    <div className="input-content">
                        <div className="input-group-container">
                            <div className="link-icon-box">
                                <img src={MigozzLogo} alt="" className="link-icon-svg" />
                            </div>
                            <div className="username-input-wrapper">
                                <input 
                                    type="text" 
                                    className="username-input" 
                                    placeholder={language?.LANDING?.USERNAME_PLACEHOLDER}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setIsUsernameAvailable(false); // Reset availability on change
                                    }}
                                />
                            </div>
                            <button className="claim-btn" onClick={handleClaim}>
                                {language?.LANDING?.CLAIM_BTN}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="input-content slide-in-right">
                         <div className="input-group-container">
                            <div className="link-icon-box">
                                {/* Can use an email icon here if available, or re-use logo */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div className="username-input-wrapper">
                                <input 
                                    type="email" 
                                    className="username-input" 
                                    placeholder="Ingresa tu correo / Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button 
                    className="pre-save-btn" 
                    onClick={handlePreSave}
                    disabled={!isUsernameAvailable}
                >
                    {language?.LANDING?.PRE_SAVE_BTN}
                </button>

                <div className="security-note">
                    {language?.LANDING?.SECURITY_NOTE_PART_1}<br />
                    {language?.LANDING?.SECURITY_NOTE_PART_2}
                </div>
            </div>
        </section>
    );
};
