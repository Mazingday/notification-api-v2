# MazingDay Notification API

### Run local

    npm run start

FYI: It will automatically use the .env in the current folder

### Run using docker-compose

    docker-compose --env-file=.env up

### Environment variables

 - `HTTP_BASIC_USER`: User for basic auth used by others api to communicate with notifications API
 - `HTTP_BASIC_PASS`: Password for basic auth used by others api to communicate with notifications API
 - `MONGO_DB_URL`: MongoDB's url
 - `PORT`: Port where the API will listen for requests
 - `URL_API_ID_GENERATION`: API's url used to generated ID
 - `SWAGGER_USER`: username to access swagger (on /docs)
 - `SWAGGER_PASSWORD`: password to access swagger
 - `ONESIGNAL_APPID`: App ID used for OneSignal
 - `ONESIGNAL_APIKEY`: ApiKey of the App used for OneSignal

### API documentation

go to http://localhost:2001/docs (or the url where is hosted the api) to access the swagger with configured credentials in the environment file
