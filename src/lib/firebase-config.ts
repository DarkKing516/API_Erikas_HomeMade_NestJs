// lib/firebase-config.ts
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert("erika-s-homemade-firebase-adminsdk-fbsvc-1430ed9887.json"),
});

const firestore = admin.firestore();

export { firestore };