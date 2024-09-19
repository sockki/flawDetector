import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

type LabelIDData = {
  hot: string[];
  new: string[];
};

export async function getLabelData() {
  const labelDocRef = doc(db, 'label', 'vulDbId');

  const labelSnapshots = await getDoc(labelDocRef);

  const labelDocData = labelSnapshots.data() as LabelIDData;
  const hotIdSet = new Set(labelDocData.hot);
  const newIdSet = new Set(labelDocData.new);

  return { hotIdSet, newIdSet };
}
