export default interface IUser {
    id?: number;
    role: number;
    first_name: string;
    last_name: string;
    phone?: string;
    email: string;
    username: string;
    address?: string;
    gender: string;
    birth_date: string;
    city: number;
    category: string;
    document_id: string;
    user_state: string;
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    deleted_at?: Date;
}
