import {Router} from 'express';
import { createCustomers, deleteCustomers, getCustomer, getCustomers, softDeleteCustomers, updateCustomers } from '../controllers/customers';


const router= Router();

router.get("/",getCustomers);
router.get("/;id",getCustomer);
router.post("/",createCustomers);
router.put("/:id",updateCustomers);
router.delete("/:id",deleteCustomers);
router.put("/del/:id",softDeleteCustomers);

export default router;