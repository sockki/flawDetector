import { db } from '@/firebase/firebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

async function addIsScrappedFieldToExistingDocs() {
  const querySnapshot = await getDocs(collection(db, 'vulDb'));

  querySnapshot.forEach(async document => {
    const documentRef = doc(db, 'vulDb', document.id);

    await updateDoc(documentRef, {
      isScrapped: false,
    });
  });

  return 'All documents updated with isScrapped: false';
}

export default async function HomePage() {
  // 서버 컴포넌트에서 Firebase 데이터 업데이트 호출
  const message = await addIsScrappedFieldToExistingDocs();

  return (
    <div>
      <h1>Scrapped Field Update</h1>
      <p>{message}</p>
    </div>
  );
}
