
import * as express from 'express';
import { createCategory, deleteCategory, findOneCategory, findUserCategories, updateCategory } from '../../controllers/categories.controller';
import { userAuth } from '../../middlewares/auth.middleware';
import { validation } from '../../utils/validation';

const router = express.Router();

router.use(userAuth);

router.post('/create',
    validation({
        name: 'required|string',
        messagesIds: 'array'
    }),
    createCategory
);

router.put('/:_id/update',
    validation({
        _id: 'required'
    }, 'params'),
    validation({
        name: 'required|string'
    }),
    updateCategory
);

router.delete('/:_id/delete',
    validation({
        _id: 'required'
    }, 'params'),
    deleteCategory
);

router.get('/:_id',
    validation({
        _id: 'required'
    }, 'params'),
    findOneCategory
);

router.get('/',
    findUserCategories
);

export default router;