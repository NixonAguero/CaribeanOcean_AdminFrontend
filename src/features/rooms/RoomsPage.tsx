import { useState } from 'react';
import type { RoomType } from './types/rooms.types';
import { useRooms } from './hooks/useRooms';
import Rooms from './components/Rooms';
import UpdateRoomModal from './components/UpdateRoomModal';
import styles from './styles/rooms.module.css';

function RoomsPage() {
  const { roomTypes, loading, error, refetch } = useRooms();

  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // Botón Manage inactivo por solicitud del usuario
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
            <button className="btn-primary" onClick={refetch}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <Rooms
            roomTypes={roomTypes}
            onManage={handleManage}
            onUpdate={handleUpdate}
          />
        )}

        <UpdateRoomModal 
          isOpen={isUpdateOpen} 
          onClose={() => setIsUpdateOpen(false)} 
          onSuccess={refetch}
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

export default RoomsPage;
