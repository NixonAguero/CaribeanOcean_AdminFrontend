import { useState } from "react";
import styles from '../styles/Add.module.css';
import UpdateAddModal from "./UpdateAddModal";
import type { AddUpdateActionProps } from "../types/add.props";


export default function UpdateAddButton({ add, onUpdate }: AddUpdateActionProps) {
    const [updateClick, setUpdateClick] = useState<boolean>(false);

    return (
        <>
            <button className={styles.editButton} onClick={() => setUpdateClick(true)}>
                Edit
            </button>

            {updateClick && (
                <UpdateAddModal
                    isOpen={updateClick}
                    add={add} 
                    onUpdate={onUpdate}
                    onClose={() => setUpdateClick(false)} 
                />
            )}
        </>
    );
}