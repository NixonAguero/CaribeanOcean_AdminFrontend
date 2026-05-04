import type { OffersTableProps } from '../../types/offers.props'
import OfferRow from './OffersRow'
import styles from '../../styles/Offers.module.css'

export default function OfferTable({ offers, onUpdate, onDelete }: OffersTableProps) {
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
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                )}
            </tbody>
        </table>
    );
}