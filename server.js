var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var app = express();

app.get('/:platform', function (req, res) {
    var platform = "";
    switch (req.params.platform) {
        case 'ps4':
            platform = 'ps4';
            break;
        case 'xbone':
            platform = 'xbox-one';
        case 'switch':
            platform = 'switch';
        case 'pc':
            platform = 'pc';
        default:
            break;
    }
    request({
        method: 'GET',
        url: `https://gematsu.com/c/${platform}`
    }, function (err, response, body) {
        if (err) return console.error(err);
        // Tell Cherrio to load the HTML
        $ = cheerio.load(body);
        let articulos = {
            articles: []
        };
        $('.blog_list_post_style').each(function (index, element) {
            article = $(element).find('#post-title').text()
            articleURL = $(element).find('#post-title>a').attr('href')
            tags = []
            $(this).find('.post-category-color-text').each(function (index, post) {
                tags[index] = $(this).text()
            })
            console.log(tags)
            articulos.articles.push({
                articleURL: articleURL,
                description: article,
                tags: tags
            })

        });

        res.end(JSON.stringify(articulos));
    });
})

app.get('/', function(req, res) {
    res.end("Ruta no valida, introducir la plataforma en la URL. ej: 'http://localhost:8081/ps4'")
})

var server = app.listen(8081, function () {
    var port = server.address().port
    console.log("Example app listening at http://localhost:" + port)
})