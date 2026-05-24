import type { Offer } from '../types/offers.type'
import OfferRow from './OffersRow'
import styles from '../styles/Offers.module.css'

interface Props {
    offers: Offer[];
    onEditClick: (offer: Offer) => void;
    onDeleteClick: (offer: Offer) => void;
}

export default function OfferTable({ offers, onEditClick, onDeleteClick }: Props) {
    return (
        <table className={styles.offersTable}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Discount</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Room Type</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {offers.map(offer =>
                    <OfferRow
                        key={offer.id}
                        offer={offer}
                        onEditClick={() => onEditClick(offer)}
                        onDeleteClick={() => onDeleteClick(offer)}
                    />
                )}
            </tbody>
        </table>
    );
}