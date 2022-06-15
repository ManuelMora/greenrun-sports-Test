import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from 'morgan';
import config from './config';
const swaggerDocument = require('../static/greenrun-sports-V1-OAS.json');
// Controllers
import authController from './controllers/authController';
import betController from './controllers/betController';
import cityController from './controllers/cityController';
import countryController from './controllers/countryController';
import eventController from './controllers/eventController';
import moduleController from './controllers/moduleController';
import roleController from './controllers/roleController';
import rolePermissionController from './controllers/rolePermissionController';
import sportController from './controllers/sportController';
import transactionController from './controllers/transactionController';
import userBetController from './controllers/userBetController';
import userController from './controllers/userController';

const app = express();
const apiPath = config.apiPath;
const fullApiPath = `${apiPath}/V1`;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With,' +
        'Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// Declare Swagger
app.use(
    `/api-docs`,
    (req: any, res: Response, next: NextFunction) => {
        swaggerDocument.servers = [{ url: config.serverUrl }];
        req.swaggerDoc = swaggerDocument;
        next();
    },
    swaggerUi.serveFiles(swaggerDocument, {}),
    swaggerUi.setup()
);
app.get('/', (req: Request, res: Response) => res.redirect('/api-docs'));

app.use(`${fullApiPath}/auth`, authController);
app.use(`${fullApiPath}/bets`, betController);
app.use(`${fullApiPath}/cities`, cityController);
app.use(`${fullApiPath}/countries`, countryController);
app.use(`${fullApiPath}/events`, eventController);
app.use(`${fullApiPath}/modules`, moduleController);
app.use(`${fullApiPath}/permissions`, rolePermissionController);
app.use(`${fullApiPath}/roles`, roleController);
app.use(`${fullApiPath}/sports`, sportController);
app.use(`${fullApiPath}/transactions`, transactionController);
app.use(`${fullApiPath}/user/bets`, userBetController);
app.use(`${fullApiPath}/users`, userController);

export default app;
