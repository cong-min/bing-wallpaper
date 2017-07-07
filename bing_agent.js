var http = require('http');
http.createServer(function(req, response) {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    var tomorrow = new Date();
    tomorrow.setTime(today.getTime()+(24*3600*1000));
    response.writeHead(200, {
        'Expires': tomorrow.toUTCString(),
        'Cache-Control': 'public, max-age=3600',
        'Last-Modified': today.toUTCString(),
        'Content-Type': 'image/jpeg'
    });
    http.get('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', function(bing_res){
        var bing_body = [], bing_data = {};
        bing_res.on('data', function(chunk){
            bing_body.push(chunk);
        });
        bing_res.on('end', function(){
            bing_body = Buffer.concat(bing_body);
            bing_data = JSON.parse(bing_body.toString());
            http.get('http://cn.bing.com' + bing_data.images[0].url, function(img_res){
                var img_body = [];
                img_res.on('data', function(chunk){
                    img_body.push(chunk);
                });
                img_res.on('end', function(){
                    img_body = Buffer.concat(img_body);
                    response.write(img_body, 'binary');
                    response.end();
                });
            });
        });
    });
}).listen(8129);