var controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.transaction.index);
  app.post('/registerMerchant', controllers.transaction.registerMerchant);
  app.post('/registerUser', controllers.transaction.registerUser);
  app.post('/generateQR', controllers.transaction.generateQR);
  app.get('/getMerchant', controllers.transaction.possibleMerchants);
  app.post('/sendcryptotoMerchant', controllers.transaction.sendcryptotoMerchant);
  app.post('/sendcryptotoCashguy', controllers.transaction.sendcryptotoCashguy);
  app.all('/report-violation', (req, res) => {
    res.json({
      "success": 1
    });
    res.end();
  });
};