import React from 'react';
import { MdModeEdit } from "react-icons/md";
import styles from './AdBanner.module.css';

interface AdBannerProps {
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  onEdit: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ title, description, cta, image, background, onEdit }) => {
  return (
    <div className={styles.card} style={{ backgroundImage: `url(${image})`, backgroundColor: background }}>
      <button className={styles.editButton} onClick={onEdit}>
        <MdModeEdit />
      </button>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <button className={styles.cta}>{cta}</button>
      </div>
    </div>
  );
};

export default AdBanner;
