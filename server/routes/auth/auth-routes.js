import express from 'express';
import { register ,login ,logout ,authMiddleware} from '../../controllers/auth/auth-controller.js';
const router = express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user  = req.user;
    res.json({
        success:true,
        message:"Authorized",
        user
    });
});
export default router;