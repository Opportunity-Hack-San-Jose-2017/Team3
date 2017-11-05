## Setup

#### Step 1: Installation
```
npm install
npm run build
```

#### Step 2: Database Setup
**Connecting to a local mongoDB database (recommended)**
For connecting to a local mongoDB database, install and run `mongod` on the default port 27017: https://www.mongodb.com/download-center#community

**Connecting to the production database**
1. In the root of your app folder, create a folder called `config` if it doesn't already exist.
2. Under the `config` folder create a file called secret.json
3. In secret.json, add the mongoDB password

#### Step 3: Launch
```
npm start
```

#### Step 4: Browse
URL: http://localhost:8000/

## Live Demo
https://givelight.herokuapp.com/
