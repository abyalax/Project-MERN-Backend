import { Router } from 'express';
import { getUser } from '../../controller/users/index.js';

const UserRoutes = Router();

UserRoutes.get('/user', getUser);

export default UserRoutes;