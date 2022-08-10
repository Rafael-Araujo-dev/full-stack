# MERN Stack Application

<details>
<summary>Lighthouse Metrics</summary>

<br/>

Sign In Page

![image](https://user-images.githubusercontent.com/90640158/184000403-56b45a18-87ca-4732-a61e-405d3df9fcb3.png)

Sign Up Page

![image](https://user-images.githubusercontent.com/90640158/183999944-620c2d79-214e-45b7-af06-c11314cac308.png)



</details>

# Environment Configurations

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
