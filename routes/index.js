const express = require('express');
const router = express.Router();
const settings = require("../settings.json");

/* GET home page. */

router.get('/', function(req, res) {
  res.render('../views/index', { bot: settings.website });
});
router.get('/commands', (req, res) => {
  res.render('../views/commands', {bot: settings.website, commands: settings.commands });
});

router.get("/donate", (req, res) => {
  res.render("../views/donate", {bot: settings.website })
});

router.get("/privacy", (req, res) => {
  res.render("../views/privacy", {bot: settings.website })
});

router.get("/status", (req, res) => {
  res.render("../views/status", {bot: settings.website })
});

router.get('/sitemap.xml', (req, res) => {
  res.sendFile('C:/Users/Administrator/Desktop/homepage/audisocrd/views/sitemap.xml');
});

module.exports = router;
