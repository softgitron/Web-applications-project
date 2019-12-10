#!/bin/bash
# Create new user
# curl -v -d '{"email": "henry@example.com", "password": "Super secret", "nickname": "henz", "visibility": 1}' -H "Content-Type: application/json" --insecure -X POST https://localhost:4040/users/createNewUser
# Test authentication
# curl -v -d '{"email": "henry@example.com", "password": "Super secret"}' -H "Content-Type: application/json" --insecure -X POST https://localhost:4040/users/authenticate
# Test tokens
# curl -v -d '{"email": "henry@example.com"}' -H 'Content-Type: application/json' -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU1LCJpYXQiOjE1NzU1NTkzMjR9.yzvzyZG6qK2ZwQqP4FBHOua1PzU98nhdEtpNfnX4lEM' --insecure -X POST https://localhost:4040/users/createNewUser
# curl -v -d '{"title": "This is a tittle", "text": "Testing text", "visibility": 1}' -H 'Content-Type: application/json' -H 'x-access-token: TOKEN' --insecure -X POST https://localhost:4040/posts/newPost
# Logout
# curl -v -d '{}' -H 'Content-Type: application/json' -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInRpbWVzdGFtcCI6IjE1NzU2MjQzMzc0MzIiLCJpYXQiOjE1NzU2MjQzMzd9.wa4rVRn1dndVF2Rjk9QggGME8eGaT0gkhe9cLlE6zvM' --insecure -X POST https://localhost:4040/users/logout
# Get public posts
# curl -v -d '{}' -H 'Content-Type: application/json' --insecure -X POST https://localhost:4040/posts/getPublicPosts
# Get user public posts
# curl -v -d '{"userId": 1}' -H 'Content-Type: application/json' --insecure -X POST https://localhost:4040/posts/getUserPosts
# Search for users
curl -v -d '{"query": "che"}' -H 'Content-Type: application/json' --insecure -X POST https://localhost:4040/search/fuzzy