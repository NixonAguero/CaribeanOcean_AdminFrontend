import { useState, useEffect } from "react";
import styles from "../../roomType/styles/modals.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (number: number, active: boolean) => Promise<void>;
}

export default function CreateRoomModal({ isOpen, onClose, onCreate }: Props) {
  const [number, setNumber] = useState("");
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setNumber("");
      setActive(true);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim()) {
      setError("Room number is required.");
      return;
    }
    setSaving(true);
    try {
      await onCreate(parseInt(number), active);
      onClose();
    } catch {
      setError("Error creating room. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        style={{ maxWidth: "400px", padding: "16px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader} style={{ padding: "0 0 16px 0", borderBottom: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "#FDFCFA", border: "2px solid #1A1A1A",
              color: "#1A1A1A", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "14px", fontWeight: "bold"
            }}>+</span>
            <h2 className={styles.sectionLabel} style={{ fontSize: "20px" }}>Add Room</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody} style={{ padding: "0" }}>
          {error && (
            <div style={{ color: "#D85A30", marginBottom: "16px", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <div className={styles.formGroup} style={{ marginBottom: "20px" }}>
            <label style={{ fontFamily: "var(--font-ui)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--color-ocean-deep)", marginBottom: "6px", display: "block" }}>
              Room number
            </label>
            <input
              className={styles.input}
              type="number"
              placeholder="e.g. 101"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{ background: "#FDFCFA", border: "1px solid #E5E7EB", height: "36px", borderRadius: "6px" }}
              autoFocus
              required
            />
          </div>

          <div className={styles.formGroup} style={{ marginBottom: "24px" }}>
            <label style={{ fontFamily: "var(--font-ui)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--color-ocean-deep)", marginBottom: "10px", display: "block" }}>
              Status
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", fontFamily: "var(--font-body)" }}>
                <input
                  type="radio"
                  name="active"
                  checked={active}
                  onChange={() => setActive(true)}
                />
                Active
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", fontFamily: "var(--font-body)" }}>
                <input
                  type="radio"
                  name="active"
                  checked={!active}
                  onChange={() => setActive(false)}
                />
                Inactive
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="submit"
              disabled={saving}
              style={{ padding: "8px 16px", background: "var(--color-ocean-deep)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "var(--font-ui)", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
            >
              {saving ? "Creating..." : "Create Room"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              style={{ padding: "8px 16px", background: "#E5E7EB", color: "#1A1A1A", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "14px", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}