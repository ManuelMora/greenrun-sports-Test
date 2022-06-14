export default interface ITransaction {
    id?: number;
    user_id: number;
    amount: number;
    category_id?: string;
    category?: ETransactionCategory;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    deleted_at?: Date;
    user_bet_id?: number;
}

export enum ETransactionCategory {
    DEPOSIT = 1,
    WITHDRAW = 2,
    BET = 3,
    WINNING = 4,
}
