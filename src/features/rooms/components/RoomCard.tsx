import type { RoomType } from '../types/rooms.types';
import styles from './Rooms.module.css';



const roomImages = import.meta.glob<{ default: string }>('../../../assets/images/rooms/*.jpg', { eager: true });

interface RoomCardProps {
  roomType: RoomType;
  onManage: (roomType: RoomType) => void;
  onUpdate: (roomType: RoomType) => void;
}

function RoomCard({ roomType, onManage, onUpdate }: RoomCardProps) {
  const formattedPrice = `$${roomType.dailyRate.toLocaleString()}`;

  const fileName = roomType.imageUrl.split('/').pop();


  const imageKey = `../../../assets/images/rooms/${fileName}`;
  const imageUrl = roomImages[imageKey] ? roomImages[imageKey].default : '';

  return (
    <article className={styles.card} id={`room-type-card-${roomType.id}`}>
      <div className={styles.cardImageWrapper}>
        <img
          src={imageUrl}
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
            Details
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
