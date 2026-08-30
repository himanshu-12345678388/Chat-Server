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

- SAVE THE cli-client.js FILE AND RUN LOCALLY