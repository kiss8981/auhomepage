var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;
const mongoose = require('mongoose');
var router = express.Router();

const { secretKey, DBUrl } = require('../config.json');

var Aupoint = require('../models/pointDB');
var payment = require('../models/paymentsinfoDB');

mongoose
  .connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`[DataBase Pay] ${DBUrl}`))
  .catch((err) => console.log(err));

router.use('/authorize', require('../routes/discord'));

router.get("/", function (req, res) {
  try {
    res.cookie(`unsigned-cookie`, `yes`);
    res.cookie(`signed-cookie`, `yes`, { signed: true });
    res.cookie(`secure-cookie`, `yes`, { secure: true });
    res.cookie(`http-only-cookie`, `yes`, { httpOnly: true });
    res.cookie(`same-site-strict`, `yes`, { sameSite: "strict" });
    res.render("../views/payments/index", {
      title: "구매하기",
      orderId: uuid(),
      customerName: "userid" || null,
      pageTitle: '구매하기', 
      user: req.session.user || null
    });
  } catch (err) {
    console.log("🚀 ~ file: index.js ~ line 27 ~ err", err);
    res.redirect(`/fail`);
  }
});



router.get("/success", function (req, res) {
  got
    .post("https://api.tosspayments.com/v1/payments/" + req.query.paymentKey, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(secretKey + ":").toString("base64"),
          "Content-Type": "application/json",
      },
      json: {
        orderId: req.query.orderId,
        amount: req.query.amount,
      },
    })
    .then(function (confirmResponse) {
      var jsonObj = JSON.parse(confirmResponse.body);
      var payments = new payment();
      payments.totalAmount = jsonObj.totalAmount
      payments.paymentKey = jsonObj.paymentKey;
      payments.orderId = jsonObj.orderId;
      payments.useage = "false";
      payments.save(function(err){
        if(err){
            console.error(err);
            console.log("result: fail");
            return;
        }
        console.log(`result: okay , orderid: ${jsonObj.orderId}`);
      });
      
      res.render("../views/payments/success", {
        title: "구매 완료",
        orderId: jsonObj.orderId,
        amount: jsonObj.totalAmount,
        user: req.session.user || null
      });
    })
    .catch(function (failResponse) {
      res.redirect("/fail");
    });
});

router.get("/fail", function (req, res) {
  res.render("../views/payments/fail", {
    message: req.query.message,
    code: req.query.code,
  });
});

router.get("/replaced", function (req, res) {
  res.send(
    `ok\n${JSON.stringify({
      cookies: req.cookies,
      signedCookies: req.signedCookies,
    })}`
  );
});

router.get("/callback_auth", function (req, res) {
  console.log("🚀 ~ file: index.js ~ line 53 ~ req", req.signedCookies);
  console.log("🚀 ~ file: index.js ~ line 83 ~ req.cookies", req.cookies);

  got
    .post(
      "https://api.tosspayments.com/v1/openpay/authorizations/access-token",
      {
        headers: {
          Authorization:

            // live
            Buffer.from("test_sk_GKNbdOvk5rk5OvwEzw23n07xlzmj" + ":").toString(
              "base64"
            ),
          "Content-Type": "application/json",
        },
        json: {
          customerKey: "hyunseob-15",
          code: req.query.code,
        },
      }
    )
    .then((repsonse) => {
      console.log("repsonse", repsonse.body);
      res.send(200);
    })
    .catch((error) => {
      console.log("🚀 ~ file: index.js ~ line 76 ~ error", error.response.body);
      res
        .status(error.response.statusCode)
        .send(JSON.stringify(error.response.body));
    });
});

module.exports = router;
