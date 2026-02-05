import type { JSX } from "react";
import { useState, useEffect, useCallback } from "react";
import "./style.css";
import MigozzLogo from "../../assets/icons/Migozz.svg";

import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";
// import { useFirebase } from "../../Providers/FirebaseContext/FirebaseContext";
import { checkUsernameExists, checkEmailExists } from "../../services/firebase/userService";
import { Alert } from "../Alert/Alert";
import { Loader } from "../Loader/Loader";

export const JoinMigozz = (): JSX.Element => {
    const { language } = useLanguage();
    // const { db } = useFirebase(); // db not needed for API calls
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(false);
    const [showEmailInput, setShowEmailInput] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>(""); // New state for username error
    const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false); // Sync state
    const [isLoading, setIsLoading] = useState<boolean>(false);


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

    const closeAlert = useCallback(() => {
        setAlertState(prev => ({ ...prev, isOpen: false }));
    }, []);

    const showAlert = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
        setAlertState({
            isOpen: true,
            type,
            message
        });
    };

    // Real-time validation effect
    useEffect(() => {
        // Clear errors immediately when typing starts
        setUsernameError("");
        if (!username.trim()) {
            setIsUsernameAvailable(false);
            return;
        }

        setIsCheckingUsername(true);
        const debounceTimer = setTimeout(async () => {
            try {
                const exists = await checkUsernameExists(username.trim());
                if (exists) {
                    setUsernameError((language?.LANDING?.ALERTS?.USERNAME_TAKEN || "The username '{username}' is already taken.").replace('{username}', username));
                    setIsUsernameAvailable(false);
                } else {
                    setIsUsernameAvailable(true);
                }
            } catch (error) {
                console.error("Validation error:", error);
                setIsUsernameAvailable(false);
                setUsernameError(language?.LANDING?.ALERTS?.CHECK_USER_ERROR || "Error validating username.");
            } finally {
                setIsCheckingUsername(false);
            }
        }, 500); // 500ms delay

        return () => clearTimeout(debounceTimer);
    }, [username, language]);

    const handleClaim = async () => {
        if (!username.trim()) {
            showAlert('warning', language?.LANDING?.ALERTS?.ENTER_USERNAME || "Please enter a username.");
            return;
        }

        // If error exists visibly, show alert immediately
        if (usernameError) {
             showAlert('error', usernameError);
             return;
        }

        // If currently checking (debounce active), wait or show loading
        if (isCheckingUsername) {
            // Can show a mini loader or just wait. 
            // For now let's just trigger loading to indicate work is happening
        }

        setIsLoading(true);
        try {
            // We force a check here if for some reason the debounce didn't catch it 
            // or to confirm 100% before proceeding
            const exists = await checkUsernameExists(username.trim());
            if (exists) {
                const msg = (language?.LANDING?.ALERTS?.USERNAME_TAKEN || "The username '{username}' is already taken.").replace('{username}', username);
                showAlert('error', msg);
                setUsernameError(msg);
                setIsUsernameAvailable(false);
            } else {
                showAlert('success', (language?.LANDING?.ALERTS?.USERNAME_AVAILABLE || "The username '{username}' is available!").replace('{username}', username));
                setIsUsernameAvailable(true);
                // Optionally move to next step immediately if that's the desired flow
                // But current flow seems to be: Check -> Alert Success -> Maybe user clicks Claim again? 
                // Creating a smooth flow: if available, maybe we should just ASK the user if they want to proceed?
                // The original code just showed alert logic. Keeping it to minimize flow disruption unless asked.
            }
        } catch (error: any) {
            console.error(error);
            const msg = error?.message || language?.LANDING?.ALERTS?.CHECK_USER_ERROR || "An error occurred while checking the username.";
            showAlert('error', msg);
            setUsernameError(msg);
            setIsUsernameAvailable(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePreSave = async () => {
        if (!showEmailInput) {
            // First click: Show Email Input
            // Check availability one last time or rely on state?
            if (!isUsernameAvailable) { 
                 // If invalid or not checked, try checking
                 handleClaim(); 
                 return;
            }
            setShowEmailInput(true);
        } else {
            // Second click: Validate Email
            if (!email.trim()) {
                const msg = language?.LANDING?.ALERTS?.ENTER_EMAIL || "Please enter your email address.";
                showAlert('warning', msg);
                setEmailError(msg);
                return;
            }

            // Simple email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const msg = language?.LANDING?.ALERTS?.INVALID_EMAIL || "Please enter a valid email address.";
                showAlert('warning', msg);
                setEmailError(msg);
                return;
            }

            setEmailError(""); // Clear previous errors
            setIsLoading(true);

            try {
                // Check if username is still available (just in case)
                const userExists = await checkUsernameExists(username.trim());
                if (userExists) {
                    const msg = (language?.LANDING?.ALERTS?.USERNAME_TAKEN_LATE || "The username '{username}' has already been taken.").replace('{username}', username);
                    showAlert('error', msg);
                    setIsUsernameAvailable(false);
                    setShowEmailInput(false); // Reset to starts
                    return;
                }

                const emailExists = await checkEmailExists(email.trim());
                if (emailExists) {
                    const msg = language?.LANDING?.ALERTS?.EMAIL_REGISTERED || "The email address is already registered.";
                    showAlert('error', msg);
                    setEmailError(msg);
                } else {
                    // Call Pre-register Endpoint
                    const response = await fetch('/pre-register/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email.trim(),
                            username: username.trim(),
                            language: navigator.language,
                        }),
                    });

                    if (response.ok) {
                        showAlert('success', language?.LANDING?.ALERTS?.VERIFICATION_SENT || "A verification email has been sent.");
                        // Optional: Reset form or disable further interaction
                        setShowEmailInput(false);
                        setUsername("");
                        setEmail("");
                        setEmailError("");
                        setUsernameError("");
                    } else {
                        console.error("Pre-register API failed", response.status, response.statusText);
                        
                        // Try to parse error message from API
                        let errorMsg = language?.LANDING?.ALERTS?.REGISTRATION_ERROR || "Could not complete registration. Please try again.";
                        try {
                            const errorData = await response.json();
                            if (errorData && (errorData.detail || errorData.message || errorData.error)) {
                                errorMsg = errorData.detail || errorData.message || errorData.error;
                            }
                        } catch (e) {
                            // If parsing fails, stick to default message
                        }
                        
                        showAlert('error', errorMsg);
                        setEmailError(errorMsg);
                    }
                }
            } catch (error: any) {
                console.error(error);
                const errorMsg = error?.message || (language?.LANDING?.ALERTS?.PROCESS_ERROR || "An error occurred while processing your request.");
                showAlert('error', errorMsg);
                setEmailError(errorMsg);
            } finally {
                setIsLoading(false);
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
                    {language?.LANDING?.JOIN_SUBTITLE_ONE}
                </p>
                <p className="join-subtitle">
                    {language?.LANDING?.JOIN_SUBTITLE_TWO}
                </p>

                {!showEmailInput ? (
                    <div className="input-content">
                        <div className={`input-group-container ${usernameError ? 'error' : ''}`}>
                            <div className="link-icon-box">
                                <img src={MigozzLogo} alt="" className="link-icon-svg" />
                            </div>
                            <div className="username-input-wrapper">
                                <span className="url-prefix">migozz.com/</span>
                                <input 
                                    type="text" 
                                    className="username-input" 
                                    placeholder={language?.LANDING?.USERNAME_PLACEHOLDER || "yourname"}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        // setIsUsernameAvailable(false); // Handled by effect
                                    }}
                                />
                            </div>
                            <button 
                                className={`claim-btn ${isUsernameAvailable ? 'success' : ''} ${usernameError ? 'error' : ''}`} 
                                onClick={handleClaim} 
                                disabled={isLoading || isCheckingUsername}
                            >
                                {!showEmailInput && (isLoading || isCheckingUsername) ? (
                                     <div style={{ transform: 'scale(0.5)', display: 'flex', justifyContent: 'center' }}>
                                        <Loader />
                                     </div>
                                ) : (
                                    usernameError 
                                        ? "Not available" 
                                        : isUsernameAvailable 
                                            ? "Available" 
                                            : language?.LANDING?.CLAIM_BTN
                                )}
                            </button>
                        </div>
                        {usernameError && (
                            <div className="input-error-message">
                                {usernameError}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="input-content slide-in-right">
                         <div className={`input-group-container ${emailError ? 'error' : ''}`}>
                            <div className="link-icon-box">
                                {/* Can use an email icon here if available, or re-use logo */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div className="username-input-wrapper">
                                <input 
                                    type="email" 
                                    className="username-input" 
                                    placeholder={language?.LANDING?.EMAIL_PLACEHOLDER}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (emailError) setEmailError("");
                                    }}
                                />
                            </div>
                        </div>
                        {emailError && (
                            <div className="input-error-message">
                                {emailError}
                            </div>
                        )}
                    </div>
                )}

                <button 
                    className="pre-save-btn" 
                    onClick={handlePreSave}
                    disabled={!isUsernameAvailable || (showEmailInput && isLoading)}
                >
                     {showEmailInput && isLoading ? (
                         <div style={{ transform: 'scale(0.6)', display: 'flex', justifyContent: 'center' }}>
                            <Loader />
                         </div>
                    ) : (
                        language?.LANDING?.PRE_SAVE_BTN
                    )}
                </button>

                <div className="security-note">
                    {language?.LANDING?.SECURITY_NOTE_PART_1}<br />
                    {language?.LANDING?.SECURITY_NOTE_PART_2}
                </div>
            </div>

            {/* Video Section */}

        </section>
    );
};
