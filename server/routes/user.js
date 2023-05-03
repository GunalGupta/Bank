const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const userController = require('../controllers/userController');



router.get('/', userController.view);


router.get('/login', userController.loginpage);
router.post('/login', userController.login);
router.get('/dashboard', userController.dashboardpage);
router.post('/register', userController.register);
router.get('/loans', userController.loanspage);
router.get('/cards', userController.cardspage);
router.get('/profile', userController.profilepage);
router.get('/subscriptions', userController.subscriptionspage);
router.get('/support', userController.supportpage);
router.get('/transaction', userController.transactionspage);
// router.post('/admin', userController.viewallusers);
router.get('/editprofile', userController.editpage);

router.post('/adduser', userController.create);
router.post('/editprofile', userController.update);

// router.post('/profile', userController.profilepagenew);

// *******************************************************************

router.get('/adminlogin', userController.adminloginpage);
router.post('/adminlogin', userController.adminlogin);
router.get('/admin', userController.adminpage);
router.post('/adminedituser/:username', userController.adminedit);
router.get('/editalluser/:username', userController.adminedituser);
// router.get('/edituser/:id', userController.edit);


module.exports = router;