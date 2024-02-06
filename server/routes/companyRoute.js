import {Router} from 'express';
import {getCompanyDetails,updateCompany,createCompany} from "../controllers/companyInfo.js";


const router= Router();

router.get("/",getCompanyDetails);
router.post("/",createCompany);
router.put("/:id",updateCompany);

export default router;