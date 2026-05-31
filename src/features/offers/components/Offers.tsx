import { useState } from 'react'
import { useOffers } from '../hooks/useOffers'
import OfferTable from './OffersTable'
import OfferModal from './OfferModal'
import { Spinner } from '../../../shared/components/Spinner/Spinner'
import type { Offer } from '../types/offers.type'
import styles from '../styles/Offers.module.css'

type ModalState = | { mode: 'create' } | { mode: 'edit'; offer: Offer } | { mode: 'delete'; offer: Offer } | null;

export default function Offers() {
    const { addOffer, editOffer, error, loading, offers, removeOffer } = useOffers();
    const [modal, setModal] = useState<ModalState>(null);

    return (
        <div className={styles.manageOfferContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Manage Offers</h1>
                <button className={styles.addButton} onClick={() => setModal({ mode: 'create' })}>
                    Add Offer
                </button>
            </div>

            {error && error == "getOffers" && <p className={styles.error}>{error}</p>}
            {loading && <Spinner centered message="Loading offers..." />}

            {!loading && offers && offers.length > 0 && (
                <div className={styles.tableContainer}>
                    <OfferTable
                        offers={offers}
                        onEditClick={(offer) => setModal({ mode: 'edit', offer })}
                        onDeleteClick={(offer) => setModal({ mode: 'delete', offer })}
                    />
                </div>
            )}

            {offers && offers.length === 0 && !loading && (
                <p>No offers available.</p>
            )}

            {modal && (
                <OfferModal
                    mode={modal.mode}
                    offer={'offer' in modal ? modal.offer : undefined}
                    onAdd={addOffer}
                    onUpdate={editOffer}
                    onDelete={removeOffer}
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    );
}