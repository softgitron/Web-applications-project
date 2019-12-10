openssl req -nodes -new -x509 -keyout server.key -out server.cert
cp server.key ./backend
cp server.cert ./backend