define({ "api": [
  {
    "type": "post",
    "url": "/posts/getPublicPosts",
    "title": "Get at most 100 public posts from random users",
    "version": "1.0.0",
    "name": "getPublicPosts",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..",
            "optional": true,
            "field": "afterId",
            "description": "<p>Get posts after specific id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..100",
            "optional": true,
            "field": "postCount",
            "description": "<p>How many posts there should be</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  lastId: 52\n  posts: [{timestamp: 2019-12-06T09:37:36.000Z,\n           postId: 51,\n           userId: 1,\n           nickname: \"Mike\",\n           title: \"Hello world\",\n           text: \"This is my first post\",\n           image: undefined},\n          {timestamp: 2019-11-06T09:37:36.000Z,\n           postId: 100,\n           userId: 2,\n           nickname: \"Johanna\"\n           title: \"Hello world 1\",\n           text: \"This is my second post\",\n           image: undefined}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          }
        ]
      }
    },
    "filename": "backend/routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/posts/getUserPosts",
    "title": "Get at most 100 posts from specific user",
    "version": "1.0.0",
    "name": "getUserPosts",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "x-access-token",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Numbger",
            "size": "0..",
            "optional": false,
            "field": "userId",
            "description": "<p>Personal id of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..",
            "optional": true,
            "field": "afterId",
            "description": "<p>Get posts after specific id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..100",
            "optional": true,
            "field": "postCount",
            "description": "<p>How many posts there should be</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>You don't have access to this user page</p>"
          }
        ]
      }
    },
    "filename": "backend/routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/posts/newPost",
    "title": "Creates new post",
    "version": "1.0.0",
    "name": "newPost",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "x-access-token",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "5..60",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the post</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "0..320",
            "optional": true,
            "field": "text",
            "description": "<p>User post itself.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": true,
            "field": "image",
            "description": "<p>Image UUID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": false,
            "field": "visibility",
            "description": "<p>visibility value, 0 for private and 1 for public.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  results: \"New post ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Expired",
            "description": "<p>Token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoTitle",
            "description": "<p>Tittle missing</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  errors: 'Token has expired'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/routes/posts.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/search/fuzzy",
    "title": "Search for a public posts or user with a string",
    "version": "1.0.0",
    "name": "fuzzy",
    "group": "Search",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "x-access-token",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..",
            "optional": true,
            "field": "postAfterId",
            "description": "<p>Get posts after specific id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..",
            "optional": true,
            "field": "userAfterId",
            "description": "<p>Get posts after specific id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..100",
            "optional": true,
            "field": "resultsCount",
            "description": "<p>How many results there should be (same amount for users and posts)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..160",
            "optional": false,
            "field": "query",
            "description": "<p>Free form search query</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"lastUserId\":32,\n  \"lastPostId\":47,\n  \"users\":[\n     {\n        \"userId\":81,\n        \"nickname\":\"dynamic\",\n        \"profilePicture\":\"None\",\n        \"visibility\":1\n     },\n     {\n        \"userId\":63,\n        \"nickname\":\"cheque\",\n        \"profilePicture\":\"None\",\n        \"visibility\":1\n     },\n     {\n        \"userId\":32,\n        \"nickname\":\"sell\",\n        \"profilePicture\":\"None\",\n        \"visibility\":1\n     }\n  ],\n  \"posts\":[\n     {\n        \"postId\":89,\n        \"userId\":89,\n        \"nickname\":\"plaintiff\",\n        \"timestamp\":\"2019-12-06T16:21:25.000Z\",\n        \"title\":\"preparation orchestra fashion state\",\n        \"text\":\"hierarchy shadow satisfaction emergency\",\n        \"image\":null\n     },\n     {\n        \"postId\":73,\n        \"userId\":73,\n        \"nickname\":\"anger\",\n        \"timestamp\":\"2019-12-06T16:21:25.000Z\",\n        \"title\":\"freighter begin viable pluck\",\n        \"text\":\"charity voucher brick effective\",\n        \"image\":null\n     },\n     {\n        \"postId\":47,\n        \"userId\":47,\n        \"nickname\":\"earthflax\",\n        \"timestamp\":\"2019-12-06T16:21:25.000Z\",\n        \"title\":\"prisoner soar teacher have\",\n        \"text\":\"material strikebreaker pest mayor\",\n        \"image\":null\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          }
        ]
      }
    },
    "filename": "backend/routes/search.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "/users/authenticate",
    "title": "Authenticates with email address and password",
    "version": "1.0.0",
    "name": "authenticate",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "5..100",
            "optional": false,
            "field": "email",
            "description": "<p>User email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "4..72",
            "optional": false,
            "field": "password",
            "description": "<p>User personal password.</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  x-access-token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTU3NTU3MDA0NX0.12Mc9OoqYj3Lt3ATFvo_SK825_MC_2hM40YcpDipMKs\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userId\": 100,\n  \"email\": \"example@mail.com\",\n  \"password\": \"Hello world\",\n  \"nickname\": \"John\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailIncorrect",
            "description": "<p>Unknown email address</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordIncorrect",
            "description": "<p>Password was incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n  errors: \"Password is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/createNewUser",
    "title": "Creates new user",
    "version": "1.0.0",
    "name": "createNewUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "5..100",
            "optional": false,
            "field": "email",
            "description": "<p>User email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "4..72",
            "optional": false,
            "field": "password",
            "description": "<p>User personal password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "4..20",
            "optional": false,
            "field": "nickname",
            "description": "<p>User preferred Nickname.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": false,
            "field": "visibility",
            "description": "<p>visibility value, 0 for private and 1 for public.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userId\": 100,\n  \"email\": \"example@mail.com\",\n  \"password\": \"Hello world\",\n  \"nickname\": \"John\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SameNickname",
            "description": "<p>Nickname allready exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SameEmail",
            "description": "<p>Email allready exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n  errors: 'Email allready exists'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/lougout",
    "title": "Revokes user token from authentication table",
    "version": "1.0.0",
    "name": "logout",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  x-access-token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTU3NTU3MDA0NX0.12Mc9OoqYj3Lt3ATFvo_SK825_MC_2hM40YcpDipMKs\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  results: \"Logout ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectToken",
            "description": "<p>Token was not found from the database</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>No valid token.</p>"
          }
        ]
      }
    },
    "filename": "backend/routes/users.js",
    "groupTitle": "User"
  }
] });
