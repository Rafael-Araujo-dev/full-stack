# express-app

NPM

```json
    "start": "node backend/src/server.js",
    "server": "nodemon backend/src/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
```

YARN

```json
    "start": "node backend/src/server.js",
    "server": "nodemon backend/src/server.js",
    "client": "yarn --cwd frontend start",
    "dev": "concurrently \"yarn server\" \"yarn client\""
```
