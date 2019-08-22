import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ erorr: 'Toekn not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Tornando callback em promise com promisify
    // Se token nao for igual, ira cair no catch
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch(err) {
    return res.status(401).json({ erorr: 'Toekn invalid' });
  }
}