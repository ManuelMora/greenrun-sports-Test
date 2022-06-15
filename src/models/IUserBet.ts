import { EBetResult } from './IBet';

export default interface IUserBet {
    id?: number;
    user_id: number;
    bet_id: number;
    odd: number;
    amount: number;
    state_id?: string;
    state?: EBetResult;
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    deleted_at?: Date;
}
