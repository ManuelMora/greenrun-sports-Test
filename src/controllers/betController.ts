import { Router, Request, Response } from 'express';
import debugLib from 'debug';
import IBet, { EBetStatus, EBetResult } from '../models/IBet';
import BetService from '../services/betService';
import OpenApiValidatorProvider from '../utils/OpenApiValidator';

const betController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const debug = debugLib('greenrun-sports:betController');

betController.post(
  '/',
  //[validator.validate('post', '/bets')],
  async (request: Request, response: Response) => {
    try {
      const bet: IBet = request.body;
      bet.status = EBetStatus[bet.status_id as keyof typeof EBetStatus];
      delete bet.status_id;
      debug('created new bet');
      const betServiceResult = await BetService.createBet(bet);
      response.status(betServiceResult.status).send(betServiceResult);
    } catch (error: any) {
      response.status(error.status || 500).send(error.message || error);
    }
  }
);

betController.put(
  '/:id',
  //[validator.validate('put', '/bets/{id}')],
  async (request: Request, response: Response) => {
    try {
      const bet: IBet = request.body;
      bet.id = Number(request.params.id);
      bet.status = EBetStatus[bet.status_id as keyof typeof EBetStatus];
      delete bet.status_id;
      bet.result &&
        (bet.result = EBetResult[bet.result_id as keyof typeof EBetResult]);
      delete bet.result_id;
      debug('updated bet with id: %s', bet.id);
      const betServiceResult = await BetService.updateBet(bet);
      response.status(betServiceResult.status).send(betServiceResult);
    } catch (error: any) {
      response.status(error.status || 500).send(error.message || error);
    }
  }
);

betController.get(
  '/',
  //[validator.validate('get', '/bets')],
  async (request: Request, response: Response) => {
    try {
      const betServiceResult = await BetService.getBets();
      response.status(betServiceResult.status).send(betServiceResult);
    } catch (error: any) {
      response.status(error.status || 500).send(error.message || error);
    }
  }
);

betController.get(
  '/:id',
  //[validator.validate('get', '/bets/{id}')],
  async (request: Request, response: Response) => {
    try {
      const betId = Number(request.params.id);
      const betServiceResult = await BetService.getBetById(betId);
      response.status(betServiceResult.status).send(betServiceResult);
    } catch (error: any) {
      response.status(error.status || 500).send(error.message || error);
    }
  }
);

betController.delete(
  '/:id',
  //[validator.validate('delete', '/bets/{id}')],
  async (request: Request, response: Response) => {
    try {
      const betId = Number(request.params.id);
      debug('deleted bet with id: %s', betId);
      const betServiceResult = await BetService.deleteBet(betId);
      response.status(betServiceResult.status).send(betServiceResult);
    } catch (error: any) {
      response.status(error.status || 500).send(error.message || error);
    }
  }
);

export default betController;
