import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ erorr: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Tornando callback em promise com promisify
    // Se token nao for igual, ira cair no catch
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id; // Adicionando o id do user no req se o token estiver correto

    return next();
  } catch(err) {
    return res.status(401).json({ erorr: 'Token invalid' });
  }
}