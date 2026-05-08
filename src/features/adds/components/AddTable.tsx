import type { tableAddProps } from "../types/add.props";
import styles from '../styles/Add.module.css';
import AddRow from "./AddRow";

export default function AddTable({ adds, onUpdate, onDelete }: tableAddProps) {
    
    return(
        <table className={styles.offersTable}>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Target URL</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {adds.map(add =>
                    <AddRow
                        key={add.id}
                        add={add}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                )}
            </tbody>
        </table>
    );


}