var bodyParser = require('body-parser');
var morgan = require('morgan');
var responseTime = require('response-time')

module.exports = (app, rsmq) => {
  app.use(bodyParser.json());
  app.disable('x-powered-by');
  app.enable('trust proxy');
  app.use(morgan('combined'));
  app.use(responseTime());
  app.listen(12345);
}