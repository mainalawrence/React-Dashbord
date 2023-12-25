import {Router} from 'express';
import { 
    changeUsersRole, createUsers, deleteUsers, 
    getUser, getUsers, softDeleteUsers, updateUsers } 
from '../controllers/users';

const router= Router();

router.get("/",getUsers);
router.get("/;id",getUser);
router.post("/",createUsers);
router.put("/:id",updateUsers);
router.put("/role/:id",changeUsersRole);
router.delete("/:id",deleteUsers);
router.put("/del/:id",softDeleteUsers);

export default router;