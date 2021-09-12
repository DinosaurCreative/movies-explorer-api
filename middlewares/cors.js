const cors = require('cors');

const allowedCors = [
  'https://watchthis.nomoredomains.club',
  'http://watchthis.nomoredomains.club',
];

const corsOptions = {
  origin: allowedCors,
  credentiaals: true,
};

module.exports = cors(corsOptions);
