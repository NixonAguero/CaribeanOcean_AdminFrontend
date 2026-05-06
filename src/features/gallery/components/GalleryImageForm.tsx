import { useState, useRef, useEffect } from "react";
import type { GalleryImage } from "../../gallery/services/gallery.service";
import styles from "../styles/GalleryImageForm.module.css";

interface Props {
  selectedImage: GalleryImage | null;
  onSave: (file: File, alt: string) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

const GalleryImageForm = ({ selectedImage, onSave, onCancel, saving }: Props) => {
  const [alt, setAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      setAlt(selectedImage.alt);
      setPreview(selectedImage.url);
      setFile(null);
    } else {
      setAlt("");
      setPreview(null);
      setFile(null);
    }
  }, [selectedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!file) return;
    await onSave(file, alt);
  };

  return (
    // Overlay oscuro de fondo
    <div className={styles.overlay} onClick={onCancel}>

      {/* El modal en sí — el stopPropagation evita que el click en el modal cierre el overlay */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>
            {selectedImage ? "Edit gallery image" : "Add gallery image"}
          </h2>
          <button className={styles.closeBtn} onClick={onCancel}>✕</button>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            <span className={styles.labelIcon}>ⓘ</span> Alternative text
          </label>
          <input
            className={styles.input}
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe the image..."
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Image</label>
          <div
            className={styles.imageBox}
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="preview" className={styles.preview} />
            ) : (
              <span className={styles.imagePlaceholder}>Click to select an image</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            className={styles.uploadBtn}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload new image
          </button>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            type="button"
            onClick={handleSubmit}
            disabled={saving || !file || !alt.trim()}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImageForm;