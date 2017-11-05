## Setup

```
npm install
npm run build

For connecting to a local mongoDB database, install and run `mongod` on the default port 27017: https://www.mongodb.com/download-center#community

For connecting to the production database:
1. In the root of your app folder, create a folder called `config` if it doesn't already exist.
2. Under the `config` folder create a file called secret.json
3. In secret.json, add the mongoDB password

npm start
```
URL: http://localhost:8000/
and http://localhost:8000/users to see the list of users in the database

## Live Demo
https://givelight.herokuapp.com/
