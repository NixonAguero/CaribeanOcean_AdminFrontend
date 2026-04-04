import type { RoomType } from '../types/rooms.types';
import RoomCard from './RoomCard';
import styles from './Rooms.module.css';

interface RoomsProps {
  roomTypes: RoomType[];
  onManage: (roomType: RoomType) => void;
  onUpdate: (roomType: RoomType) => void;
}

const Rooms: React.FC<RoomsProps> = ({ roomTypes, onManage, onUpdate }) => {
  return (
    <section className={styles.grid} id="room-type-grid">
      {roomTypes.map((roomType) => (
        <RoomCard
          key={roomType.id}
          roomType={roomType}
          onManage={onManage}
          onUpdate={onUpdate}
        />
      ))}
    </section>
  );
};

export default Rooms;
