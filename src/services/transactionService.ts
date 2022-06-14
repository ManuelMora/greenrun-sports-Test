import debugLib from 'debug';
import IResponse from '../models/IResponse';
import ITransaction from '../models/ITransaction';
import { databaseClient } from './databaseService';

const debug = debugLib('greenrun-sports:TransactionService');

export default class TransactionService {
    public static createTransaction(
        transaction: ITransaction
    ): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient.from('transactions').insert(transaction);
                resolve({ status: 200, data: 'transaction created.' });
            } catch (error: any) {
                debug('error when try created transaction: %s', error);
                reject(error);
            }
        });
    }

    public static updateTransaction(
        transaction: ITransaction
    ): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('transactions')
                    .where({ id: transaction.id })
                    .update(transaction);
                resolve({ status: 200, data: 'transaction updated.' });
            } catch (error: any) {
                debug('error when try updated transaction: %s', error);
                reject(error);
            }
        });
    }

    public static getTransactions(): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const transactionsList = await databaseClient
                    .from('transactions')
                    .join(
                        'transaction_categories',
                        'transactions.category',
                        '=',
                        'transaction_categories.id'
                    )
                    .join('users', 'transactions.user_id', '=', 'users.id')
                    .select(
                        'transactions.id',
                        'transactions.user_id',
                        'users.username',
                        'users.first_name',
                        'users.last_name',
                        'transactions.amount',
                        'transactions.category as category_id',
                        'transaction_categories.name as category',
                        'transactions.status',
                        'transactions.created_at',
                        'transactions.updated_at',
                        'transactions.deleted',
                        'transactions.deleted_at',
                        'transactions.user_bet_id'
                    );
                resolve({
                    status: 200,
                    data: { rows: transactionsList, total: transactionsList.length },
                });
            } catch (error: any) {
                debug('error when try get transactions list: %s', error);
                reject(error);
            }
        });
    }

    public static getTransactionById(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const transactionMatch = await databaseClient
                    .from('transactions')
                    .join(
                        'transaction_categories',
                        'transactions.category',
                        '=',
                        'transaction_categories.id'
                    )
                    .where({ 'transactions.id': id })
                    .select(
                        'transactions.id',
                        'transactions.user_id',
                        'transactions.amount',
                        'transactions.category as category_id',
                        'transaction_categories.name as category',
                        'transactions.status',
                        'transactions.created_at',
                        'transactions.updated_at',
                        'transactions.deleted',
                        'transactions.deleted_at',
                        'transactions.user_bet_id'
                    )
                    .limit(1);
                resolve({ status: 200, data: transactionMatch[0] });
            } catch (error: any) {
                debug('error when try get transaction: %s', error);
                reject(error);
            }
        });
    }

    public static getTransactionsByUser(userId: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const transactionMatchList = await databaseClient
                    .from('transactions')
                    .join(
                        'transaction_categories',
                        'transactions.category',
                        '=',
                        'transaction_categories.id'
                    )
                    .where({ user_id: userId })
                    .select(
                        'transactions.id',
                        'transactions.user_id',
                        'transactions.amount',
                        'transactions.category as category_id',
                        'transaction_categories.name as category',
                        'transactions.status',
                        'transactions.created_at',
                        'transactions.updated_at',
                        'transactions.deleted',
                        'transactions.deleted_at',
                        'transactions.user_bet_id'
                    );
                resolve({
                    status: 200,
                    data: {
                        rows: transactionMatchList,
                        total: transactionMatchList.length,
                    },
                });
            } catch (error: any) {
                debug('error when try get transactions by user: %s', error);
                reject(error);
            }
        });
    }

    public static deleteTransaction(id: number): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                await databaseClient
                    .from('transactions')
                    .where({ id })
                    .update({ deleted: true });
                resolve({ status: 200, data: 'transaction deleted.' });
            } catch (error: any) {
                debug('error when try deleted transaction: %s', error);
                reject(error);
            }
        });
    }
}
