var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {

  var shippingPrice;

  const shippingApiUrl = process.env.SHIPPING_API_URL || 'http://localhost:3001';

  if(req.query.shipTo){
    console.log('fetch shipping price for: ' + req.query.shipTo + '...')
    fetch(shippingApiUrl + '/shippingcost/?state=' + req.query.shipTo)
      .then(res => res.json())
      .then(json => {
          res.render('index', { 
            title: 'Cloud Cookie Shop',
            selectedState: req.query.shipTo,
            shippingPrice: json.shippingPrice
          })
        }
      )
  } else {
    // TODO: D.R.Y. --- use the same template render call whether or not shipTo is defined
    res.render('index', { 
      title: 'Cloud Cookie Shop'
    })
  }
});

module.exports = router;
