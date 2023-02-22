import { createFormContext } from '@mantine/form';

interface UserFormValues {
    age: number;
    name: string;
}
// You can give context variables any name
export const [UserFormProvider, useUserFormContext, useUserForm] =
    createFormContext<UserFormValues>();


interface SearchTableFormValues {
    receiveTimeStart: unknown
}

export const [SearchTableFormProvider, useSearchTableFormContext, useSearchTableForm] =
    createFormContext<SearchTableFormValues>();