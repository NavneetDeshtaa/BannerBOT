'use client';
import { useState, useEffect } from 'react';
import AdBanner from './components/AdBanner';
import EditBannerModal from './components/EditBannerModal';
import styles from './page.module.css';

interface Banner {
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

interface SelectedBanner extends Banner {
  index: number;
}

const Home: React.FC = () => {
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<SelectedBanner | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await fetch('/data/banners.json');
      const banners: Banner[] = await response.json();
      setBannerList(banners);
    };

    fetchBanners();
  }, []);

  const handleEdit = (index: number) => {
    setSelectedBanner({ ...bannerList[index], index });
    setModalOpen(true);
  };

  const saveChanges = (updatedBanner: Banner) => {
    if (selectedBanner) {
      const updatedList = bannerList.map((banner, i) => (i === selectedBanner.index ? updatedBanner : banner));
      setBannerList(updatedList);
      setModalOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      {bannerList.map((banner, index) => (
        <AdBanner key={index} {...banner} onEdit={() => handleEdit(index)} />
      ))}
      {selectedBanner && (
        <EditBannerModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          banner={selectedBanner}
          saveChanges={saveChanges}
        />
      )}
    </div>
  );
};

export default Home;
