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
mongod
npm start
```

#### Step 4: Browse
URL: http://localhost:3000/

## Live Demo
https://givelight.herokuapp.com/

## Admin user setup
Admin users have the ability to perform adiminstrative actions such as view the list of all users.
To add an admin user:
1. Connect to the database with a tool such as robomongo https://robomongo.org/
2. Open the 'user' collection
3. Add the 'isAdmin' property to the user you want to promote to adminstrator and set its value to true.

On the next login that user will have admin priviledges.
