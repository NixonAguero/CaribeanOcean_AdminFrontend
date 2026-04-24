import { useState, useEffect } from 'react';
import type { RoomType } from './types/rooms.types';
import { useRoomTypes } from './hooks/useRoomTypes';
import RoomTypeList from './components/RoomTypeList';
import UpdateRoomTypeModal from './components/UpdateRoomTypeModal';
import styles from './styles/rooms.module.css';

function RoomTypePage() {
  const { roomTypes, loading, error, fetchRoomTypes, updateRoomType } = useRoomTypes();

  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);

  const handleManage = (roomType: RoomType): void => {};

  const handleUpdate = (roomType: RoomType): void => {
    setSelectedRoom(roomType);
    setIsUpdateOpen(true);
  };

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className="page-header">
          <h1 className="page-header__title">Manage Rooms</h1>
          <p className="page-header__subtitle">
            Manage the room types, descriptions, rates and photos for Caribbean
            Ocean Resort &amp; Spa.
          </p>
          <hr className="page-header__divider" />
        </header>

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
          />
        )}

        <UpdateRoomTypeModal 
          isOpen={isUpdateOpen} 
          onClose={() => setIsUpdateOpen(false)} 
          onUpdate={updateRoomType}
          roomType={selectedRoom} 
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
