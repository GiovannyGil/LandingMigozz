import type { JSX } from "react";
import "./style.css";
import MigozzLogo from "../../assets/icons/Migozz.svg";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";

export const JoinMigozz = (): JSX.Element => {
    const { language } = useLanguage();

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
                        />
                    </div>
                    <button className="claim-btn">
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