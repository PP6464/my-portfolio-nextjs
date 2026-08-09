// Client-side Firebase initialization.
// Uses the modular v9+ API (`firebase/app` + `firebase/firestore`).
//
// This module is safe to import from Client Components — it lazily initializes
// the SDK on first access via `getApps()` so hot-reloads don't double-init.

import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

export function getFirebaseApp(): FirebaseApp {
	if (!app) {
		app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
	}
	return app;
}

export function getDb(): Firestore {
	if (!db) {
		db = getFirestore(getFirebaseApp());
	}
	return db;
}