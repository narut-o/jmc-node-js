import express from "express";
import { getEmployees, getMyProfile, login, logout, register, updateDepartment } from "../controllers/user.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();



router.post('/register',register);
router.post('/login',login);
router.get('/me',isAuthenticated,getMyProfile);
router.get('/logout',logout);
router.get('/employees',isAuthenticated,authorizeRoles("superadmin"),getEmployees);
router.put('/update/department/:id',isAuthenticated,authorizeRoles("superadmin"),updateDepartment)





export default router;