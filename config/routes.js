var scraperjs = require('scraperjs');
var scrapList = require('./models/scrapList.js');
var scrapItem = require('./models/scrapItem.js');

module.exports = function(app) {
    app.get('/', function(req,res) {
        res.sendfile('index.html');
    })
    app.get('/api', function(req, res) {
        // scraperjs.StaticScraper.create(req.body.url)
        // .scrape(function($) {
        //     return $(".title a").map(function() {
        //         return $(this).text();
        //     }).get();
        // })
        // .then(function(news) {
        //     console.log(news);
        //     next();
        // })
        res.send("u have reached scraplite API");
    })
    
    app.post('/api/parseUrl', function(req,res,next) {
        scrapItem.findOne({'url' : req.id}, function(err, scrapItem) {
            if (err) {
                console.log(err);
                return err;
            }
            if (scrapItem) {
                req.body.scrapOption = scrapItem;
            } else {
                req.body.isNew = 1;
            }
            res.send(req.body);
        })
    })
    
}