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


## Adding GraphQL

1. Using npm install graphql and express-graphql([Lee Byron](https://github.com/leebyron) Express app [setup for graphql server](https://github.com/graphql/graphql-js)).
    ```bash
	npm i graphql express-graphql --save
	```

2. Create "graphql" folder and "schema.js" file in it.
    ```bash
	mkdir graphql && cd graphql
	touch schema.js
	```

3. In "schema.js":
    * import basic types needed to create test schema
    ```javascript
    import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
    ```

    * create new schema with single field "test" of string type, resolving static literal
    ```javascript
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'query',
        fields: {
          test: {
            type: GraphQLString,
            resolve: () => 'test'
          }
        }
      })
    });
    ```

    * export schema
    ```javascript
    export default schema;
    ```

4. In "server.js":
    * import express-graphql and schema
    ```javascript
    import graphqlHTTP from 'express-graphql';
    import schema from './graphql/schema';
    ```

    * use express-graphql to process query document on "/graphql" route
    ```javascript
    express()
      .use('/graphql', graphqlHTTP({ schema, graphiql: true }))
      .listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/43ab7e75c261deacebd391ec3a1b989667211f5c)


## Adding query to schema

1. Create "query.js" file in "graphql" folder.
    ```bash
	cd graphql
	touch query.js
	```

2. In "query.js":
    * import necessary
    ```javascript
    import { GraphQLObjectType, GraphQLString } from 'graphql';
    ```

    * create schema with two fields: "participant" and "event" of string type resolving static string for now.
    ```javascript
    const query = new GraphQLObjectType({
      name: 'Query',
      fields: {
        participant: {
          resolve: () => 'participant',
          type: GraphQLString,
        },
        event: {
          resolve: () => 'event',
          type: GraphQLString,
        }
      }
    });
    ```

    * export query
    ```javascript
    export default query;
    ```

3. In "schema.js":
    * reduce imports from graphql and import query
    ```javascript
    import { GraphQLSchema } from 'graphql';
    import query from './query';
    ```

    * change schema definition to use imported query
    ```javascript
    const schema = new GraphQLSchema({ query });
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/d114fc80722a9a25e7fc4563bf02a93738387967)


## Adding types to schema

1. Create "types" folder in "graphql" folder. Then create "EventType.js" and "ParticipantType.js" files in it.
    ```bash
	cd graphql
	mkdir types && cd touch
	touch EventType.js ParticipantType.js
	```

2. In "EventType.js":
    * import necessary GraphQL types and ParticipantType(we will use it to resolve event participants)
    ```javascript
    import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
    import ParticipantType from './ParticipantType';
    ```

    * create new type with 3 fields:
        * "id" of ID type, resolving static literal for now
        * "name" of string type, resolving static literal for now
        * "participants" type of list of ParticipantType, resolving array with empty string for now
    ```javascript
    const EventType = new GraphQLObjectType({
      name: 'event',
      fields: () => ({
        id: {
          type: GraphQLID,
          resolve: () => 'id'
        },
        name: {
          type: GraphQLString,
          resolve: () => 'name'
        },
        participants: {
          type: new GraphQLList(ParticipantType),
          resolve: () => ['']
        }
      })
    });
    ```

    * export EventType
    ```javascript
    export default EventType;
    ```

3. Do the same for "ParticipantType" with fields(import EventType instead of ParticipantType):
    * "id" of ID type, resolving static literal for now
    * "name" of string type, resolving static literal for now
    * "friends" type of list of ParticipantType, resolving array with empty string for now
    * "events" type of list of EventType, resolving array with empty string for now
    ```javascript
    import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
    import EventType from './EventType';

    const ParticipantType = new GraphQLObjectType({
      name: 'participant',
      fields: () => ({
        id: {
          type: GraphQLID,
          resolve: () => 'id'
        },
        name: {
          type: GraphQLString,
          resolve: () => 'name'
        },
        friends: {
          type: new GraphQLList(ParticipantType),
          resolve: () => ['']
        },
        events: {
          type: new GraphQLList(EventType),
          resolve: () => ['']
        }
      })
    });

    export default ParticipantType;
    ```

4. In "query.js":
    * import created types
    ```javascript
    import EventType from './types/EventType';
    import ParticipantType from './types/ParticipantType';
    ```

    * use them in query as fields types
    ```javascript
    const query = new GraphQLObjectType({
      name: 'Query',
      fields: {
        participant: {
          resolve: () => 'participant',
          type: ParticipantType,
        },
        event: {
          resolve: () => 'event',
          type: EventType,
        }
      }
    });
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/67d27b04ba3e4d83684624077ab7b0b035da9e6d)


## Understanding fields resolve method(root and arguments)

1. In "query.js":
    * add arguments to fields(the same for both "participant" and "event")
    ```javascript
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString }
    }
    ```

    * add "root" and "args" arguments to resolve methods and return "args"
    ```javascript
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString }
    }
    ```

2. Next in "EventType.js":
    * add "root" and "args" arguments to resolve methods
    * the "root" argument has value returned from parent in schema
     in this case the "event" field which is returning it's args
     for scalar(primitive) fields return corresponding value from root
     for list return table with root value
    ```javascript
    id: {
      type: GraphQLID,
      resolve: (root) => root.id
    },
    name: {
      type: GraphQLString,
      resolve: (root) => root.name
    },
    participants: {
      type: new GraphQLList(ParticipantType),
      resolve: (root) => [root]
    }
    ```

3. Do the same thing for "ParticipantType".
    ```javascript
    id: {
      type: GraphQLID,
      resolve: (root) => root.id
    },
    name: {
      type: GraphQLString,
      resolve: (root) => root.name
    },
    friends: {
      type: new GraphQLList(ParticipantType),
      resolve: (root) => [root]
    },
    events: {
      type: new GraphQLList(EventType),
      resolve: (root) => [root]
    }
    ```



[commit](https://github.com/G3F4/express-graphql-workshop/commit/2ba8049bab3ccf553ebe5f62ee8cece16c5191cc)