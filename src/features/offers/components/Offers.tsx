import { useOffers } from '../hooks/useOffers'
import OfferTable  from './table/OffersTable'
import AddOfferButton from './buttons/AddOfferButton'
import { Spinner } from '../../../shared/components/Spinner/Spinner'
import styles from '../styles/Offers.module.css'

export default function Offers (){
    const {addOffer, editOffer, error, loading, offers, removeOffer} = useOffers();

    return(
        <div className={styles.manageOfferContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Manage Offers</h1>
                <AddOfferButton onAdd={addOffer}/>
            </div>
            
            {error && error == "getOffers" && <p className={styles.error}>{error}</p>}
            {loading && <Spinner centered message="Loading offers..." />}
            
            {!loading && offers && offers.length > 0 && (
                <div className={styles.tableContainer}>
                    <OfferTable 
                        offers={offers} 
                        onUpdate={editOffer} 
                        onDelete={removeOffer} 
                    />
                </div>
            )}
            
            {offers && offers.length === 0 && !loading && (
                <p>No offers available.</p>
            )}
        </div>
    );
}