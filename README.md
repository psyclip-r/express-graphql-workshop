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
