import { useState } from "react";
import { useGallery } from "../gallery/hooks/useGallery";
import GalleryImageForm from "../gallery/components/GalleryImageForm";
import type { GalleryImage } from "../gallery/services/gallery.service";
import styles from "../gallery/styles/GalleryManagePage.module.css";

const ADMIN_ID = 1;

const GalleryManagePage = () => {
  const { images, loading, error, addImage, updateImage, deleteImage } = useGallery();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const handleAdd = () => {
    setSelectedImage(null);
    setShowForm(true);
  };

  const handleUpdate = (image: GalleryImage) => {
    setSelectedImage(image);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedImage(null);
  };

  const handleSave = async (file: File, alt: string) => {
    setSaving(true);
    try {
      if (selectedImage) {
        await updateImage(selectedImage.id, file, alt, ADMIN_ID);
      } else {
        await addImage(file, alt, ADMIN_ID);
      }
      setShowForm(false);
      setSelectedImage(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteImage(id, ADMIN_ID);
    setConfirmDelete(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <button className={styles.addBtn} onClick={handleAdd}>
          + Add Image
        </button>
      </div>

      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Preview</th>
                <th>Alt text</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.empty}>
                    No images found.
                  </td>
                </tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id} className={styles.tableRow}>
                    <td>
                        <img
                            src={img.url}
                            alt={img.alt}
                            className={styles.thumb}
                            onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "https://placehold.co/70x52?text=No+img";
                            }}
                        />
                    </td>
                    <td>{img.alt || <span className={styles.empty}>—</span>}</td>
                    <td>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.viewLink}
                      >
                        View
                      </a>
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        className={styles.updateBtn}
                        onClick={() => handleUpdate(img)}
                      >
                        Update
                      </button>
                      {confirmDelete === img.id ? (
                        <>
                          <button
                            className={styles.confirmBtn}
                            onClick={() => handleDelete(img.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className={styles.cancelSmallBtn}
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className={styles.deleteBtn}
                          onClick={() => setConfirmDelete(img.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <GalleryImageForm
          selectedImage={selectedImage}
          onSave={handleSave}
          onCancel={handleCancel}
          saving={saving}
        />
      )}
    </div>
  );
};

export default GalleryManagePage;