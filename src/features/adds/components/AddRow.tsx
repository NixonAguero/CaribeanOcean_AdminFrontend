// Función para formatear la fecha a YYYY-MM-DD
function formatDate(dateString: string) {
    return dateString.split('T')[0];
}
import type { rowAddProps } from '../types/add.props';
import DeleteAddButton from './DeleteAddButton';
import styles from '../styles/Add.module.css';
import UpdateAddButton from './UpdateAddButton';


export default function AddRow({ add, onUpdate, onDelete }: rowAddProps) {
    return (
        <tr>
            <td>
                <div className={styles.addCell}>
                {add.imageURL && (
                    <img
                    src={add.imageURL}
                    alt="Ad preview"
                    className={styles.addThumbnail}
                    />
                )}
                </div>
            </td>
            <td>{add.targetURL}</td>
            <td>{formatDate(add.updatedAt)}</td>
            
            <td>
                <div className={styles.actions}>
                    <UpdateAddButton add={add} onUpdate={onUpdate} />
                    <DeleteAddButton add={add} onDelete={onDelete}/>
                </div>
            </td>
        </tr>
    );
}