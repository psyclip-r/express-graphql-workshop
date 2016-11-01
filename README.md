# STEPS

##﻿Initial project set up

1. Create project folder.
2. Initialize npm.
3. Install babel-register with npm saving dependencies(to use es2015+ features).
5. Create the entry file "index.js" in root folder and within:
	* use require to import babel-register(creates hook)
	```javascript
    require('babel-register')({
      "presets": ["es2015"]
    });
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/7e09761f09ad332d4353813bc685756f40a86c3e)


## Create express server

1. Install express.js with npm and save flag.
    ```bash
	npm -i express --save
	```

2. Create "server.js" file in project root folder and within:
	* import express
	```javascript
    import express from 'express';
    ```

	* define port number
	```javascript
    const PORT = 3000;
    ```

	* create express application and start to listening
	```javascript
    express()
        .listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
    ```
3. In "index.js" require server.js:
	```javascript
    require('./server.js');
    ```

5. Add script starting server to package.json.
    ```javascript
    "dev": "node index.js"
    ```

6. Start server.
    ```bash
	npm run dev
	```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/82f17a4a4848574d85852aee709a20f58425a0a9)
