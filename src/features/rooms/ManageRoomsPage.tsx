import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useRooms } from "./hooks/useRooms";
import { roomTypeService } from "../roomType/services/roomTypeService";
import type { RoomType } from "../roomType/types/rooms.types";
import type { Room } from "./services/roomService";
import styles from "./styles/ManageRoomsModal.module.css";
import pageStyles from "./styles/ManageRoomsPage.module.css";
import CreateRoomModal from "./components/CreateRoomModal";
import UpdateRoomModal from "./components/UpdateRoomModal";

export default function ManageRoomsPage() {
  const { roomTypeId } = useParams<{ roomTypeId: string }>();
  const navigate = useNavigate();
  const id = parseInt(roomTypeId ?? "0");

  const { rooms, loading, error, fetchRooms, createRoom, updateRoom, deleteRoom } = useRooms(id);
  const [roomType, setRoomType] = useState<RoomType | null>(null);

  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchRooms();
    roomTypeService.getAll().then((types) => {
      const found = types.find((t) => t.id === id);
      if (found) setRoomType(found);
    });
  }, [id]);

  const filtered = rooms
  .filter((r) => r.number.toString().includes(search.trim()))
  .sort((a, b) => a.number - b.number);

  const handleStartEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsUpdateOpen(true);
  };

  const handleCreate = async (number: number, active: boolean) => {
    await createRoom(number, active);
    toast.success("Room created successfully!");
  };

  const handleUpdate = async (id: number, number: number, active: boolean) => {
    await updateRoom(id, number, active);
    toast.success("Room updated successfully!");
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

  return (
    <div className="admin-content">
      <div className="admin-content__inner">

        {/* Header */}
        <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <button className={pageStyles.backBtn} onClick={() => navigate("/admin/rooms")}>
              ← Back to Room Types
            </button>
            <h1 className="page-header__title" style={{ marginTop: "8px" }}>
              {roomType ? `${roomType.name} — Rooms` : "Manage Rooms"}
            </h1>
            <p className="page-header__subtitle" style={{ margin: 0 }}>
              View, add, update or delete individual rooms for this room type.
            </p>
          </div>
          <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
            + Add Room
          </button>
        </header>
        <hr className="page-header__divider" />

        {/* Search */}
        <div className={pageStyles.toolbar}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by room number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading && <p className={styles.info}>Loading...</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        {!loading && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
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
                    <td colSpan={3} className={styles.empty}>
                      No rooms found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((room) => (
                    <tr key={room.id} className={styles.tableRow}>
                      <td className={styles.roomNumber}>#{room.number}</td>
                      <td>
                        <span className={room.active ? styles.badgeActive : styles.badgeInactive}>
                          {room.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className={styles.actionsCell}>
                        <button
                          className={styles.updateBtn}
                          onClick={() => handleStartEdit(room)}
                        >
                          Update
                        </button>
                        {confirmDeleteId === room.id ? (
                          <>
                            <button
                              className={styles.confirmBtn}
                              onClick={() => handleDelete(room.id)}
                              disabled={saving}
                            >
                              Confirm
                            </button>
                            <button
                              className={styles.cancelBtn}
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => setConfirmDeleteId(room.id)}
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

        <CreateRoomModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreate}
        />

        <UpdateRoomModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          room={selectedRoom}
          onUpdate={handleUpdate}
        />

      </div>
    </div>
  );
}