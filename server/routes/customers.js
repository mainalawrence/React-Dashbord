import {Router} from 'express';
import{
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    softDeleteCustomer,
    deleteCustomer,
}
 from '../controllers/customers.js';


const router= Router();

router.get("/",getCustomers);
router.get("/;id",getCustomer);
router.post("/",createCustomer);
router.put("/:id",updateCustomer);
router.delete("/:id",deleteCustomer);
router.put("/del/:id",softDeleteCustomer);

export default router;