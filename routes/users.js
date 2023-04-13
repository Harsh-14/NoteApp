const express = require('express');
const { signup,signin, requireSignin,emailSend, changePassword,verifyUser,deleteAcc } = require('../controller/usersControler');

const router = express.Router()


router.post("/signup",signup);

router.post("/signin",signin)

router.post("/email-send",emailSend)

router.post("/changePassword",changePassword)

// router.get("/confirm/:confirmationCode", verifyUser)
router.get("/confirm/:confirmationCode",verifyUser)

router.delete('/deleteUser/:id',requireSignin,deleteAcc)



router.get('/profile',requireSignin,async (req,res) => {
    res.status(200).json({message:"profile"})
})


module.exports = router;
