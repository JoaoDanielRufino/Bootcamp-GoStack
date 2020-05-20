import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionRouter;