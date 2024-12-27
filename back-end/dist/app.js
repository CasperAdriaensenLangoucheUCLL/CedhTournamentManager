"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const player_routes_1 = __importDefault(require("./controller/player.routes"));
const round_routes_1 = __importDefault(require("./controller/round.routes"));
const table_routes_1 = __importDefault(require("./controller/table.routes"));
// import { expressjwt } from 'express-jwt';
const app = (0, express_1.default)();
dotenv.config();
const port = process.env.APP_PORT || 3000;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
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
    ],
    credentials: true, // Allow credentials
};
app.use((0, cors_1.default)(corsOptions));
app.use(bodyParser.json());
app.options('*', (0, cors_1.default)(corsOptions)); // Handle preflight requests globally
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
app.use("/players", player_routes_1.default);
app.use("/rounds", round_routes_1.default);
app.use("/tables", table_routes_1.default);
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOpts);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'application error', message: err.message });
    }
    else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});
app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
