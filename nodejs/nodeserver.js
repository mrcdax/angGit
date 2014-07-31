//simple webserver
var http = require('http');
var formidable = require('formidable');

var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
        //serve  html,js,css files
        var filePath = '.' + req.url;
        if (filePath == './') {
            filePath = './index.html';
        }
        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }
        fs.exists(filePath, function (exists) {
            if (exists) {
                fs.readFile(filePath, function (error, content) {
                    if (error) {
                        res.writeHead(500);
                        res.end();
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content, 'utf-8');
                    }
                });
            }
            else {
                res.writeHead(404);
                res.end();
            }
        });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');