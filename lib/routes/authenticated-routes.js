
'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _express = require('express');
const _express2 = _interopRequireDefault(_express);
const router = _express2.default.Router();
const mail = require('../web/mail');
router.post('/sendmsg', (req, res, next) => {
    mail.send(req,res);
});

module.exports = router;
