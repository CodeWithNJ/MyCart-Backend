import { Router } from 'express';
import { generateApiKey } from '../controllers/apiKey.controller';

const apiKeyRouter = Router();

apiKeyRouter.route('/generate').post(generateApiKey);

export default apiKeyRouter;
