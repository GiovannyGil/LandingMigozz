import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";

export interface FirebaseContextType {
    app: FirebaseApp;
    db: Firestore;
}
