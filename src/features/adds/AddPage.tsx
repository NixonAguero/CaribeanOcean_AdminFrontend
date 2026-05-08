import { Spinner } from "../../shared/components/Spinner/Spinner";
import AddTable from "./components/AddTable";
import CreateAddButton from "./components/CreateAddButton";


import { useAdds } from "./hooks/useAdds";
import styles from './styles/Add.module.css';

export default function AddPage() {
    const { adds, loading, error, useCreateAdd, removeAdd, editAdd } = useAdds();

    return (

        <div className="admin-content">
            <div className={styles.header}>
                <h1 className="page-header__title">Manage Adds</h1>
                <CreateAddButton onCreate={useCreateAdd} />
            </div>
            <hr className="page-header__divider" />

            {error && error == "getAdd" && <p className="">{error}</p>}
            {loading && <Spinner centered message="Loading adds..." />}
            
            {!loading && adds && adds.length > 0 && (
                <div className="tableContainer">
                    <AddTable adds={adds} onUpdate={editAdd} onDelete={removeAdd} />
                </div>
            )}
        </div>

    );
}
