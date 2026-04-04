import type { RoomType } from '../types/rooms.types';
import styles from './Rooms.module.css';

interface RoomCardProps {
  roomType: RoomType;
  onManage: (roomType: RoomType) => void;
  onUpdate: (roomType: RoomType) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ roomType, onManage, onUpdate }) => {
  const formattedPrice = `$${roomType.daily_rate.toLocaleString()}`;

  return (
    <article className={styles.card} id={`room-type-card-${roomType.id}`}>
      <div className={styles.cardImageWrapper}>
        <img
          src={roomType.image_url}
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
            disabled
            title="Coming soon"
            id={`manage-btn-${roomType.id}`}
          >
            Details
          </button>
          <button
            className="btn-action"
            onClick={() => onUpdate(roomType)}
            disabled
            title="Coming soon"
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
