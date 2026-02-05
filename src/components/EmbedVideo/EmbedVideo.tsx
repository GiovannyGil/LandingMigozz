import { useState } from "react";
import "./style.css";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";
import videoCover from "../../assets/images/video.webp";

export const EmbedVideo = () => {
    const { code } = useLanguage();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Determine video ID based on language code
    // Spanish: JVuqUGGWDy8, English (default): VAvOH0GCB2Y
    const videoId = code?.startsWith('es') ? "JVuqUGGWDy8" : "VAvOH0GCB2Y";
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    return (
        <section className="video-section">
            <div className="video-container">
                <div className="video-wrapper">
                    {!isPlaying ? (
                        <div 
                            onClick={() => setIsPlaying(true)} 
                            role="button" 
                            tabIndex={0} 
                            onKeyDown={(e) => { if (e.key === 'Enter') setIsPlaying(true) }} 
                            style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                        >
                            <img 
                                src={videoCover} 
                                alt="Video Cover" 
                                className="video-cover"
                            />
                            {/* Play Button Overlay */}
                            <svg className="play-button-overlay" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="4" fill="rgba(0,0,0,0.3)"/>
                                <path d="M40 30L70 50L40 70V30Z" fill="white"/>
                            </svg>
                        </div>
                    ) : (
                        <iframe 
                            className="video-iframe"
                            src={videoUrl} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </div>
        </section>
    );
};
