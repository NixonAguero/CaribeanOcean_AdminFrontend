import { useState } from 'react';
import type { createAddProps } from "../types/add.props";
import styles from '../styles/Add.module.css';
import CreateAddModal from './CreateAddModal';

export default function CreateAddButton({ onCreate }: createAddProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className={styles.addButton} onClick={() => setIsOpen(true)}>
                Create Add
            </button>

            {isOpen && (
                <CreateAddModal
                    onCreate={onCreate} 
                    onClose={() => setIsOpen(false)} 
                />
            )}
        </>
    );
}