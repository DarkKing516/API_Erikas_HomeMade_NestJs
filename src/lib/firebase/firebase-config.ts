/*
// lib/firebase-config.ts
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert("erika-s-homemade-firebase-adminsdk.json"),
});

const firestore = admin.firestore();

export { firestore };
*/

import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount = require('../../../erika-s-homemade-firebase-adminsdk.json') as ServiceAccount;

admin.initializeApp({
    credential    : admin.credential.cert(serviceAccount),
    storageBucket : 'gs://erika-s-homemade.appspot.com',
});

export const firestore = admin.firestore();
export const bucket    = admin.storage().bucket();
