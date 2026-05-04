import { useState } from 'react';
import type { AddOfferProps } from '../../types/offers.props';
import CreateOfferModal from '../modals/CreateOfferModal';
import styles from '../../styles/Offers.module.css';

export default function AddOfferButton({ onAdd }: AddOfferProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className={styles.addButton} onClick={() => setIsOpen(true)}>
                Add Offer
            </button>

            {isOpen && (
                <CreateOfferModal 
                    onAdd={onAdd} 
                    onClose={() => setIsOpen(false)} 
                />
            )}
        </>
    );
}