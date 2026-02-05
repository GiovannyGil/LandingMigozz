import { useState, useEffect } from "react";
import "./style.css";
import { useLanguage } from "../../Providers/LanguageContext/LanguageContext";
import { subscribeToPreRegisteredCount } from "../../services/firebase/userService";
import { Loader } from "../Loader/Loader";

export const PreRegisters = () => {
    const { language } = useLanguage();
    
    // State
    const [count, setCount] = useState<number>(0);
    // const [users, setUsers] = useState<PreRegisterUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
    // const [searchTerm, setSearchTerm] = useState<string>("");

    // Initial Load & Real-time subscription
    useEffect(() => {
        let unsubscribe: () => void;

        const initData = async () => {
            console.log("PreRegisters: Initializing real-time listener...");
            setIsLoading(true);
            try {
                // Subscribe to real-time updates
                unsubscribe = subscribeToPreRegisteredCount((newCount) => {
                    console.log("PreRegisters: Real-time count update:", newCount);
                    setCount(newCount);
                    setIsLoading(false); // Ensure loading is false once we have data
                });
            } catch (error) {
                console.error("Failed to setup pre-registers listener", error);
                setIsLoading(false);
            }
        };

        initData();

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []); // Only mount

    // Search Effect with Debounce
    // useEffect(() => {
    //     const timer = setTimeout(async () => {
    //          setIsLoadingList(true);
    //          try {
    //             const results = await searchPreRegisteredUsers(searchTerm);
    //             setUsers(results);
    //          } catch (e) {
    //              console.error(e);
    //          } finally {
    //              setIsLoadingList(false);
    //          }
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [searchTerm]);

    
    // Helper to format large numbers
    const formatCount = (num: number) => {
        return new Intl.NumberFormat().format(num);
    };

    return (
        <section className="pre-registers-section">
            <div className="pre-content-wrapper">
                
                {/* Header */}
                <div className="pre-header">
                    <h2 className="pre-title" dangerouslySetInnerHTML={{ __html: language?.LANDING?.PRE_REGISTERS_TITLE || "" }}></h2>
                    <p className="pre-subtitle">
                        {language?.LANDING?.PRE_REGISTERS_SUBTITLE}
                    </p>
                </div>

                {/* Counter Card */}
                <div className="counter-card">
                    <div className="counter-number">
                        {isLoading ? <Loader /> : formatCount(count)}
                    </div>
                    <div className="counter-label">
                        {language?.LANDING?.REGISTERED_USERS_LABEL}
                    </div>
                </div>

                {/* Users List Section */}
                {/* Users List Section */}
                {/* <div className="users-list-container">
                    <h3 className="list-title">{language?.LANDING?.USERS_TABLE_TITLE}</h3>
                    
                    // ... Search Bar
                    <div className="search-bar-wrapper">
                        <input 
                            type="text" 
                            className="user-search-input"
                            placeholder={language?.LANDING?.SEARCH_PLACEHOLDER}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>

                    // ... Table
                    <div className="users-table-wrapper">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>{language?.LANDING?.TABLE_HEADER_EMAIL}</th>
                                    <th>{language?.LANDING?.TABLE_HEADER_USERNAME}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoadingList ? (
                                    <tr>
                                        <td colSpan={2} style={{ textAlign: 'center', padding: '2rem' }}>
                                            <Loader />
                                        </td>
                                    </tr>
                                ) : users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div> */}

            </div>
        </section>
    );
};
