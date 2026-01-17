import type { JSX } from "react";
import { useState, useEffect } from "react";
import "./style.css";
// Importing the image. 
import videoCover from "../../assets/images/video.webp";

export const Video = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // YouTube Embed URL with autoplay
    const videoUrl = "https://www.youtube.com/embed/AE3lnYXW10o?autoplay=1&rel=0";

    const openModal = () => {
        setIsModalOpen(true);
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Restore background scrolling
        document.body.style.overflow = 'unset';
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <>
            <section className="video-section">
                <div className="video-container">
                    <div className="video-wrapper">
                        <div 
                            onClick={openModal} 
                            role="button" 
                            tabIndex={0} 
                            onKeyDown={(e) => { if (e.key === 'Enter') openModal() }} 
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
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {isModalOpen && (
                <div className="video-modal-overlay" onClick={closeModal}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="video-modal-close" onClick={closeModal} aria-label="Close video">
                            &times;
                        </button>
                        <iframe 
                            className="video-iframe"
                            src={videoUrl} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};
