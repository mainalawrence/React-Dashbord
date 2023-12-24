import {Router} from 'express';
import { getProduct,createProduct,updateProduct,deleteProduct } from '../controllers/ProductRouter.js';

const router=Router();

router.get('/',getProduct);
router.post('/',createProduct);
router.delete('/',deleteProduct);
router.put('/',updateProduct);

export default router;