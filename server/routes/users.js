import {Router} from 'express';
import { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    softDeleteUser,
    deleteUser, 
    changeUsersRole,
    createUserWithAvatar,
  updateAvatar,
  deleteAvatar,
} 
from '../controllers/users.js';

const router= Router();

router.get("/",getUsers);
router.get("/;id",getUser);
router.post("/",createUser);
router.post("/avatar/",createUserWithAvatar);
router.put("/avatar/:id",updateAvatar);

router.put("/:id",updateUser);
router.put("/role/:id",changeUsersRole);
router.delete("/:id",deleteUser);
router.delete("/:id",deleteUser);
router.patch("/avatar/del/:id",deleteAvatar);

export default router;