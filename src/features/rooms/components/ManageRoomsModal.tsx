import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { RoomType } from "../../roomType/types/rooms.types";
import { useRooms } from "../hooks/useRooms";
import styles from "../styles/ManageRoomsModal.module.css";
import tableStyles from "../styles/ManageRoomsModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomType: RoomType | null;
}

export default function ManageRoomsModal({ isOpen, onClose, roomType }: Props) {
  const { rooms, loading, error, fetchRooms, createRoom, updateRoom, deleteRoom } =
    useRooms(roomType?.id ?? 0);

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNumber, setEditNumber] = useState("");
  const [editActive, setEditActive] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newActive, setNewActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && roomType) {
      fetchRooms();
      setSearch("");
      setEditingId(null);
      setIsCreating(false);
      setConfirmDeleteId(null);
    }
  }, [isOpen, roomType]);

  if (!isOpen || !roomType) return null;

  const filtered = rooms.filter((r) =>
    r.number.toString().includes(search.trim())
  );

  const handleStartEdit = (room: { id: number; number: number; active: boolean }) => {
    setEditingId(room.id);
    setEditNumber(room.number.toString());
    setEditActive(room.active);
    setIsCreating(false);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      await updateRoom(editingId, parseInt(editNumber), editActive);
      toast.success("Room updated successfully!");
      setEditingId(null);
    } catch {
      toast.error("Error updating room.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSaving(true);
    try {
      await deleteRoom(id);
      toast.success("Room deleted successfully!");
      setConfirmDeleteId(null);
    } catch {
      toast.error("Error deleting room.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async () => {
    if (!newNumber.trim()) return;
    setSaving(true);
    try {
      await createRoom(parseInt(newNumber), newActive);
      toast.success("Room created successfully!");
      setIsCreating(false);
      setNewNumber("");
      setNewActive(true);
    } catch {
      toast.error("Error creating room.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        style={{ maxWidth: "680px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            Manage rooms — {roomType.name}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>

          {/* Search + Add */}
          <div className={tableStyles.toolbar}>
            <input
              className={tableStyles.searchInput}
              type="text"
              placeholder="Search by room number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className={tableStyles.addBtn}
              onClick={() => { setIsCreating(true); setEditingId(null); }}
            >
              + Add Room
            </button>
          </div>

          {/* Create row */}
          {isCreating && (
            <div className={tableStyles.createRow}>
              <input
                className={tableStyles.inlineInput}
                type="number"
                placeholder="Room number"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                autoFocus
              />
              <label className={tableStyles.toggle}>
                <input
                  type="checkbox"
                  checked={newActive}
                  onChange={(e) => setNewActive(e.target.checked)}
                />
                <span>{newActive ? "Active" : "Inactive"}</span>
              </label>
              <button className={tableStyles.saveBtn} onClick={handleCreate} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className={tableStyles.cancelBtn} onClick={() => setIsCreating(false)}>
                Cancel
              </button>
            </div>
          )}

          {/* Table */}
          {loading && <p className={tableStyles.info}>Loading...</p>}
          {error && <p className={tableStyles.errorText}>{error}</p>}

          {!loading && (
            <div className={tableStyles.tableWrapper}>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Room number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={3} className={tableStyles.empty}>
                        No rooms found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((room) => (
                      <tr key={room.id} className={tableStyles.tableRow}>
                        {editingId === room.id ? (
                          <>
                            <td>
                              <input
                                className={tableStyles.inlineInput}
                                type="number"
                                value={editNumber}
                                onChange={(e) => setEditNumber(e.target.value)}
                                autoFocus
                              />
                            </td>
                            <td>
                              <label className={tableStyles.toggle}>
                                <input
                                  type="checkbox"
                                  checked={editActive}
                                  onChange={(e) => setEditActive(e.target.checked)}
                                />
                                <span>{editActive ? "Active" : "Inactive"}</span>
                              </label>
                            </td>
                            <td className={tableStyles.actionsCell}>
                              <button className={tableStyles.saveBtn} onClick={handleSaveEdit} disabled={saving}>
                                {saving ? "Saving..." : "Save"}
                              </button>
                              <button className={tableStyles.cancelBtn} onClick={() => setEditingId(null)}>
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className={tableStyles.roomNumber}>#{room.number}</td>
                            <td>
                              <span className={room.active ? tableStyles.badgeActive : tableStyles.badgeInactive}>
                                {room.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className={tableStyles.actionsCell}>
                              <button
                                className={tableStyles.updateBtn}
                                onClick={() => handleStartEdit(room)}
                              >
                                Update
                              </button>
                              {confirmDeleteId === room.id ? (
                                <>
                                  <button
                                    className={tableStyles.confirmBtn}
                                    onClick={() => handleDelete(room.id)}
                                    disabled={saving}
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    className={tableStyles.cancelBtn}
                                    onClick={() => setConfirmDeleteId(null)}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  className={tableStyles.deleteBtn}
                                  onClick={() => setConfirmDeleteId(room.id)}
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              background: "#E5E7EB",
              color: "#1A1A1A",
              border: "1px solid #D1D5DB",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}