const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('default', { 
    title: "Hello from Google Cloud",
    greeting: "Hello from Google Cloud",
    banner: "img/logo_cloud_icon.png",
    bannerUrl: "https://cloud.google.com"
  });
});

module.exports = router;