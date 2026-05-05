import { useState, useEffect } from 'react';
import type { HeroImage } from './types/hero.types';
import { useHeroImages } from './hooks/useHeroImages';
import AddHeroImageModal from './components/AddHeroImageModal';
import EditHeroImageModal from './components/EditHeroImageModal';
import DeleteHeroImageModal from './components/DeleteHeroImageModal';
import styles from './styles/hero.module.css';

function HeroPage() {
  const { images, loading, error, fetchImages, addImage, updateImage, deleteImage } = useHeroImages();

  const [selectedImage, setSelectedImage] = useState<HeroImage | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleEdit = (image: HeroImage) => {
    setSelectedImage(image);
    setIsEditOpen(true);
  };

  const handleDeleteRequest = (image: HeroImage) => {
    setSelectedImage(image);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedImage) return;
    setIsDeleting(true);
    await deleteImage(selectedImage.id);
    setIsDeleting(false);
    setIsDeleteOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Edit Hero</h1>

      <div className={styles.metaRow}>
        <div className={styles.metaField}>
          <label className={styles.metaLabel} htmlFor="hero-title-input">Title</label>
          <input
            className={styles.metaInput}
            type="text"
            id="hero-title-input"
            disabled
          />
        </div>
        <div className={styles.metaField}>
          <label className={styles.metaLabel} htmlFor="hero-subtitle-input">Subtitle</label>
          <input
            className={styles.metaInput}
            type="text"
            id="hero-subtitle-input"
            disabled
          />
        </div>
        <div className={`${styles.metaField} ${styles.metaFieldDescription}`}>
          <label className={styles.metaLabel} htmlFor="hero-description-input">Description</label>
          <textarea
            className={`${styles.metaInput} ${styles.metaTextarea}`}
            id="hero-description-input"
            disabled
          />
        </div>
      </div>

      <div className={styles.addRow}>
        <button
          id="add-hero-image-btn"
          className={styles.addBtn}
          onClick={() => setIsAddOpen(true)}
        >
          Add Image
        </button>
      </div>

      {loading && <SkeletonList />}

      {error && (
        <div className={styles.errorState}>
          <p className={styles.errorText}>{error}</p>
          <button className="btn-primary" onClick={fetchImages}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {images.length === 0 ? (
            <p className={styles.emptyState}>No images yet. Click "Add Image" to get started.</p>
          ) : (
            <div className={styles.imageList}>
              {images.map((img) => (
                <div key={img.id} className={styles.imageRow} id={`hero-image-row-${img.id}`}>
                  <div className={styles.imageThumb}>
                    <img
                      src={img.url}
                      alt={img.alt}
                      className={styles.imageThumbImg}
                      loading="lazy"
                    />
                  </div>
                  <p className={styles.imageAlt}>{img.alt}</p>
                  <div className={styles.imageActions}>
                    <button
                      className="btn-action"
                      id={`edit-hero-btn-${img.id}`}
                      onClick={() => handleEdit(img)}
                    >
                      Update
                    </button>
                    <button
                      className="btn-action btn-action--danger"
                      id={`delete-hero-btn-${img.id}`}
                      onClick={() => handleDeleteRequest(img)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className={styles.footerActions}>
        <button
          type="button"
          className="btn-secondary"
          id="hero-cancel-btn"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-primary"
          id="hero-save-btn"
        >
          Save
        </button>
      </div>

      <AddHeroImageModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={addImage}
      />

      <EditHeroImageModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdate={updateImage}
        image={selectedImage}
      />

      <DeleteHeroImageModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedImage(null);
        }}
        onConfirm={handleDeleteConfirm}
        image={selectedImage}
        isDeleting={isDeleting}
      />
    </div>
  );
}

function SkeletonList() {
  return (
    <div className={styles.imageList}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`${styles.imageRow} ${styles.skeletonRow}`}>
          <div className={`skeleton ${styles.skeletonThumb}`} />
          <div className={`skeleton ${styles.skeletonText}`} />
          <div className={styles.imageActions}>
            <div className={`skeleton ${styles.skeletonBtn}`} />
            <div className={`skeleton ${styles.skeletonBtn}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroPage;
