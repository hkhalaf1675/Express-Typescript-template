import * as express from 'express';
import { validation } from '../../utils/validation';
import { login, register } from '../../controllers/auth.controller';

const router = express.Router();

router.post('/register',
    validation({
        name: 'required',
        email: 'required|email',
        password: 'required'
    }),
    register
);

router.post('/login',
    validation({
        email: 'required|email',
        password: 'required'
    }),
    login
);

export default router;