import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import ITransaction, { ETransactionCategory } from '../models/ITransaction';
import TransactionService from '../services/transactionService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const transactionController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:transactionController');

transactionController.post(
    '/',
    [validator.validate('post', '/transactions')],
    async (request: Request, response: Response) => {
        try {
            const transaction: ITransaction = request.body;
            transaction.category =
                ETransactionCategory[
                transaction.category_id as keyof typeof ETransactionCategory
                ];
            delete transaction.category_id;
            debug('created transaction by user: %s', transaction.user_id);
            const transactionServiceResult =
                await TransactionService.createTransaction(transaction);
            response
                .status(transactionServiceResult.status)
                .send(transactionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

transactionController.put(
    '/:id',
    [validator.validate('put', '/transactions/{id}')],
    async (request: Request, response: Response) => {
        try {
            const transaction: ITransaction = request.body;
            transaction.id = Number(request.params.id);
            debug('updated transaction with id: %s', transaction.id);
            const transactionServiceResult =
                await TransactionService.updateTransaction(transaction);
            response
                .status(transactionServiceResult.status)
                .send(transactionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

transactionController.get(
    '/',
    [validator.validate('get', '/transactions')],
    async (request: Request, response: Response) => {
        try {
            const transactionServiceResult =
                await TransactionService.getTransactions();
            response
                .status(transactionServiceResult.status)
                .send(transactionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

transactionController.get(
    '/:id',
    [validator.validate('get', '/transactions/{id}')],
    async (request: Request, response: Response) => {
        try {
            const transactionId = Number(request.params.id);
            const transactionServiceResult =
                await TransactionService.getTransactionById(transactionId);
            response
                .status(transactionServiceResult.status)
                .send(transactionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

transactionController.get(
    '/user/:id',
    [validator.validate('get', '/transactions/user/{id}')],
    async (request: Request, response: Response) => {
        try {
            const userId = Number(request.params.id);
            const transactionServiceResult =
                await TransactionService.getTransactionsByUser(userId);
            response
                .status(transactionServiceResult.status)
                .send(transactionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

transactionController.delete(
    '/:id',
    [validator.validate('delete', '/transactions/{id}')],
    async (request: Request, response: Response) => {
        try {
            const transactionId = Number(request.params.id);
            debug('deleted transaction with id: %s', transactionId);
            const transactionServiceResult =
                await TransactionService.deleteTransaction(transactionId);
            response
                .status(transactionServiceResult.status)
                .send(transactionServiceResult);
        } catch (error: any) {
            response.status(error.status || 500).send(error.message || error);
        }
    }
);

export default transactionController;
