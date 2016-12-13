_ARCHITEKT
===============

Express, Sequelize, HTML5, Sass, Gulp, Pug, stored on PostgreSQL and Redis

---

Architekt is a gallery for all your photos. To start Architekt, git clone our repository to your local computer.

---

###Run Architekt on your computer

In your command line within the repository you cloned:
- `npm install` to install all dependencies for the project
- `psql` to enter Postgres
- your username is on the left side of '=#' *keep note of this username for creating your config.json file
- `CREATE DATABASE express_gallery;` to initialize your database
- `\c express_gallery` to enter into your database
- in another terminal pane, run the command `touch config/config.json`
- in the config directory, open the config_example.json file and copy all into the newly created config.json file.
- In config.json, enter your username for your database under the development section. *this is the username that we mentioned earlier
- in another terminal pane, run the command `sequelize init`
- then run the command `sequlize db:migrate`
- `gulp` to begin the server, it will automatically open your browser and begin the Redis server.

###Optional

If you would like an auto populated gallery with users:
- run the command `sequelize db:seed:all` in your terminal
- two users will be created:
- `username: joejoebinks` with `password: tacocat`
- `username: braddahrayray` with `password:ilovepugs`
- joejoebinks is the owner of all photos except finding nemo

###Using Architekt

Users are directed to our login page upon browser start. If you did not perform the optional section above, there are no photos or users in the databases yet. So you can first create a user by clicking on create new user at the bottom of the login page. Once created you will be redirected to the login page and you must login. Then you will see a new button on the navigation bar that will enable you to add a photo to the gallery. If you are viewing the app on your phone, you can click the 3 bar icon under the title to access the navigation bar. Once again, click on new to add a photo to the gallery.
