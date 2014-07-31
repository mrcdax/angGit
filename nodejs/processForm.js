//process the request and send the response
var http = require('http');
var formidable = require('formidable');
var fs = require('fs.extra');
util = require('util'),

http.createServer(function (req, res) {
    //parse formdata data
    var form = new formidable.IncomingForm();
    form.multiples = true;

    form.parse(req, function (err, fields) {
        console.log(fields.fname);
        //debugger;
        //CORS header because we use different servers for request and response
        res.writeHead(200, { 'Access-Control-Allow-Origin': 'http://127.0.0.1:1337', 'Content-Type': 'text/html' });
        res.write("Welcome <b>" + fields.fname + "</b>");
        res.write("<br />Your age is: <b>" + fields.age + "</b>");
        res.write("<br/> You are : <b>" + fields.func + "</b>");
        res.write("<br/>Are you awesome? <b>" + fields.awesome + "</b>");
        var h1 = fields.hobby1 ? fields.hobby1 : '';
        var h2 = fields.hobby2 ? fields.hobby2 : '';
        res.write("<br/> You like: " + h1 + ' ' + h2 + "</b>");       
        res.end();
        //res.end(util.inspect({ fields: fields, files: files }));
    });
    //TODO: fix the image upload part
    /*form.on('file', function (fields, files) {
        // Temporary location of our uploaded file 
        var temp_path = files.path;
        // The file name of the uploaded file 
        var file_name = files.name;
        // Location where we want to copy the uploaded file 
        var new_location = 'img/';
        var imgPath = new_location + Math.floor((Math.random() * 100) + 1) + '_' + file_name; //add a random number to filename to deal with duplicates

        fs.copy(temp_path, imgPath, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("success!" + new_location + file_name)
            }
        });
        //res.writeHead(200, { 'Access-Control-Allow-Origin': 'http://127.0.0.1:1337', 'Content-Type': 'text/plain' });
        res.write("<br/><img src=" + imgPath + " class='zoomout' width='240'>");
        res.end();
    });*/
}).listen(1338, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1338/');
