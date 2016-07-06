# to build, in web folder do:

* cd /web
* npm install (for the first time)
* grunt

## build variations ##

### to watch your changes ###
* grunt watch

### build the production build with uglify and production configs ###
* grunt production

### mimics the production build using the development configs (used to test uglified build) ###
* grunt mimic:production

### the build for homologation server ###
* grunt build:test


# to start server, in server folder do: #

* npm install (for the first time)
* npm start