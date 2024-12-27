import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import playerRouter from './controller/player.routes';
import roundRouter from './controller/round.routes';
import tableRouter from './controller/table.routes';

// import { expressjwt } from 'express-jwt';

const app = express();

dotenv.config();
const port = process.env.APP_PORT || 3000;

const corsOptions = {
    origin: '*', // Allow all origins (be cautious in production)
    methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'], // Allowed HTTP methods
    allowedHeaders: [
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'X-Api-Version',
    ], // Allowed headers
    credentials: true, // Allow credentials
};
 
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.options('*', cors(corsOptions)); // Handle preflight requests globally

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});


// app.use(
//     expressjwt({
//         secret: process.env.JWT_SECRET,
//         algorithms: ['HS256'],
//     }).unless({
//     path: ['/api-docs', /^\/api-docs\/.*/, '/api/users/login', '/api/users/signup','/api/users', '/api/status', '/status'],
//     })
// );

app.use("/players", playerRouter);
app.use("/rounds", roundRouter);
app.use("/tables", tableRouter);


const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chatbox API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts']
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({status: 'application error', message: err.message})
    }
    else{
        res.status(400).json({status: 'application error', message: err.message})
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

export default app