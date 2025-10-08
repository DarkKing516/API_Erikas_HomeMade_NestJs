// utils/
export async function mapCollection<T>(ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>): Promise<T[]> {
  const snapshot = await ref.get();
  return snapshot.docs.map((doc) => doc.data() as T);
}
