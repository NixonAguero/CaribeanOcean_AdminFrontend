import React, { useState, useEffect, useRef } from "react";
import type { Facility } from "../types/facility";
import { Alert } from "../../../shared/components/Alert/Alert";
import { Spinner } from "../../../shared/components/Spinner/Spinner";
import styles from "../styles/modals.module.css";

interface FacilityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: Facility | null;
  onSubmit: (formData: any) => Promise<{ hasError: boolean; errorMessage?: string }>;
}

export default function FacilityFormModal({
  isOpen,
  onClose,
  facility,
  onSubmit,
}: FacilityFormModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [active, setActive] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (facility) {
      setName(facility.name || "");
      setDescription(facility.description || "");
      setFeatures(Array.isArray(facility.features) ? facility.features : []);
      setDisplayOrder(facility.displayOrder || 0);
      setActive(facility.active !== false);
      setPreviewUrl(facility.imageUrl || null);
      setImageFile(null);
    } else {
      setName("");
      setDescription("");
      setFeatures([]);
      setFeatureInput("");
      setDisplayOrder(0);
      setActive(true);
      setPreviewUrl(null);
      setImageFile(null);
    }
    setSubmitError(null);
  }, [facility, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setFeatures([]);
    setFeatureInput("");
    setDisplayOrder(0);
    setActive(true);
    setPreviewUrl(null);
    setImageFile(null);
    setSubmitError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setSubmitError("Please fill out the Name field.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!imageFile && !facility) {
        setSubmitError("Please select an image file for the facility.");
        setIsSubmitting(false);
        return;
      }

      const finalFeatures = featureInput.trim()
        ? [...features, featureInput.trim()]
        : features;

      const payload = {
        id: facility ? facility.id : undefined,
        name: name.trim(),
        description: description.trim(),
        features: finalFeatures,
        image: imageFile,
        imageUrl: facility?.imageUrl ?? "",
        updatedBy: 1,
        displayOrder,
        active,
      };
      const result = await onSubmit(payload);

      if (result.hasError) {
        setSubmitError(result.errorMessage || "An error occurred while saving the facility.");
      } else {
        handleClose();
      }
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {facility ? "Update Facility" : "Add Facility"}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {submitError && (
            <div style={{ marginBottom: "16px" }}>
              <Alert type="error" title="Validation Failed">
                {submitError}
              </Alert>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="fac-name">
              Name
            </label>
            <input
              id="fac-name"
              className={styles.input}
              type="text"
              placeholder="e.g. Infinity Pool"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="fac-description">
              Description
            </label>
            <textarea
              id="fac-description"
              className={styles.textarea}
              placeholder="Describe the facility..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Features
            </label>
            {/* Chip / tag input — press Enter or comma to add a feature */}
            <div
              className={styles.tagInputContainer}
              onClick={() => document.getElementById("fac-features")?.focus()}
            >
              {features.map((tag, idx) => (
                <span key={idx} className={styles.chip}>
                  {tag}
                  <button
                    type="button"
                    className={styles.chipRemove}
                    onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                    disabled={isSubmitting}
                    aria-label={`Remove ${tag}`}
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                id="fac-features"
                className={styles.tagInput}
                type="text"
                placeholder={features.length === 0 ? "Type a feature and press Enter…" : "Add another…"}
                value={featureInput}
                disabled={isSubmitting}
                onChange={(e) => {
                  // If user typed a comma, treat it as "add tag"
                  if (e.target.value.includes(",")) {
                    const newTag = e.target.value.replace(",", "").trim();
                    if (newTag) setFeatures([...features, newTag]);
                    setFeatureInput("");
                  } else {
                    setFeatureInput(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // stop form submit
                    const newTag = featureInput.trim();
                    if (newTag) {
                      setFeatures([...features, newTag]);
                      setFeatureInput("");
                    }
                  }
                  // Backspace on empty input removes the last chip
                  if (e.key === "Backspace" && featureInput === "" && features.length > 0) {
                    setFeatures(features.slice(0, -1));
                  }
                }}
              />
            </div>
            <p className={styles.tagHint}>Press Enter or , to add · Backspace to remove last</p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Image</label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className={styles.imagePreview}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/80x52?text=Error+Loading+Image";
                }}
              />
            )}
            <input
              id="fac-image-file"
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
              disabled={isSubmitting}
            />
            <div className={styles.fileUploadRow}>
              <button
                type="button"
                className={styles.fileButton}
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
              >
                {previewUrl ? "Change image" : "Select image"}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="fac-order">
              Display Order
            </label>
            <input
              id="fac-order"
              className={styles.input}
              type="number"
              min="0"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                disabled={isSubmitting}
              />
              Active (Visible on public site)
            </label>
          </div>

          <div className={styles.modalFooter} style={{ margin: "0 -24px -24px", borderTop: "1px solid var(--color-sand-white)" }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <span className={styles.btnSpinnerWrapper}>
                  <Spinner size="sm" color="white" /> Saving...
                </span>
              ) : (
                facility ? "Save Changes" : "Add Facility"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
