var express = require('express');
var router = express.Router();

const shippingPrices = {
  'AL': 3.95,
  'AK': 9.45,
  'AS': 3.95,
  'AZ': 4.95,
  'AR': 3.95,
  'CA': 5.95,
  'CO': 4.95,
  'CT': 3.95,
  'DE': 3.95,
  'DC': 3.95,
  'FM': 3.95,
  'FL': 3.95,
  'GA': 3.95,
  'GU': 9.45,
  'HI': 9.45,
  'ID': 4.95,
  'IL': 4.95,
  'IN': 4.95,
  'IA': 4.95,
  'KS': 4.95,
  'KY': 4.95,
  'LA': 4.95,
  'ME': 3.95,
  'MH': 3.95,
  'MD': 3.95,
  'MA': 3.95,
  'MI': 4.95,
  'MN': 4.95,
  'MS': 3.95,
  'MO': 4.95,
  'MT': 4.95,
  'NE': 4.95,
  'NV': 4.95,
  'NH': 3.95,
  'NJ': 3.95,
  'NM': 4.95,
  'NY': 3.95,
  'NC': 3.95,
  'ND': 4.95,
  'MP': 3.95,
  'OH': 4.95,
  'OK': 4.95,
  'OR': 5.95,
  'PW': 3.95,
  'PA': 4.95,
  'PR': 9.45,
  'RI': 3.95,
  'SC': 3.95,
  'SD': 4.95,
  'TN': 4.95,
  'TX': 4.95,
  'UT': 4.95,
  'VT': 3.95,
  'VI': 3.95,
  'VA': 3.95,
  'WA': 5.95,
  'WV': 4.95,
  'WI': 4.95,
  'WY': 4.95,
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  const shippingPrice = {
    'shippingPrice': shippingPrices[req.query.state]
  }
  res.json(shippingPrice);
});

module.exports = router;