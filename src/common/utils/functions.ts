export function fromSnapshot<T>(doc: FirebaseFirestore.DocumentSnapshot): T | null {
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as T;
}
