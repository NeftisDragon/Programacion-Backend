# Coderhouse
## Programación Backend (32125)

I created this repository to post all the assignments I'm working on for my Backend course.

"clase(number)" refers to each different assignment.

### Known issues:

**1** io.on triggers 2 connections, one for each render.js in /public/scripts (probably due to the renders being on different scripts and both files being called in layout.pug);

**2** emitting products and messages triggers a connection loop, however, the functions work fine client-side;

(Removing all the socket.emit found in io.on(server.js:48) breaks the loops and connection works fine, however, issue **1** persists.)

**3** page refreshes whenever a message is sent through the chat. Yet, the message is stored successfully.