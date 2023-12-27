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
import { upload } from "../utils/avatarUpload.js";


const router= Router();

router.get("/",getUsers);
router.get("/:id",getUser);
router.post("/",createUser);
router.post("/avatar",upload.single('avatar'),createUserWithAvatar);
router.put("/avatar/:id",updateAvatar);
router.put("/:id",updateUser);
router.put("/role/:id",changeUsersRole);
router.delete("/delete/:id",deleteUser);
router.put("/:id",softDeleteUser);
router.delete("/avatar/del/:id",deleteAvatar);

export default router;