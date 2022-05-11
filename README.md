# HOW TO RUN

:one: Pull app image from the container registry. ex: `docker pull manuelfire/react-email-app:latest`
:two: Pull server image from the container registry. ex: `docker pull manuelfire/react-email-server:latest`

Run node server image as a local deployment. ex: `docker run [] manuelfire/react-email-server`

Run react  app as a local deployment. ex: `docker run [] manuelfire/react-email-app`

# SERVER CONFIG

The server app is utilizing port 4000 over https, its possible the browser wont allow the certificate at the first run to solve this either go to http://{serverdomain}:4000,
this being the localhost on a dev enviroment.

The react app is utilizing the port 3000.

All ports and localhost configurations are updatable in the .env files of each one.

# Libraries used
    All are free GNU and MIT License

   # Frontend 🧑‍💻 :
        React 17,
        Redux and the redux-socket.io-middleware,
        React Bootstrap,
        socket-io-client,
        axios
   # Backend 👨‍💻:
        Node,
        imap,
        yapople, *For POP3 connection only one that actually connected to Gmail and Outlook due to SNI requirements*
        express
        socket-io
        mailparser





Also the project is avaiable on
