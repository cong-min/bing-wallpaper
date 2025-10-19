/* npx wrangler deploy bing_cloudflare_worker.js --name bing-wallpaper --compatibility-date $(date +%Y-%m-%d) */
addEventListener('fetch', event => {
    event.respondWith((async () => {
        try {
            const data = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US').then(r => r.json());
            const imgpath = data.images[0].url;
            return imgpath ? Response.redirect('https://www.bing.com' + imgpath, 302) : new Response('error', { status: 500 });
        } catch {
            return new Response('error', { status: 500 });
        }
    })());
});
