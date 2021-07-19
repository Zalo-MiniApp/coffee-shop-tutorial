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


## Client-side examples:
Client-side examples are contained in the **`examples/`** folder:
* **`ads`**: Shows how to display Rewarded Videos and Interstitial Ads
* **`bots`**: Shows how to send data from the game client to a bot and vice-versa
* **`cross-promo`**: Shows how to prompt the player to switch to another one of your Instant Games
* **`hello-world`**: An empty project with the boilerplate in place to get you up and running quickly
* **`in-app-purchases`**: Shows how to use payments inside of your Instant Game
* **`leaderboards`**: Shows how to use leaderboards (global and context-specific) in your Instant Game
* **`secure-backend`**: Shows how to validate data in your backend to make sure they are authentically coming from your Instant Game, to prevent cheating
* **`sending-messages`**: Shows how to show messages from your game to the current context (conversation)
* **`shortcuts`**: Shows how to create a mobile home shortcut to the game

### Running Client-Side examples:

In order to run these examples you will need to use one of these tasks:
* **`run-mock`**: Runs on localhost against a mocked version of the SDK
* **`mock`**: It is the same as **`run-mock`**. Runs on localhost against a mocked version of the SDK
* **`run-dist`**: Runs on localhost against the production SDK
* **`dist`**: It is the same as **`run-dist`**. Runs on localhost against the production SDK
* **`upload`**: Package and upload your game in order to test on mobile

Below are some examples of how to execute these tasks:

```bash
$ yarn run-mock --project hello-world
```
Will run the **`hello-world`** project from localhost against a mocked version of the SDK (returns dummy data for every call). This way of running projects is especially useful for quickly iterating on local changes done to any of the projects.

```bash
$ yarn run-dist --project sending-messages
```
This will run the **`sending-messages`** project with HTTPS from localhost and embed it into [our embedded player](https://developers.facebook.com/docs/games/instant-games/test-publish-share) which allows you to connect to the latest version of the SDK. All data returned from the SDK will be authentic an updated. In order to use this option, you need to correctly set the `FB_appId` property on `config.json`.  If the app shows stuck in 0% loading, make sure to visit `https://localhost:8000` and follow the instructions on your browser trust the development certificates.

```bash
$ yarn upload --project ads
```
This will package and upload the **`ads`** example to Web Hosting. After that you can set the game to production mode in order to test it from the uploaded build - and not localhost. This option is especially useful since it allows you to test on mobile devices ([More information here](https://developers.facebook.com/docs/games/instant-games/test-publish-share))

## Server-side examples
Server-side examples are contained in the **`servers-examples/`** folder:
* **`nodejs-backend`**: It's a working backend for the `secure-backend` client demo, that shows how to perform server-side validations for client-signed calls from Instant Games.
* **`nodejs-bot`**: It's a working backend for the `bots` client demo, that shows how to send and receive structured data from a game client.

### Running server-side examples
Before running any of the server side examples, make sure to copy or rename the `template.env` into `.env` and provide the necessary information.


You can run any of the server-side examples above by running the following commands on terminal:
```
$ cd /server-examples/nodejs-backend
$ yarn install
 yarn install v1.7.0
 [1/4] Resolving packages...
 [2/4] Fetching packages...
 [3/4] Linking dependencies...
 [4/4] Building fresh packages...
 Done in 6.86s.
$ node index
 Node app is running on port 5000
```
From that moment on, your server-side code is running on `http://localhost:5000`. By changing the client-side code to point to that endpoint, you can test the full end-to-end flow locally.

Alternatively, you can host your backend code in a service such as [Glitch](https://glitch.com/) or [Heroku](https://www.heroku.com/)
> Note: for the **`nodejs-bot`** server-side demo, you will need to host your backend in an external server.([More information here](https://developers.facebook.com/docs/games/instant-games/getting-started/bot-setup))


## License

Copyright (c) Facebook, Inc. and its affiliates. All rights reserved.

The examples provided by Facebook are for non-commercial testing and evaluation
purposes only. Facebook reserves all rights not expressly granted.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
