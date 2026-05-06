import type { HeroImage } from '../types/hero.types';
import HeroImageCard from './HeroImageCard';
import styles from '../styles/hero.module.css';

interface HeroImageListProps {
  images: HeroImage[];
  onEdit: (image: HeroImage) => void;
  onDelete: (image: HeroImage) => void;
}

function HeroImageList({ images, onEdit, onDelete }: HeroImageListProps) {
  if (images.length === 0) {
    return (
      <p className={styles.emptyState}>
        No hero images found. Add one to get started.
      </p>
    );
  }

  return (
    <div className={styles.imageGrid}>
      {images.map((image) => (
        <HeroImageCard
          key={image.id}
          image={image}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default HeroImageList;
