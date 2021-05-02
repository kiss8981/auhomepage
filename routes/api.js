const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var autojindan = require('../models/autojindanDB');
var warning = require('../models/warningDB');
var Aupoint = require('../models/pointDB');
var payment = require('../models/paymentsinfoDB');
const { DBUrl, login_token } = require('../config.json');

// DB Connect
mongoose
  .connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`[DataBase API] ${DBUrl}`))
  .catch((err) => console.log(err));

// GET users listing.
router.get('/', function(req, res) {
  res.send({error: '필수 정보가 누락 되었습니다'})
});

router.get('/autojindandb/:token', function(req,res){
  var token = req.params.token;
  if (token == login_token) {
    autojindan.find(function(err, autojindan){
        if(err) return res.status(500).send({error: 'database failure'});
        var obj_length = Object.keys(autojindan).length;
        res.status(202).json({'success': '성공','users': obj_length,'info': autojindan});
    })
  } else {
    res.status(202).json({'failed': '실패','token': '토큰 정보 불일치'});
  }
});

router.get('/autojindandb/', function(req,res){
    res.status(202).json({'failed': '실패','token': '토큰 정보를 입력해주세요'});
});

router.get('/warning/:token', function(req,res){
  var token = req.params.token;
  if (token == login_token) {
    warning.find(function(err, warning){
        if(err) return res.status(500).send({error: 'database failure'});
        var obj_length = Object.keys(warning).length;
        res.status(202).json({'success': '성공','DBlength': obj_length,'info': warning});
  })
  } else {
  res.status(202).json({'failed': '실패','token': '토큰 정보 불일치'});
  }
});

router.get('/warning', function(req,res){
  res.status(202).json({'failed': '실패','token': '토큰 정보를 입력해주세요'});
});

router.get('/warning/:guild_id/:token', function(req, res){
  var token = req.params.token;
  if (token == login_token) {
    warning.find({guild_id: req.params.guild_id}, function(err, warning){
        if(err) return res.status(500).json({error: err});
        if(!warning) return res.status(404).json({error: 'Not Found'});
        if(warning == '' || null || undefined || 0 || NaN){
          res.status(404).json({'error': '실패', 'info': '아무 정보를 찾지 못하였습니다'})
        } else {
        var obj_length = Object.keys(warning).length;
        res.status(202).json({'success': '성공','DBlength': obj_length,'info': warning});
        }
    })
  } else {
    res.status(202).json({'failed': '실패','token': '토큰 정보 불일치'});
  }
});

router.get('/warning/:guild_id', function(req,res){
  res.status(202).json({'failed': '실패','token': '토큰 정보를 입력해주세요'});
});

router.post('/point', function(req, res){
  var aupoint = new Aupoint();
  aupoint.userid = ("confirmResponse", req.body.userid);
  aupoint.point = ("confirmResponse", req.body.point);
  aupoint.date = new Date(req.body.date);

  aupoint.save(function(err){
      if(err){
          console.error(err);
          res.json({result: "fail"});
          return;
      }

      res.json({result: "ok"});
  });
});

module.exports = router;
