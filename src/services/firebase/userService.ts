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