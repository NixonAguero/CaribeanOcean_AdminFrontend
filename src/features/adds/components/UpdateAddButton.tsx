import { useState } from 'react';
import type { AddUpdateActionProps } from '../types/add.props';
import UpdateAddModal from './UpdateAddModal';
import styles from '../styles/Add.module.css';

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
