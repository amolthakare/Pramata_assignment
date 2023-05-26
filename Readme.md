# Chat Application #

## User Server ##
### go inside the backend folder and run the command `npm start` to start the server for login and sign ###

### register `http://localhost:5500/user/register` ###
- once regiser you will receive an opt on mail
- and now we need to verify that otp

### verify `http://localhost:5500/user/verify` ###
- here enter the received otp on mail

### login `http://localhost:5500/user/login` ###
- once the otp is verified then `login  successful`
- if now user `register`
- if registered but otp not verified `you are not verified please register again`


## Chat Server ##
### go inside the chatserver folder and run the command `npm run server` to start the server ###
- once the server is started then you chat in the application
**Features**
- can see the total users joined
- once any user join he will receive that message `welcome to chat server` and other will receive `xyz has joined the chat`;
- can leave the room
- can chat with users in that room

**working**
- go to the `index.html` to join a room
- after selecting the room you will move to the `chat.html` page where you can chat.



