import type { JSX } from "react";
import "./style.css";
import dudasIcon from "../../assets/icons/Dudas.svg";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";

export const MoreInfo = (): JSX.Element => {
    const { language } = useLanguage();
    const infoItems = language?.LANDING?.PROBLEMS || [];

    return (
        <section className="more-info-section">
            <div className="more-info-title-container">
                <h1 className="more-info-title">
                    {language?.LANDING?.MORE_INFO_TITLE}
                </h1>
            </div>

            <div className="more-info-grid">
                {infoItems.map((item, index) => (
                    <div className="info-card" key={index}>
                        <div className="info-icon-wrapper">
                            <img src={dudasIcon} alt="" className="info-icon" />
                        </div>
                        <div className="info-content">
                            <h3 className="info-card-title">{item.TITLE}</h3>
                            <p className="info-card-text">
                                {item.PROBLEM}
                                <br /><br />
                                <span className="migozz-solution">{language?.LANDING?.MIGOZZ_SOLUTION_LABEL}</span>
                                {item.SOLUTION}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
