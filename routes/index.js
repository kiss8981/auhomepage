const express = require('express');
const router = express.Router();
const settings = require("../settings.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.login("ODE1NDg0NzQ3MTQwMDM4NjY2.YDtFWg.y0shzrv8kLJke9_h9_zrJGIKQYA")

/* GET home page. */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

router.get('/', function(req, res) {
  res.render('../views/index', {
    bot: settings.website,
    member: numberWithCommas(client.users.cache.size),
    guilds: numberWithCommas(client.guilds.cache.size)
  });
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
