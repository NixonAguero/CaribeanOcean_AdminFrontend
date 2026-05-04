import { useState } from 'react';
import type { OfferDeleteActionProps } from '../../types/offers.props';
import DeleteOfferModal from '../modals/DeleteOfferModal';
import styles from '../../styles/Offers.module.css';

export default function DeleteOfferButton({ offer, onDelete }: OfferDeleteActionProps) {
    const [deleteClick, setDeleteClick] = useState<boolean>(false);

    return (
        <>
            <button className={styles.deleteButton} onClick={() => setDeleteClick(true)}>
                Delete
            </button>

            {deleteClick && (
                <DeleteOfferModal 
                    offer={offer} 
                    onDelete={onDelete}
                    onClose={() => setDeleteClick(false)} 
                />
            )}
        </>
    );
}