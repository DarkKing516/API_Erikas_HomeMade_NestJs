// lib/firebase-config.ts
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert("erika-s-homemade-firebase-adminsdk.json"),
});

const firestore = admin.firestore();

export { firestore };