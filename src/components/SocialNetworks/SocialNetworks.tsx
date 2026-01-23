import type { JSX } from "react";
import "./style.css";
// Import Icons
import tiktokIcon from "../../assets/icons/Tiktok.svg";
import instagramIcon from "../../assets/icons/Instagram.svg";
import facebookIcon from "../../assets/icons/Facebook.svg";
import youtubeIcon from "../../assets/icons/Youtube.svg";
import whatsappIcon from "../../assets/icons/WhatsApp.svg";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";

export const SocialNetworks = (): JSX.Element => {
    const { language } = useLanguage();

    return (
        <footer className="social-networks-container">
            <div className="social-content">
                {/* Social Media Icons Group */}
                <div className="social-icons">
                    <a href="https://www.tiktok.com/@migozzoficial" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                        <img src={tiktokIcon} alt="TikTok" className="social-icon-img" />
                    </a>
                    <a href="https://www.instagram.com/migozzofficial/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                        <img src={instagramIcon} alt="Instagram" className="social-icon-img" />
                    </a>
                    <a href=" https://www.facebook.com/profile.php?id=61581724792864" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                        <img src={facebookIcon} alt="Facebook" className="social-icon-img" />
                    </a>
                    <a href="https://www.youtube.com/@migozzoficial" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                        <img src={youtubeIcon} alt="YouTube" className="social-icon-img" />
                    </a>
                </div>

                {/* WhatsApp Channel Button */}
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                    <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
                    {language?.LANDING?.WHATSAPP_BTN}
                </a>
            </div>
        </footer>
    );
};
