import type { Offer } from '../types/offers.type'
import styles from '../styles/Offers.module.css'

interface Props {
    offer: Offer;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    }).format(date);
};

export default function OfferRow({ offer, onEditClick, onDeleteClick }: Props) {
    return (
        <tr className={styles.tableRow}>
            <td>{offer.name}</td>
            <td>{offer.discount}%</td>
            <td>{formatDate(offer.startDate)}</td>
            <td>{formatDate(offer.endDate)}</td>
            <td>{offer.roomType}</td>
            <td>{offer.description}</td>
            <td>
                <div className={styles.actions}>
                    <button className={styles.editButton} onClick={onEditClick}>
                        Edit
                    </button>
                    <button className={styles.deleteButton} onClick={onDeleteClick}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}