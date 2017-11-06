## Setup

#### Step 1: Installation
```
npm install
npm run build
```
#### Step 2: Project configuration
**Fill in required config data**
 - `config/example.*` remove `example.`
 - Fill out required data

#### Step 3: Database Setup
**Connecting to a local mongoDB database (recommended)**
 - Create directory in system root `/data/db`
 - For connecting to a local mongoDB database, install and run `mongod` on the default port 27017 at project root: https://www.mongodb.com/download-center#community

**Connecting to the production database**
 - In the root of your app folder, create a folder called `config` if it doesn't already exist.
 - Under the `config` folder create a file called secret.json
 - In secret.json, add the mongoDB password as `mongo_db_password`

#### Step 3: Launch
```
npm start
```

#### Step 4: Browse
URL: http://localhost:3000/

## Live Demo
https://givelight.herokuapp.com/
