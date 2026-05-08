import { useState } from "react";
import type { AddDeleteActionProps } from "../types/add.props";
import styles from "../styles/Add.module.css";
import DeleteAddModal from "./DeleteAddModal";

export default function DeleteAddButton({ add, onDelete }: AddDeleteActionProps) {
    const [deleteClick, setDeleteClick] = useState<boolean>(false);

    return (
        <>
            <button className={styles.deleteButton} onClick={() => setDeleteClick(true)}>
                Delete
            </button>
        
            {deleteClick && (
                <DeleteAddModal 
                    add={add} 
                    onDelete={onDelete}
                    onClose={() => setDeleteClick(false)} 
                />
            )}
        </>
    );
}