#!/bin/python3
import sys
import random
import mysql.connector
import os

import databse_functions

# https://stackoverflow.com/questions/4934806/how-can-i-find-scripts-directory-with-python
PROGRAM_LOCATION = os.path.dirname(os.path.realpath(__file__))
words = []
word_location = 0

try:
    with open(PROGRAM_LOCATION + "/random_words.txt", "r") as file:
        for line in file:
            if (line.strip() == ""):
                continue
            words.append(file.readline().strip())
except IOError:
    print("Can't read words file!")
    exit(2)

def w():
    global word_location
    if (len(words) == word_location):
        print("Too few words!")
        exit(4)
    word = words[word_location]
    word_location += 1
    return word

if (len(sys.argv) != 2):
    print("Using default amount")
    count = 100
else:
    try:
        count = int(sys.argv[1])
    except ValueError:
        print("Argument should be type of integer.")
        exit(1)

mydb = databse_functions.init()
databse_functions.empty(mydb)
mycursor = mydb.cursor()

for i in range(1, count):
    sql = "INSERT INTO users (userId, email, password, nickname, profilePicture, visibility) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (i,
          f"{w()}@email.com",
          w(),
          w(),
          "None",
          1)
    mycursor.execute(sql, val)
    sql = "INSERT INTO posts (postId, userId, title, text, visibility) VALUES (%s, %s, %s, %s, %s)"
    val = (i,
          i,
          f"{w()} {w()} {w()} {w()}",
          f"{w()} {w()} {w()} {w()}",
          1)
    mycursor.execute(sql, val)

# Insert one friendship
sql = "INSERT INTO friends (userId1, userId2, confirmed) VALUES (%s, %s, %s)"
val = (1, 2, True)
mycursor.execute(sql, val)

# Inser private user
sql = "INSERT INTO users (userId, email, password, nickname, profilePicture, visibility) VALUES (%s, %s, %s, %s, %s, %s)"
val = (1001,
    f"{w()}@email.com",
    w(),
    w(),
    "None",
    0)
mycursor.execute(sql, val)

mydb.commit()