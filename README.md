_ARCHITEKT
===============

Express, Sequelize, HTML5, Sass, Gulp, Pug, stored on PostgreSQL

---

Architekt is a gallery for all your photos. To start Architekt, git clone our repository to your local computer.

---

###Run Architekt on your computer

In your command line within the repository you cloned:
- `npm install` to install all dependencies for the project
- `psql` to enter Postgres
- your username is on the left side of '=#'
- `CREATE DATABASE express_gallery;` to initialize your database
- `\c express_gallery` to enter into your database
- in another terminal pane, run the command `touch config/config.json`
- in the config directory, open the config_example.json file and copy all into the newly created config.json file.
- In config.json, enter your username for your database under the development section.
- in another terminal pane, run the command `sequelize db:migrate`
- `gulp` to begin the server, it will automatically open your browser.


