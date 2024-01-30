import {Router} from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    softDeleteProduct,
    deleteProduct,
 } from '../controllers/ProductController.js';

const router=Router();

router.get('/',getProducts);
router.get('/:id',getProduct);
router.post('/',createProduct);
router.delete('/',deleteProduct);
router.put('/',softDeleteProduct);
router.put('/:uid',updateProduct);

export default router;