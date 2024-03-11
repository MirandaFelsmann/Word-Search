import express from 'express';
import * as ctrl from '../controllers/gameController.js';
import * as auth from '../controllers/authController.js';

const router = express.Router();

router.get('/login', auth.login);
router.post('/login', auth.verifyLogin);
router.get('/register', auth.register);
router.post('/register', auth.verifyRegister);
router.get('/logout', auth.logout);
router.post('/changeRole', auth.changeRole);

router.get('/changePassword', auth.changePassword);
router.post('/updatePassword', auth.updatePassword);


//router.get('/', auth.isAuthenticated, ctrl.createCrossword);
router.get('/', ctrl.createCrossword);



export default router;