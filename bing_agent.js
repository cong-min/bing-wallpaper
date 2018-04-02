const http = require('http');
http.createServer((req, response) => {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const tomorrow = new Date();
    tomorrow.setTime(today.getTime() + (24 * 3600 * 1000));
    response.writeHead(200, {
        'Expires': tomorrow.toUTCString(),
        'Cache-Control': 'public, max-age=3600',
        'Last-Modified': today.toUTCString(),
        'Content-Type': 'image/jpeg'
    });
    http.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', (bing_res) => {
        let bing_body = [], bing_data = {};
        bing_res.on('data', (chunk) => {
            bing_body.push(chunk);
        });
        bing_res.on('end', () => {
            bing_body = Buffer.concat(bing_body);
            bing_data = JSON.parse(bing_body.toString());
            http.get(`https://www.bing.com${bing_data.images[0].url}`, (img_res) => {
                let img_body = [];
                img_res.on('data', (chunk) => {
                    img_body.push(chunk);
                });
                img_res.on('end', () => {
                    img_body = Buffer.concat(img_body);
                    response.write(img_body, 'binary');
                    response.end();
                });
            });
        });
    });
}).listen(8129);
