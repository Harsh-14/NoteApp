const express = require('express');
const { addnote,getallnotes, deletenotes, updatenotes, findbysubject,findImp_note } = require('../controller/noteControler');
const { requireSignin } = require('../controller/usersControler');
const router = express.Router()


router.post('/addnote',requireSignin,addnote);

router.get('/getallnotes',requireSignin,getallnotes);

router.delete('/remove/:id',requireSignin,deletenotes)

router.put('/update/:id',requireSignin,updatenotes)

router.get('/findbysubject/:subject',requireSignin,findbysubject)

router.get('/imp_note',requireSignin,findImp_note)



module.exports = router