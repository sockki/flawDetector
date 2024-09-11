import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { GitHubRepoData } from '@/types/repository';
import { SortOption } from '@/types/sortAndFilter';
import { getSortParameters } from '@/utils/getSortParameters';
import { db } from './firebaseConfig';

export const saveRepositories = async (userId: string, repoData: GitHubRepoData[]) => {
  const userRepoRef = collection(db, 'users', userId.toString(), 'repositories');
  const promises = repoData.map(async repo => {
    const repoRef = doc(userRepoRef, repo.id.toString());
    const existingRepoDoc = await getDoc(repoRef);
    const isBookmarked = existingRepoDoc.exists() ? existingRepoDoc.data().isBookmarked : false;

    return setDoc(
      repoRef,
      {
        name: repo.name,
        pushedAt: repo.pushed_at,
        isChecked: repo.isChecked || 'before',
        isBookmarked,
      },
      { merge: true },
    );
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('Firestore에 레포지토리 저장 실패:', error);
    throw new Error('레포지토리 저장 중 문제가 발생했습니다.');
  }
};

export const getFirestoreRepositories = async (userId: string, sortOption: SortOption) => {
  const userRepoRef = collection(db, 'users', userId, 'repositories');
  const [orderField, direction] = getSortParameters(sortOption);
  const repoQuery = query(userRepoRef, orderBy(orderField, direction));

  try {
    const querySnapshot = await getDocs(repoQuery);
    const repos = querySnapshot.docs.map(repoDoc => ({
      id: repoDoc.id,
      ...repoDoc.data(),
    }));

    return { repos };
  } catch (error) {
    console.error('Firestore에서 레포지토리 조회 중 오류 발생:', error);
    throw new Error('Firestore에서 레포지토리를 가져오는 중 오류가 발생했습니다.');
  }
};

export const getBookmarkedRepositories = async (userId: string, sortOption: SortOption) => {
  const repoRef = collection(db, 'users', userId, 'repositories');
  const q = query(repoRef, where('isBookmarked', '==', true), orderBy(sortOption));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(repoDoc => repoDoc.data());
};

export const updateBookmarkStatus = async (
  userId: string,
  repoId: string,
  isBookmarked: boolean,
) => {
  const repoRef = doc(db, 'users', userId, 'repositories', repoId.toString());
  await updateDoc(repoRef, { isBookmarked });
};

export const updateCheckedStatus = async (
  userId: string,
  repoId: string,
  isChecked: 'before' | 'under' | 'done',
) => {
  const repoRef = doc(db, 'users', userId, 'repositories', repoId.toString());
  await updateDoc(repoRef, { isChecked });
};

export const deleteUserRepositories = async (userId: string) => {
  const userRepoRef = collection(db, 'users', userId.toString(), 'repositories');
  const querySnapshot = await getDocs(userRepoRef);

  const promises = querySnapshot.docs.map(repoDoc => deleteDoc(repoDoc.ref));
  await Promise.all(promises);

  const userDocRef = doc(db, 'users', userId.toString());
  await deleteDoc(userDocRef);
};
