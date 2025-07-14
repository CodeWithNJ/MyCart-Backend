import { Router } from 'express';
import { userSignup } from '../controllers/user.controller';

const userRouter = Router();

userRouter.route('/signup').post(userSignup);

export default userRouter;
