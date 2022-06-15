export default interface IEvent {
    id?: number;
    name: string;
    status?: EEventStatus;
    created_at?: Date;
    updated_at?: Date;
    deleted?: boolean;
    deleted_at?: Date;
}

export enum EEventStatus {
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}
