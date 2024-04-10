
import express from 'express'
import { adminGetAll, allComplaints, create, deleteComplaint, escalateComplaint, getComplaints, getDepartmentComplaints, reopenComplaint, updateComplaintStatus } from '../controllers/complain.js';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.post('/create',isAuthenticated,create);
router.get('/get',isAuthenticated,getComplaints);
router.delete('/delete/:id',isAuthenticated,deleteComplaint);
router.put('/update/:id',isAuthenticated,authorizeRoles("admin","superadmin"),updateComplaintStatus);
router.put('/escalate/:id',isAuthenticated,authorizeRoles("admin","superadmin"),escalateComplaint);
router.put('/reopen/:id',isAuthenticated,reopenComplaint);
router.get('/getadmin/:category',isAuthenticated,authorizeRoles("admin"),getDepartmentComplaints);
router.get('/getall',isAuthenticated,authorizeRoles('superadmin'),adminGetAll);
router.get('/all',isAuthenticated,authorizeRoles("superadmin"),allComplaints);





export default router;