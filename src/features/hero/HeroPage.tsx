import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { HeroImage } from './types/hero.types';
import { useHeroImages } from './hooks/useHeroImages';
import AddHeroImageModal from './components/AddHeroImageModal';
import EditHeroImageModal from './components/EditHeroImageModal';
import DeleteHeroImageModal from './components/DeleteHeroImageModal';
import styles from './styles/hero.module.css';

function HeroPage() {
  const navigate = useNavigate();
  const {
    images,
    metadata,
    loading,
    error,
    fetchImages,
    fetchMetadata,
    addImage,
    updateImage,
    deleteImage,
    updateMetadata
  } = useHeroImages();

  const [selectedImage, setSelectedImage] = useState<HeroImage | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchImages();
    fetchMetadata();
  }, [fetchImages, fetchMetadata]);


  useEffect(() => {
    if (metadata) {
      setTitle(metadata.title || '');
      setSubtitle(metadata.subtitle || '');
      setDescription(metadata.description || '');
    }
  }, [metadata]);

  const handleSaveMetadata = async () => {
    setIsSaving(true);
    const result = await updateMetadata({
      title,
      subtitle,
      description,
    });
    setIsSaving(false);

    if (result && !result.hasError) {
      toast.success('Hero metadata updated successfully!');
      navigate('/admin/pages');
    } else {
      toast.error(result?.errorMessage || 'Error updating Hero metadata');
    }
  };

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.metaField}>
          <label className={styles.metaLabel} htmlFor="hero-subtitle-input">Subtitle</label>
          <input
            className={styles.metaInput}
            type="text"
            id="hero-subtitle-input"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className={`${styles.metaField} ${styles.metaFieldDescription}`}>
          <label className={styles.metaLabel} htmlFor="hero-description-input">Description</label>
          <textarea
            className={`${styles.metaInput} ${styles.metaTextarea}`}
            id="hero-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableHeaderRow}>
        <button
          id="add-hero-image-btn"
          className={styles.addBtn}
          onClick={() => setIsAddOpen(true)}
        >
          + Add Image
        </button>
      </div>

      {error && (
        <div className={styles.errorState}>
          <p className={styles.errorText}>{error}</p>
          <button className="btn-primary" onClick={fetchImages}>
            Try again
          </button>
        </div>
      )}

      {!error && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.previewCol}>Preview</th>
                <th className={styles.altTextCol}>Alt Text</th>
                <th className={styles.urlCol}>URL</th>
                <th className={styles.actionsCol}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td><div className={`skeleton ${styles.imageThumb}`} /></td>
                    <td><div className="skeleton" style={{ height: '16px', width: '60%', borderRadius: '4px' }} /></td>
                    <td><div className="skeleton" style={{ height: '30px', width: '64px', borderRadius: '4px' }} /></td>
                    <td><div className={styles.imageActions}>
                      <div className="skeleton" style={{ height: '34px', width: '76px', borderRadius: '4px' }} />
                      <div className="skeleton" style={{ height: '34px', width: '76px', borderRadius: '4px' }} />
                    </div></td>
                  </tr>
                ))
              ) : images.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <p className={styles.emptyState}>No images yet. Click "+ Add Image" to get started.</p>
                  </td>
                </tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id} id={`hero-image-row-${img.id}`}>
                    <td>
                      <div className={styles.imageThumb}>
                        <img
                          src={img.url}
                          alt={img.alt}
                          className={styles.imageThumbImg}
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td>
                      <p className={styles.imageAlt}>{img.alt}</p>
                    </td>
                    <td>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewBtn}
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <div className={styles.imageActions}>
                        <button
                          className={styles.actionBtnUpdate}
                          id={`edit-hero-btn-${img.id}`}
                          onClick={() => handleEdit(img)}
                        >
                          Update
                        </button>
                        <button
                          className={styles.actionBtnDelete}
                          id={`delete-hero-btn-${img.id}`}
                          onClick={() => handleDeleteRequest(img)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
          onClick={handleSaveMetadata}
          disabled={isSaving || loading}
        >
          {isSaving ? 'Saving...' : 'Save'}
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

export default HeroPage;
