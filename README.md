# CHAT-SERVER 

A REAL TIME CLI CHAT APPLICATION 

## TECH STACK & ARCHITECTURE

-NODE.JS (ES6)
-WEBSOCKETS
-MONGODB ATLAS & MONGOOSE
-UPSTASH REDIS CLOUD (PUB/SUB PIPELINE ARCHITECTURE)
-NATIVE NODE.JS CLI INTERFACE

## PROJECT STRUCTURE

```text
├── config/
│   └── db.js            # MongoDB database connection logic
├── models/
│   └── user.js          # MongoDB Message schema layout
├── .env                 # Local variables (HIDDEN/SECRÈT)
├── .gitignore           # Stops Git from uploading sensitive keys
├── server.js            # Main backend application engine
└── cli-client.js        # Executable Terminal Chat Script
```


##  Configuration Setup (For the Server Owner)

### 1. File Safety Blocking
Create a `.gitignore` file in your root folder to guarantee your passwords stay off GitHub:
```text
.env
node_modules/
```

### 2. Secret Variables Configuration (`.env`)
Create a local `.env` file containing your cloud credential parameters:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=rediss://default:your_upstash_token_string@positive-frog-237839.upstash.io:6379
```

---

- SAVE THE cli-client.js FILE AND RUN LOCALLY