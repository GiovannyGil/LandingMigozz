import type { JSX } from "react";
import { useState } from "react";
import "./style.css";
import MigozzLogo from "../../assets/icons/Migozz.svg";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";
import { useFirebase } from "../../Providers/FirebaseContext/FirebaseContext";
import { checkUsernameExists } from "../../services/firebase/userService";

export const JoinMigozz = (): JSX.Element => {
    const { language } = useLanguage();
    const { db } = useFirebase();
    const [username, setUsername] = useState<string>("");

    const handleClaim = async () => {
        if (!username.trim()) {
            alert("Please enter a username");
            return;
        }

        try {
            const exists = await checkUsernameExists(db, username.trim());
            if (exists) {
                alert(`The username '${username}' is already taken.`);
            } else {
                alert(`The username '${username}' is available!`);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while checking the username.");
        }
    };

    return (
        <section className="join-migozz-section">
            <div className="join-card">
                <h1 className="join-title">{language?.LANDING?.JOIN_TITLE}</h1>
                <p className="join-subtitle">
                    {language?.LANDING?.JOIN_SUBTITLE}
                </p>

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
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button className="claim-btn" onClick={handleClaim}>
                        {language?.LANDING?.CLAIM_BTN}
                    </button>
                </div>

                <button className="pre-save-btn">
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
