export default interface IBet {
    id?: number;
    bet_option: number;
    sport: number;
    status_id?: string;
    status?: EBetStatus;
    name: string;
    event_id: number;
    odd: number;
    result_id?: string;
    result?: EBetResult;
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    deleted_at?: Date;
}

export enum EBetStatus {
    ACTIVE = 1,
    CANCELLED = 2,
    SETTLED = 3,
}

export enum EBetResult {
    WON = 1,
    LOST = 2,
    OPEN = 3,
}
