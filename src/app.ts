import express from 'express';

const app = express();

app.use(express.json());

// import routes
import apiKeyRouter from './routes/apiKey.route';
import userRouter from './routes/user.route';

app.use('/api/v1/api-key', apiKeyRouter);
app.use('/api/v1/users', userRouter);

export default app;
