# SSL/TLS Security Setup Guide

Configure Let's Encrypt certificates to encrypt all data traffic on the FastCure backend.

---

## 1. Nginx Installation
Install Nginx server:
```bash
sudo apt update
sudo apt install -y nginx
```
Verify Nginx is active:
```bash
sudo systemctl status nginx
```

---

## 2. Install Certbot
Install Certbot utilizing `snap`:
```bash
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
```
Link Certbot execution binaries:
```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

---

## 3. Generate Certificates
Configure your reverse proxy site configuration first:
```bash
sudo nano /etc/nginx/sites-available/fastcure
```
*(Paste the configuration schema from Nginx config templates, setting hostnames)*

Enable the site configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/fastcure /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Run Certbot to fetch certificates and auto-insert SSL mapping logic:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 4. Automatic Renewals
Certbot automatically schedules an execution cron job to test and renew certificates before expiry.
Verify the renewal cron script runs successfully:
```bash
sudo certbot renew --dry-run
```
If the test succeeds, Nginx is ready to handle HTTPS sessions.
