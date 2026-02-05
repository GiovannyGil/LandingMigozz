import { collection, getCountFromServer, query, where, getDocs, documentId, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

/**
 * Checks if a username already exists using the API.
 * 
 * @param username - The username to check for existence.
 * @returns A promise that resolves to true if the username exists, false otherwise.
 */
export const checkUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const response = await fetch('/pre-register/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        // Safely try to parse JSON
        let data: any = {};
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch (e) {
            // Processing failed, if response was not ok, we just use status
            console.warn("Could not parse response JSON", e);
        }
        
        if (!response.ok) {
            // usage of 409 Conflict often implies existence in REST
            if (response.status === 409) return true;
            
            throw new Error(data?.message || data?.detail || `Server Error: ${response.status}`);
        }

        // Handle different possible response formats
        if (typeof data.exists === 'boolean') return data.exists;
        if (typeof data.isAvailable === 'boolean') return !data.isAvailable;
        if (typeof data.available === 'boolean') return !data.available;

        // Fallback: if details indicate existence
        if (data.status === 'taken' || data.result === 'exists') return true;

        // If strict 200 OK means "Available" and we haven't returned true yet:
        return false;
    } catch (error) {
        console.error("Error checking username existence:", error);
        throw error;
    } 
};


/**
 * Checks if an email already exists using the API.
 * 
 * @param email - The email to check for existence.
 * @returns A promise that resolves to true if the email exists, false otherwise.
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch('/pre-register/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        // Safely try to parse JSON
        let data: any = {};
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.warn("Could not parse response JSON", e);
        }

        if (!response.ok) {
             if (response.status === 409) return true;
             throw new Error(data?.message || data?.detail || `Server Error: ${response.status}`);
        }
        
        if (typeof data.exists === 'boolean') return data.exists;
        if (typeof data.isAvailable === 'boolean') return !data.isAvailable;
        if (typeof data.available === 'boolean') return !data.available;
        
        if (data.status === 'taken' || data.result === 'exists') return true;

        return false;
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw error;
    }
};

// --- Firebase Direct Interactions ---

const COLLECTION_NAME = "users"; // Assuming 'users' collection

export interface PreRegisterUser {
    id: string;
    username: string;
    email: string;
    createdAt?: any;
}

/**
 * Gets the total count of pre-registered users (ID starts with 'pre-order').
 */
export const getPreRegisteredCount = async (): Promise<number> => {
    try {
        const coll = collection(db, COLLECTION_NAME);
        // Filter by document ID starting with "pre-order"
        const q = query(
            coll, 
            where(documentId(), '>=', 'pre-order'),
            where(documentId(), '<=', 'pre-order' + '\uf8ff')
        );
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    } catch (error) {
        console.error("Error getting count:", error);
        return 0;
    }
};

/**
 * Subscribes to the count of pre-registered users (ID starts with 'pre-order') in real-time.
 * @param callback Function to call with the new count
 * @returns Unsubscribe function
 */
export const subscribeToPreRegisteredCount = (callback: (count: number) => void) => {
    try {
        const coll = collection(db, COLLECTION_NAME);
        // Filter by document ID starting with "pre-order"
        const q = query(
            coll, 
            where(documentId(), '>=', 'pre-order'),
            where(documentId(), '<=', 'pre-order' + '\uf8ff')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            callback(snapshot.size);
        });
        return unsubscribe;
    } catch (error) {
        console.error("Error subscribing to count:", error);
        return () => {}; // Return empty unsubscribe if error
    }
};

/**
 * Search/List pre-registered users (ID starts with 'pre-order').
 * If searchTerm is provided, it tries to filter by username or email.
 * Note: Firestore simple search requires exact prefix match.
 */
export const searchPreRegisteredUsers = async (searchTerm: string = ""): Promise<PreRegisterUser[]> => {
    try {
        const coll = collection(db, COLLECTION_NAME);
        // Base query for pre-orders
        // Note: We cannot easily mix documentId range with field range properties in a single query
        // without advanced indexing.
        // For now, let's fetch the 'pre-order' documents and filter in memory since the user said there are only 3.
        // If there are many, we would need to rethink or use Cloud Search/Algolia.
        
        const q = query(
            coll, 
            where(documentId(), '>=', 'pre-order'),
            where(documentId(), '<=', 'pre-order' + '\uf8ff')
        );

        const snapshot = await getDocs(q);
        const allPreUsers: PreRegisterUser[] = [];
        
        snapshot.forEach(doc => {
            const data = doc.data();
            allPreUsers.push({
                id: doc.id,
                username: data.username || "Unknown",
                // Map preEmail if email is missing, based on user feedback
                email: data.preEmail || data.email || "Unknown",
                createdAt: data.createdAt
            });
        });

        // Client-side filtering for search term
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            return allPreUsers.filter(user => 
                user.username.toLowerCase().includes(term) || 
                user.email.toLowerCase().includes(term)
            );
        }

        return allPreUsers;

    } catch (error) {
        console.error("Error searching users:", error);
        return [];
    }
};