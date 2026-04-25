import type { RoomType } from '../types/rooms.types';
import styles from './Rooms.module.css';

interface RoomCardProps {
  roomType: RoomType;
  onManage: (roomType: RoomType) => void;
  onUpdate: (roomType: RoomType) => void;
}

function RoomCard({ roomType, onManage, onUpdate }: RoomCardProps) {
  const formattedPrice = `$${roomType.dailyRate.toLocaleString()}`;

  return (
    <article className={styles.card} id={`room-type-card-${roomType.id}`}>
      <div className={styles.cardImageWrapper}>
        <img
          src={roomType.imageUrl}
          alt={`${roomType.name} room`}
          className={styles.cardImage}
          loading="lazy"
        />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{roomType.name}</h3>
        <p className={styles.cardPrice}>{formattedPrice}</p>

        <div className={styles.cardActions}>
          <button
            className="btn-action"
            onClick={() => onManage(roomType)}
            id={`manage-btn-${roomType.id}`}
          >
            Manage
          </button>
          <button
            className="btn-action"
            onClick={() => onUpdate(roomType)}
            id={`update-btn-${roomType.id}`}
          >
            Update
          </button>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
