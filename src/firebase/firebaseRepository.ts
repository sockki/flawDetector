import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

type RepoData = {
  id: string;
  name: string;
  description: string;
  pushed_at: Date;
  isChecked: 'before' | 'under' | 'done';
  isBookmarked: boolean;
};

export const saveRepository = async (userId: string, repoData: RepoData[]) => {
  const userRepoRef = collection(db, 'users', userId.toString(), 'repositories');

  const promises = repoData.map(repo => {
    const repoRef = doc(userRepoRef, repo.id.toString());
    return setDoc(repoRef, {
      name: repo.name,
      description: repo.description || '',
      pushed_at: repo.pushed_at,
      isChecked: 'before',
      isBookmarked: false,
    });
  });
  try {
    await Promise.all(promises); // 모든 비동기 작업 완료 대기
    console.log('레포지토리가 성공적으로 저장되었습니다.');
  } catch (error) {
    console.error('Firestore에 레포지토리 저장 실패:', error);
    throw new Error('레포지토리 저장 중 문제가 발생했습니다.');
  }
};

export const updateBookmarkStatus = async (
  userId: string,
  repoId: string,
  isBookmarked: boolean,
) => {
  const repoRef = doc(db, 'users', userId.toString(), 'repositories', repoId.toString());
  await updateDoc(repoRef, { isBookmarked });
};

export const updateCheckedStatus = async (
  userId: string,
  repoId: string,
  isChecked: 'before' | 'under' | 'done',
) => {
  const repoRef = doc(db, 'users', userId, 'repositories', repoId);
  await updateDoc(repoRef, { isChecked });
};

export const getBookmarkedRepositories = async (userId: string) => {
  const repoRef = collection(db, 'users', userId, 'repositories');
  const q = query(repoRef, where('isBookmarked', '==', true));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(repoDoc => repoDoc.data());
};

export const getFirestoreRepos = async (userId: string) => {
  const userRepoRef = collection(db, 'users', userId, 'repositories');
  try {
    const querySnapshot = await getDocs(userRepoRef);
    const repos = querySnapshot.docs.map(repoDoc => ({
      id: repoDoc.id,
      ...repoDoc.data(),
    }));
    return repos;
  } catch (error) {
    console.error('Firestore에서 레포지토리 조회 중 오류 발생:', error);
    throw new Error('Firestore에서 레포지토리를 가져오는 중 오류가 발생했습니다.');
  }
};

export const deleteUserRepositories = async (userId: string) => {
  const userRepoRef = collection(db, 'users', userId, 'repositories');
  const querySnapshot = await getDocs(userRepoRef);
  const promises = querySnapshot.docs.map(repoDoc => deleteDoc(repoDoc.ref));
  await Promise.all(promises);
};
