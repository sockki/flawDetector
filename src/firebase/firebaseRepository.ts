import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { GitHubRepoData } from '@/types/repository';
import { getSortParameters } from '@/utils/getSortParameters';
import { countRepoFiles } from '@/utils/countRepoFiles';
import { db } from './firebaseConfig';

export const saveRepositories = async (userId: string, repoData: GitHubRepoData[]) => {
  const userRepoRef = collection(db, 'users', userId.toString(), 'repositories');

  const promises = repoData.map(async repo => {
    const repoRef = doc(userRepoRef, repo.name);

    const existingRepoDoc = await getDoc(repoRef);

    const isBookmarked = existingRepoDoc.exists() ? existingRepoDoc.data().isBookmarked : false;

    let isChecked = 'before';
    if (existingRepoDoc.exists() && existingRepoDoc.data().isChecked) {
      isChecked = existingRepoDoc.data().isChecked;
    }
    return setDoc(
      repoRef,
      {
        name: repo.name,
        pushedAt: repo.pushed_at,
        isChecked,
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

export const getFirestoreRepositories = async (userId: string, sortOption: string) => {
  const userRepoRef = collection(db, 'users', userId.toString(), 'repositories');
  const [orderField, direction] = getSortParameters(sortOption);

  const repoQuery = query(userRepoRef, orderBy(orderField, direction));

  try {
    const querySnapshot = await getDocs(repoQuery);

    const repos = querySnapshot.docs.map(repoDoc => ({
      id: repoDoc.id,
      name: repoDoc.data().name,
      isChecked: repoDoc.data().isChecked,
      ...repoDoc.data(),
    }));
    return { repos };
  } catch (error) {
    console.error('Firestore에서 레포지토리 조회 중 오류 발생:', error);
    throw new Error('Firestore에서 레포지토리를 가져오는 중 오류가 발생했습니다.');
  }
};

export const updateBookmarkStatus = async (
  userId: string,
  repoName: string,
  isBookmarked: boolean,
) => {
  const repoRef = doc(db, 'users', userId.toString(), 'repositories', repoName);
  await updateDoc(repoRef, { isBookmarked });
};

export const updateCheckedStatus = async (
  userId: string,
  repoName: string,
  isChecked: 'before' | 'under' | 'done',
) => {
  const repoRef = doc(db, 'users', userId.toString(), 'repositories', repoName);
  await updateDoc(repoRef, { isChecked });
};

export const deleteUserRepositories = async (userId: string) => {
  try {
    const userRepoRef = collection(db, 'users', userId.toString(), 'repositories');
    const repoSnapshot = await getDocs(userRepoRef);

    const deleteRepoPromises = repoSnapshot.docs.map(async repoDoc => {
      const repoId = repoDoc.id;
      const codeScanRef = collection(
        db,
        'users',
        userId.toString(),
        'repositories',
        repoId,
        'codeScanResult',
      );
      const codeScanSnapshot = await getDocs(codeScanRef);

      const deleteCodeScanPromises = codeScanSnapshot.docs.map(codeScanDoc =>
        deleteDoc(codeScanDoc.ref),
      );
      await Promise.all(deleteCodeScanPromises);

      return deleteDoc(repoDoc.ref);
    });

    await Promise.all(deleteRepoPromises);

    const userDocRef = doc(db, 'users', userId.toString());
    await deleteDoc(userDocRef);
  } catch (error) {
    console.error(error);
  }
};

export const getFirestoreCodeScanResults = async (userId: string, repoName: string) => {
  try {
    const scanResultsRef = collection(
      db,
      'users',
      userId.toString(),
      'repositories',
      repoName,
      'codeScanResult',
    );
    const querySnapshot = await getDocs(scanResultsRef);
    const scanResults = querySnapshot.docs.map(repoDoc => repoDoc.data());

    return scanResults;
  } catch (error) {
    console.error('Firestore에서 코드 스캔 결과를 가져오는 중 오류 발생:', error);
    return [];
  }
};

export const checkAndUpdateScanStatus = async (userName: string, owner: string, repo: string) => {
  try {
    const totalFileCount = await countRepoFiles(owner, repo, '');

    const scanResults = await getFirestoreCodeScanResults(userName, repo);
    const scanResultsCount = scanResults.length;

    if (scanResultsCount === totalFileCount) {
      await updateCheckedStatus(userName, repo, 'done');
    } else if (scanResultsCount > 0) {
      await updateCheckedStatus(userName, repo, 'under');
    } else {
      await updateCheckedStatus(userName, repo, 'before');
    }
  } catch (error) {
    console.error('검사 상태 업데이트 중 오류 발생:', error);
  }
};
