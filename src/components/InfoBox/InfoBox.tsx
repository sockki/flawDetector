import styles from './InfoBox.module.css';

interface InfoBoxProps {
  theme: string;
  location: 'on' | 'off';
  bullet: 'on' | 'off';
  description: string;
}

export default function InfoBox({ theme, location, bullet, description }: InfoBoxProps) {
  return (
    <div className={`${styles.component} ${styles[theme]}`}>
      <div className={styles.header}>
        <div className={styles.title}>문제 코드</div>
        {location === 'on' && <div className={styles.location}>위치보기</div>}
      </div>
      <div className={styles.content}>
        {bullet === 'on' ? <p>&#8226; {description}</p> : <p>{description}</p>}
      </div>
    </div>
  );
}
