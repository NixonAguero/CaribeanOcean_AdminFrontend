import { useState } from 'react';
import type { OfferUpdateActionProps } from '../../types/offers.props';
import UpdateOfferModal from '../modals/UpdateOfferModal';
import styles from '../../styles/Offers.module.css';

export default function UpdateOfferButton({ offer, onAction }: OfferUpdateActionProps) {
    const [updateClick, setUpdateClick] = useState<boolean>(false);

    return (
        <>
            <button className={styles.editButton} onClick={() => setUpdateClick(true)}>
                Edit
            </button>

            {updateClick && (
                <UpdateOfferModal 
                    offer={offer} 
                    onUpdate={onAction}
                    onClose={() => setUpdateClick(false)} 
                />
            )}
        </>
    );
}