
// ## multipart/form-data.
exports.accept       = require('./upload').accept;

// ## base64.
exports.base64_accept = require('./upload.base64').accept;
exports.base64_acceptHeader = require('./upload.base64').acceptHeader;
exports.base64_cleanup = require('./upload.base64').cleanup;
