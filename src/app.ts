import express from 'express';

const app = express();

app.use(express.json());

// import routes
import apiKeyRouter from './routes/apiKey.route';

app.use('/api/v1/api-key', apiKeyRouter);

export default app;
