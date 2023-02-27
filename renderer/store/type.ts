export interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

export interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}
export interface BearState {
    bears: number,
    fields: FieldData[],

    modalstatus: boolean,
    changemodalstatus: () => void
    increase: (by: number) => void
    setfieIds:(by) =>void
}