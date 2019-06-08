const express = require('express');
const router = express.Router();
const io = require('socket.io-client');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res)
{
    res.render('index', { title: 'AidChips' });
});
router.get('/app', function(req, res)
{
    res.download(path.join(__dirname, '../public/app/aidchips.apk'));
});

router.get('/s/*', function(req, res)
{
    let socket = io.connect('https://'+req.get('host'), { forceNew: true });
    let idStr = req.originalUrl.substring(req.originalUrl.lastIndexOf("/")+1, req.originalUrl.length);
    socket.emit('sendingData', idStr, true);

    res.send(true)
});

module.exports = router;
