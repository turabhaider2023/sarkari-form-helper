# Sarkari Form Helper

A small website that resizes SSC and Railway (RRB) photos and signatures in the browser. The picture never goes to a server.

Styling uses Tailwind CSS.

## Run it on your computer

```bash
npm install
npm run dev
```

Open the address that Vite prints, usually `http://localhost:5173`.

## Build the site

```bash
npm run build
```

This writes a `dist/` folder of static files. `npm run build` pre-renders every page, so the Hindi heading and guide are already in the HTML.

Check one file:

`dist/ssc-photo-resize/index.html`

## Put it on an Ubuntu server with Nginx

1. On your computer, run `npm run build`.
2. Copy **the files inside** `dist/` to the server, for example `/var/www/sarkari-form-helper`.
3. Install Nginx if it is not there:

```bash
sudo apt update
sudo apt install nginx
```

4. Create `/etc/nginx/sites-available/sarkari-form-helper` with this server block. Change `example.com` to your domain, and change the `root` if you used another folder.

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/sarkari-form-helper;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml application/xml text/xml;

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri/ $uri/index.html /index.html;
        add_header Cache-Control "no-cache";
    }
}
```

5. Turn the site on and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/sarkari-form-helper /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

6. HTTPS with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

There is no Node server in production. Nginx only serves the `dist/` files.

## Before you launch

1. Open `src/config/presets.js` and check every photo and signature size against the **latest official notification**. Where the notice gives centimetres, pixels are that size at 200 DPI. Where it gives pixels (IBPS, SBI, UPSC signature, GATE signature), those pixels are used. NEET, JEE Main, CUET, CMAT, UPSC and UGC NET photos do not fix pixels; the tool uses a 3.5×4.5 cm passport size and says so on the page. GATE photo uses 276×354, inside the official 200×260 to 530×690 window. AFCAT’s signature size was not in the notice, so only the photo is listed.
2. Open `src/config/site.js` and replace `https://sarkari-form-helper.example.com` with your real domain. Then run `npm run build` again. The sitemap and every canonical URL read that one address.
