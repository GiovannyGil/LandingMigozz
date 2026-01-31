import type { JSX } from "react";
import "./style.css";
import exampleOne from "../../assets/images/ExampleOne.webp";
import exampleTwo from "../../assets/images/ExampleTwo.webp";
import exampleThree from "../../assets/images/ExampleThree.webp";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";

export const SlideExample = (): JSX.Element => {
    const { language } = useLanguage();

    return (
        <section className="slide-example-section">
            <div className="slide-example-container">
                {/* Item 1 */}
                <div className="example-card">
                    <div className="example-image-container">
                        <img src={exampleOne} alt="Visualize followers" className="example-image" />
                    </div>
                    <p className="example-text">
                        {language?.LANDING?.SLIDE_1_TEXT}
                    </p>
                </div>

                {/* Item 2 */}
                <div className="example-card">
                    <div className="example-image-container">
                        <img src={exampleThree} alt="Connect networks" className="example-image" />
                    </div>
                    <p className="example-text">
                        {language?.LANDING?.SLIDE_2_TEXT}
                    </p>
                </div>

                {/* Item 3 */}
                <div className="example-card">
                    <div className="example-image-container">
                        <img src={exampleTwo} alt="Receive gifts and rewards" className="example-image" />
                    </div>
                    <p className="example-text">
                        {language?.LANDING?.SLIDE_3_TEXT}
                    </p>
                </div>
            </div>
        </section>
    );
};
