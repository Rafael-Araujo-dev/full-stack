# express-app

.ENV

```sh
    NODE_ENV=development
    PORT=defines_the_port_where_the_app_will_run
    MONGO_URI=replaces_with_your_MongoDB_connection_string_here
```

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
