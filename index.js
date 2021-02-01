if (typeof window !== "undefined" || process.browser) {
  module.exports = require('./browser');
}
else {
  module.exports = require('./server');
}
