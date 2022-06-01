import Image from 'next/image';
import styles from './style.module.css';

export default function Avatar({src, alt, text, width=50, height=50, column}) {
  return (
    <div className={column ? (styles.avatar + '\n' + styles.column) : (styles.avatar + '\n' + styles.row)}>
      <div className={styles.avatarImgContainer} >
        <Image className={styles.avatarImg} width={width} height={height} src={src} alt={alt} />
      </div>
      {text && <strong>{text}</strong>}
    </div>
  );
}