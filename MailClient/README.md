# HOW TO RUN

:one: Pull app image from the container registry. ex: `docker pull manuelfire/react-email-app:latest`
:two: Pull server image from the container registry. ex: `docker pull manuelfire/react-email-server:latest`

Run node server image as a local deployment. ex: `docker run [] manuelfire/react-email-server`

Run react  app as a local deployment. ex: `docker run [] manuelfire/react-email-app`

# SERVER CONFIG

The server app is utilizing port 4000 over https, its possible the browser wont allow the certificate at the first run to solve this either go to http://{serverdomain}:4000,
this being the localhost on a dev enviroment.

The react app is utilizing the port 3000.








Also i have the project avaible on my private git at https://github.com/manuelfire/FullStackDevTest-master