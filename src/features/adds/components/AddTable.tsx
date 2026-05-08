import type { tableAddProps } from "../types/add.props";
import AddRow from "./AddRow";

export default function AddTable({ adds, onUpdate, onDelete }: tableAddProps) {
    
    return(
        <table className="offersTable">
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