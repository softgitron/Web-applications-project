import mysql.connector
import os

def init():
    if os.environ.get("MYSQL_PASSWORD") == None:
        print("Run init env before running this script.")
        print("source ../../init_env.sh")
        exit(4)

    mydb = mysql.connector.connect(
    host=os.environ.get("MYSQL_HOST"),
    user=os.environ.get("MYSQL_USER"),
    passwd=os.environ.get("MYSQL_PASSWORD"),
    database=os.environ.get("MYSQL_DATABASE"),
    auth_plugin="mysql_native_password"
    )

    return mydb

def empty(mydb):
    mycursor = mydb.cursor()

    # Delete all
    mycursor.execute("DELETE FROM friends;", None)
    mycursor.execute("DELETE FROM logins;", None)
    mycursor.execute("DELETE FROM notifications;", None)
    mycursor.execute("DELETE FROM posts;", None)
    mycursor.execute("DELETE FROM users;", None)

    mydb.commit()