if (typeof window !== "undefined" || process.browser) {
  module.exports = require('./browser/libs');
}
else {
  module.exports = require('./server');
}