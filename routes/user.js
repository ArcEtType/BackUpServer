import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
  logout,

} from "../controllers/users.js";
//import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* AUTH */

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

/* READ */

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put("/:id", updateUser);
router.delete('/:id', deleteUser);


export default router;