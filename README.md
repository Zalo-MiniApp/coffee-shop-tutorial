# Mini App For Coffee Shop

This repository contains sample code that helps you build a Mini App run on Zalo.

The repository contains 2 section:
- `client`: Coffee Shop front-end, created by using the `zmp-cli`. Miniapp client can be written in any library and frameworks, we recommend using React.JS to get the most out of our ZaUI. Documentation on how to create a new zmp client here: (https://miniapp.zalo.me/docs/docs/getting-started/#tạo-mới-dự-án-sử-dụng-zmp-framework)
- `server-api`: Coffee Shop back-end, created using Node, Express and MongoDB. There is no limit on which programing languagues and server-side framework you can use.

## Pre-requisites

1. [Install Node JS](https://nodejs.org/en/download/)
1. [Install Mini App DevTools CLI](https://miniapp.zalo.me/docs/dev-tools)
1. Download or clone this repository

## Setup
![Demo](./demo.gif "How to run the project")

### Client
1. Move to your client subfolder:
	```bash
	cd client
	```
1. Install dependencies
	```bash
	npm install
	```
1. Open `.env.development` and `.env.production` to setup environments (OA ID for the Follow/Message button, API base for fetching products, orders,...)

1. Start client using zmp-cli
	```bash
	zmp start

1. Open `localhost:3000` on your browser and start coding 🔥

### Server API
1. Move to your backend subfolder:
	```bash
	cd server-api
	```
1. Install dependencies
	```bash
	npm install
	```
1. Create a new file `.env` and put these configurations:
	```bash
	PORT=5000
	MONGODB_URL=mongodb+srv://YOUR_MONGODB_CONNECTION_STRING
	OA_TOKEN=YOUR_OA_TOKEN_STRING
	```

	- You can change the PORT to anything you want, however remember to sync the `VITE_BASE_URL` in `client/.env.development` to match the PORT that you choose.

	- MONGODB_URL is required to connect to your MongoDB server.
	
	- OA_TOKEN is required to send message to your customer after they settled an order. How to get an OA_TOKEN here: (https://developers.zalo.me/docs/api/official-account-api/phu-luc/official-account-access-token-post-4307)

1. Start server using npm script
	```bash
	npm start
	```

## Deployment

### Client
1. Move to your client subfolder:
	```bash
	cd client
	```
1. Deploy using zmp-cli (https://miniapp.zalo.me/docs/dev-tools/cli/commands/deploy), this will generate a QR code that can be scanned and opened inside Zalo
	```bash
	zmp deploy
	```

Remember to update VITE_BASE_URL in `client/.env.production` to point to your server API address, since you won't be able to call localhost API.

### Server API

The source code in this example can be hosted anywhere. Here is an instruction on how to deploy it to [Heroku](https://www.heroku.com/)

> Note: In order to test your application on Zalo by scanning QR code, you will need to host your backend in an external server.

1. Move to your backend subfolder:
	```bash
	cd server-api
	```
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and login
	```bash
	heroku login
	```
1. Init a git repository inside your backend source code, add Heroku as a remote
	```bash
	git init
	heroku git:remote -a zmp-coffee-shop
	```
1. Commit your code to the repository and deploy it to Heroku using Git.
	```bash
	git add .
	git commit -am "deployment with heroku is fun"
	git push heroku master
	```

Open your browser and visit your hosted backend at Herokuapp (https://app-name.herokuapp.com)

## Usage:

### Client

Client-side example are contained in the **`client/`** folder:
* **`src`**: Contain all logic source code of your Mini App. Insdie `src` folder:

	* **`components`**: reuseable components written in React.JS
	* **`css`**: Stylesheets, pre-processors also supported
	* **`pages`**: a Page is also a component but will act as an entire view and must be registered inside `app-config.json` (https://miniapp.zalo.me/docs/framework/getting-started/app-config#pages)
	* **`services`**: reuseable logic for complex tasks that should be separated from your component, such as fetching API, get access token from Zalo or caching stuff,...
	* **`static`**: contain binary assets of your Mini App, such as icon, background, etc,...
* **`.env.*`**: Environment variables, zmp is using Vite build tools, read more about Vite env here (https://vitejs.dev/guide/env-and-mode.html#env-variables)
	* **`.env.development`**: Loaded when running project locally with `zmp start`.
	
		> If you're using `getAccessToken` API from zmp (https://miniapp.zalo.me/docs/api/getAccessToken) when running on browser, zmp will always return "DEFAULT ACCESS TOKEN" because there is no logged in Zalo user. Specify a `VITE_DEFAULT_ACCESS_TOKEN` to mock a real Zalo user for development purpose.

	* **`.env.production`**: Loaded when deploy project to Zalo with `zmp deploy`
	* **`app-config.json`**: Global configuration for your Mini App (https://miniapp.zalo.me/docs/framework/getting-started/app-config)

	Most of the time you won't need to touch these other files. `src` will be the busiest section of your development process.

### Server API

Server-side example are contained in the **`server-api/`** folder:

* **`models`**: Mongoose Model, which helps you persist and read data via MongoDB
* **`routes`**: mountable route handlers, you can call it Controllers if you cosidering MVC pattern
* **`services`**: a Page is also a component but will act as an entire view and must be registered inside `app-config.json` (https://miniapp.zalo.me/docs/framework/getting-started/app-config#pages)
* **`services`**: reuseable logic for complex tasks that should be separated from your routes, such as token handling and fetching Zalo OA API,..
* **`app.js`**: your server entry point, which connects all pieces of your backend together. This is where you register new routes or middlewares, handling CORS stuff,...
* **`config.js`**: your server configuration. Most of the time you will read configuration from environments variable (such as creating a `.env` on your local machine or `heroku config:set` on your hosting services). Here are the required configs:
	* **`MONGODB_URL`**: Connection string to your MongoDB database
	* **`ZALO_APP_ID`**: if you don't already have an APP ID, go to Zalo Developers to register one and put it here
	* **`ZALO_APP_ID`**: ID of your Mini App
	* **`OA_TOKEN`**: you will need this token to send Zalo messages to your customer after they finish a checkout to confirm their orders

## License

Copyright (c) Zalo Group. and its affiliates. All rights reserved.

The examples provided by Zalo Group are for non-commercial testing and evaluation
purposes only. Zalo Group reserves all rights not expressly granted.
