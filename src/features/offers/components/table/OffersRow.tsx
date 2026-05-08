import type { SingleOfferProps } from '../../types/offers.props'
import DeleteOfferButton from '../buttons/DeleteButton'
import UpdateOfferButton from '../buttons/UpdateButton'
import styles from '../../styles/Offers.module.css'

interface Props extends SingleOfferProps {
    onUpdate: (offer: any) => Promise<any>;
    onDelete: (id: number) => Promise<void>;
}

export default function OfferRow({ offer, onUpdate, onDelete }: Props) {
    return (
        <tr className={styles.tableRow}>
            <td>{offer.name}</td>
            <td>{offer.discount}%</td>
            <td>{offer.startDate}</td>
            <td>{offer.endDate}</td>
            <td>{offer.roomType}</td>
            <td>{offer.description}</td>
            <td>
                <div className={styles.actions}>
                    <UpdateOfferButton offer={offer} onAction={onUpdate} />
                    <DeleteOfferButton offer={offer} onDelete={onDelete} />
                </div>
            </td>
        </tr>
    );
}