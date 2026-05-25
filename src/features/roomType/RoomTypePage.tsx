import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { RoomType } from './types/rooms.types';
import { useRoomTypes } from './hooks/useRoomTypes';
import RoomTypeList from './components/RoomTypeList';
import UpdateRoomTypeModal from './components/UpdateRoomTypeModal';
import CreateRoomTypeModal from './components/CreateRoomTypeModal';
import DeleteRoomTypeModal from './components/DeleteRoomTypeModal';
import styles from './styles/rooms.module.css';

function RoomTypePage() {
  const { 
    roomTypes, 
    loading, 
    error, 
    fetchRoomTypes, 
    updateRoomType, 
    createRoomType, 
    deleteRoomType 
  } = useRoomTypes();

  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);

  const handleManage = (_roomType: RoomType): void => {};

  const handleUpdate = (roomType: RoomType): void => {
    setSelectedRoom(roomType);
    setIsUpdateOpen(true);
  };

  const handleDelete = (roomType: RoomType): void => {
    setSelectedRoom(roomType);
    setIsDeleteOpen(true);
  };

  const handleCreateSubmit = async (payload: FormData) => {
    const result = await createRoomType(payload);
    if (result && !result.hasError) {
      toast.success("Room type created successfully!");
    }
    return result;
  };

  const handleUpdateSubmit = async (id: number, payload: FormData) => {
    const result = await updateRoomType(id, payload);
    if (result && !result.hasError) {
      toast.success("Room type updated successfully!");
    }
    return result;
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRoom) return;
    setIsDeleting(true);
    const result = await deleteRoomType(selectedRoom.id);
    setIsDeleting(false);
    if (result && !result.hasError) {
      toast.success("Room type deleted successfully!");
      setIsDeleteOpen(false);
      setSelectedRoom(null);
    } else {
      toast.error(result?.errorMessage || "Error deleting room type");
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-header__title">Manage Rooms</h1>
            <p className="page-header__subtitle" style={{ margin: 0 }}>
              Manage the room types, descriptions, rates and photos for Caribbean
              Ocean Resort &amp; Spa.
            </p>
          </div>
          <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
            + Add Room Type
          </button>
        </header>
        <hr className="page-header__divider" />

        {loading && <SkeletonGrid />}

        {error && (
          <div className={styles.error}>
            <p className={styles.errorText}>{error}</p>
            <button className="btn-primary" onClick={fetchRoomTypes}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <RoomTypeList
            roomTypes={roomTypes}
            onManage={handleManage}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}

        <CreateRoomTypeModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreateSubmit}
        />

        <UpdateRoomTypeModal 
          isOpen={isUpdateOpen} 
          onClose={() => setIsUpdateOpen(false)} 
          onUpdate={handleUpdateSubmit}
          roomType={selectedRoom} 
        />

        <DeleteRoomTypeModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          roomType={selectedRoom}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
  <div className={styles.skeletonGrid}>
    {[1, 2, 3].map((i) => (
      <div key={i} className={styles.skeletonCard}>
        <div className={`skeleton ${styles.skeletonImage}`} />
        <div className={styles.skeletonBody}>
          <div className={`skeleton ${styles.skeletonText}`} />
          <div className={`skeleton ${styles.skeletonPrice}`} />
          <div className={styles.skeletonActions}>
            <div className={`skeleton ${styles.skeletonBtn}`} />
            <div className={`skeleton ${styles.skeletonBtn}`} />
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default RoomTypePage;
