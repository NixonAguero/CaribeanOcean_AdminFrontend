import type { HeroImage } from '../types/hero.types';
import styles from '../styles/hero.module.css';

interface HeroImageCardProps {
  image: HeroImage;
  onEdit: (image: HeroImage) => void;
  onDelete: (image: HeroImage) => void;
}

function HeroImageCard({ image, onEdit, onDelete }: HeroImageCardProps) {
  return (
    <article className={styles.imageCard} id={`hero-image-card-${image.id}`}>
      <div className={styles.imageWrapper}>
        <img
          src={image.url}
          alt={image.alt}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.imageId}>#{image.id}</span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.altLabel}>Alt text</p>
        <p className={styles.altText}>{image.alt}</p>

        <div className={styles.cardActions}>
          <button
            className="btn-action"
            onClick={() => onEdit(image)}
            id={`edit-hero-image-btn-${image.id}`}
          >
            Edit
          </button>
          <button
            className="btn-action btn-action--danger"
            onClick={() => onDelete(image)}
            id={`delete-hero-image-btn-${image.id}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default HeroImageCard;
