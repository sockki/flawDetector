import React from 'react';
import styles from './InfoBox.module.css';

function InfoBox({ theme, location, bullet }) {
  return (
    <div className={`${styles.component} ${styles[theme]}`}>
      <div className={styles.header}>
        <div className={styles.title}>문제 코드</div>
        {location === 'on' && <div className={styles.location}>위치보기</div>}
      </div>
      <div className={styles.content}>
        {bullet === 'on' ? (
          <p>&#8226; 설정값에 따라 발생할 수 있는 오류에 대한 설명이 여기에 표시됩니다.</p>
        ) : (
          <p>설정값에 따라 발생할 수 있는 오류에 대한 설명이 여기에 표시됩니다.</p>
        )}
      </div>
    </div>
  );
}

export default InfoBox;
