import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeroImages } from '../hero/hooks/useHeroImages';
import styles from './styles/managePages.module.css';


function HeroCarouselThumb() {
  const { images, fetchImages } = useHeroImages();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);


  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className={styles.thumbnailPlaceholder}>
        <svg
          className={styles.thumbnailPlaceholderIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }

  return (
    <>
      {images.map((img, i) => (
        <div
          key={img.id}
          className={`${styles.thumbnailSlide}${i === current ? ` ${styles.active}` : ''}`}
        >
          <img
            src={img.url}
            alt={img.alt}
            className={styles.thumbnailImg}
            loading="lazy"
          />
        </div>
      ))}
      {images.length > 1 && (
        <div className={styles.dots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot}${i === current ? ` ${styles.activeDot}` : ''}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ── Manage Pages Page ── */
export default function ManagePagesPage() {
  const navigate = useNavigate();

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className="page-header">
          <h1 className="page-header__title">Manage Pages</h1>
          <p className="page-header__subtitle">
            Edit the content displayed on each section of the public website.
          </p>
          <hr className="page-header__divider" />
        </header>

        <div className={styles.grid}>
          {/* Hero card */}
          <article className={styles.card} id="manage-page-card-hero">
            <div className={styles.thumbnailWrapper}>
              <HeroCarouselThumb />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>Hero</p>
              <button
                id="edit-page-hero-btn"
                className={styles.editBtn}
                onClick={() => navigate('/admin/hero')}
              >
                Edit page content
              </button>
            </div>
          </article>

          {/* About Us card */}
          <article className={styles.card} id="manage-page-card-about-us">
            <div className={styles.thumbnailWrapper}>
              <div className={styles.thumbnailPlaceholder}>
                <svg
                  className={styles.thumbnailPlaceholderIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>About Us</p>
              <button
                id="edit-page-about-us-btn"
                className={styles.editBtn}
                onClick={() => navigate('/admin/about-us')}
              >
                Edit page content
              </button>
            </div>
          </article>

          {/* Gallery card */}
          <article className={styles.card} id="manage-page-card-gallery">
            <div className={styles.thumbnailWrapper}>
              <div className={styles.thumbnailPlaceholder}>
                <svg
                  className={styles.thumbnailPlaceholderIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>Gallery</p>
              <button
                id="edit-page-gallery-btn"
                className={styles.editBtn}
                onClick={() => navigate('/admin/gallery')}
              >
                Edit page content
              </button>
            </div>
          </article>
          {/* Facilities card */}
          <article className={styles.card} id="manage-page-card-facilities">
            <div className={styles.thumbnailWrapper}>
              <div className={styles.thumbnailPlaceholder}>
                <svg
                  className={styles.thumbnailPlaceholderIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2v20M2 12h20M12 4a8 8 0 0 1 8 8M12 4a8 8 0 0 0-8 8" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>Facilities</p>
              <button
                id="edit-page-facilities-btn"
                className={styles.editBtn}
                onClick={() => navigate('/admin/facilities')}
              >
                Edit page content
              </button>
            </div>
          </article>
          
          {/* Locations card */}
          <article className={styles.card} id="manage-page-card-locations">
            <div className={styles.thumbnailWrapper}>
              <div className={styles.thumbnailPlaceholder}>
                <svg
                  className={styles.thumbnailPlaceholderIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />

                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>Locations</p>
              <button
                id="edit-page-locations-btn"
                className={styles.editBtn}
                onClick={() => navigate('/admin/locations')}
              >
                Edit page content
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
