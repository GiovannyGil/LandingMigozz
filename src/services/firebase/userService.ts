import { collection, getDocs, query, where, Firestore } from "firebase/firestore";

/**
 * Checks if a username already exists in the 'users' collection.
 * 
 * @param db - The Firestore database instance.
 * @param username - The username to check for existence.
 * @returns A promise that resolves to true if the username exists, false otherwise.
 */
export const checkUsernameExists = async (db: Firestore, username: string): Promise<boolean> => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username.toLowerCase()));
        const querySnapshot = await getDocs(q);
        
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking username existence:", error);
        throw new Error("Failed to check username.");
    } 
};


/**
 * Checks if an email already exists in the 'users' collection.
 * 
 * @param db - The Firestore database instance.
 * @param email - The email to check for existence.
 * @returns A promise that resolves to true if the email exists, false otherwise.
 */
export const checkEmailExists = async (db: Firestore, email: string): Promise<boolean> => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email.toLowerCase()));
        const querySnapshot = await getDocs(q);
        
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw new Error("Failed to check email.");
    }
};