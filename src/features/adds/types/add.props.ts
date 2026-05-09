import type { Add } from "./add.types";

export interface tableAddProps {
    adds: Add[];
    onUpdate: (add: Add, newImage: File | null) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export interface rowAddProps {
    add: Add;
    onUpdate: (add: Add, newImage: File | null) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export interface SingleAddProps {
    add: Add;
}

export interface AddDeleteActionProps extends SingleAddProps {
    onDelete: (id: number) => Promise<void>;
}

export interface AddUpdateActionProps extends SingleAddProps {
    onUpdate: (add: Add, newImage: File | null) => Promise<void>;
}

export interface createAddProps {
    onCreate: (image: File, targetURL: string) => Promise<void>;
}

export interface createAddModalProps extends createAddProps {
    onClose: () => void;
}