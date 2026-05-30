import type { RoomType } from '../types/rooms.types';
import RoomCard from './RoomCard';
import styles from './Rooms.module.css';

interface RoomTypeListProps {
  roomTypes: RoomType[];
  onManage: (roomType: RoomType) => void;
  onUpdate: (roomType: RoomType) => void;
  onDelete: (roomType: RoomType) => void;
}

function RoomTypeList({ roomTypes, onManage, onUpdate, onDelete }: RoomTypeListProps) {
  return (
    <section className={styles.grid} id="room-type-grid">
      {roomTypes.map((roomType) => (
        <RoomCard
          key={roomType.id}
          roomType={roomType}
          onManage={onManage}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default RoomTypeList;
