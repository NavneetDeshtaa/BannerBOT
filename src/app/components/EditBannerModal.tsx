import React, { useState } from 'react';
import styles from './EditBannerModal.module.css';
import Image from 'next/image';


interface EditBannerModalProps {
  open: boolean;
  handleClose: () => void;
  banner: {
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
  };
  saveChanges: (banner: { title: string; description: string; cta: string; image: string; background: string }) => void;
}

const imageOptions = [
  '/images/A9.jpg',
  '/images/a.jpg',
  '/images/A11.jpg',
  '/images/A12.jpg',
  '/images/A13.jpg',
];

const EditBannerModal: React.FC<EditBannerModalProps> = ({ open, handleClose, banner, saveChanges }) => {
  const [newBanner, setNewBanner] = useState(banner);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBanner({ ...newBanner, [name]: value });
  };

  const handleImageSelect = (image: string) => {
    setNewBanner({ ...newBanner, image });
  };

  const handleSave = () => {
    saveChanges(newBanner);
    handleClose();
  };

  return (
    <div className={`${styles.modal} ${open ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton} onClick={handleClose} aria-label="Close">
          &times;
        </div>
        <p className={styles.titleEdit}>Edit Banner</p>
        <Image src={newBanner.image} alt="Preview" className={styles.preview} />
        <div className={styles.images}>
          {imageOptions.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Option ${index + 1}`}
              className={`${styles.imageOption} ${newBanner.image === img ? styles.selected : ''}`}
              onClick={() => handleImageSelect(img)}
            />
          ))}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            value={newBanner.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Description"
            value={newBanner.description}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSave}>Done</button>
        <a href={newBanner.image} className={styles.download} download>Download</a>
      </div>
    </div>
  );
};

export default EditBannerModal;
