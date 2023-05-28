# AuthTrainer

This project aims to explore the concept of authentication (and authorization) in web applications using the MERN stack. Various authentication techniques will be explored, with the aim of creating a possibly solid starting point for future projects. In all solutions care will be taken to prevent the main security problems concerning authentication, ie XSS and CSRF attacks.
Here are the techniques that will be covered:

- Standard authentication (username and password) using sessions or jwt tokens.
- Passwordless authentication (email only, with email magic link or code) using jwt tokens.
- Double authentication (email and password, with email magic link or code) using jwt tokens.
- Social authentication (double authentication or Google authentication) using jwt tokens.

## Demo

At [this link](https://authtrainer.malvaphe.com/) there is a demo of "Double authentication". The two-factor authentication is available for up to 50 users per day.

## Before running it locally

Before starting the project, you need to complete the configuration file associated with the authentication technique you are interested in and rename it (deleting the _.example_ substring). The server config file is located in _config/const.example.js_. The client config file is located in _src/const.example.js_ (to be changed only for Social autentication).

### Standard authentication with sessions

Server config:

```javascript
// Session secret
export const sessionSecret = '';
```

### Standard authentication with jwt tokens

Server config:

```javascript
// Jwt secrets
export const secret = '';
export const csrfSecret = '';
```

### Passwordless authentication

Server config:

```javascript
// Admin info
export const email = '';

// Jwt secrets
export const secret = '';
export const csrfSecret = '';

// Email account
export const emailName = 'AuthTrainer';
export const emailUsername = '';
export const emailPassword = '';
export const emailHost = '';
export const emailPort = 465;
export const emailSecure = true;
```

### Double authentication

Server config:

```javascript
// Admin info
export const email = '';
export const password = '';

// Jwt secrets
export const secret = '';
export const csrfSecret = '';

// Email account
export const emailName = 'AuthTrainer';
export const emailUsername = '';
export const emailPassword = '';
export const emailHost = '';
export const emailPort = 465;
export const emailSecure = true;
```

### Social authentication

Server config:

```javascript
// Admin info
export const email = '';
export const password = '';

// Jwt secrets
export const secret = '';
export const csrfSecret = '';

// Email account
export const emailName = 'AuthTrainer';
export const emailUsername = '';
export const emailPassword = '';
export const emailHost = '';
export const emailPort = 465;
export const emailSecure = true;

// Google
export const GOOGLE_OAUTH_CLIENT_ID = '';
export const GOOGLE_OAUTH_CLIENT_SECRET = '';
```

Client config:

```javascript
// Google
export const REACT_APP_GOOGLE_OAUTH_CLIENT_ID = '';
export const REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET = '';
```

Google configuration: [Setting up Google OAuth 2.0](https://console.cloud.google.com/apis/credentials).

## Run locally

Install server and client dependencies:

```bash
npm i
```

Run the server and the client:

```bash
npm run dev
```

To stop the server run:

```bash
npm run end
```

## Go live

To go live you need a service like Nginx to serve the client and server content (enable HTTPS... [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal)). Copy the repository to your server and edit the configuration files (client/.../src/const.js and server/.../config/const.js) following the comments.

Build the client:

```bash
npm run build
```

Run the server:

```bash
npm run prod
```

### Nginx config example

```bash
server {

   if ($host = www.website.com) {
      return 301 https://website.com$request_uri;
   }

   index index.html index.htm index.nginx-debian.html;
   server_name website.com www.website.com;
   root /var/www/website.com/client/socialAuth/dist;

   # react app
   location / {
      try_files $uri /index.html;
   }

   # node server
   location /api/ {
      proxy_pass http://localhost:8080/;
   }
   location /socket.io/ {
      proxy_pass http://localhost:8080;
      proxy_redirect off;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }

}
```
