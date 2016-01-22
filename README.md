# Welcome Help! Planner

## Webserver requirements

Symfony requires a webserver with PHP and mySQL.
Further dependencies: <http://symfony.com/doc/current/reference/requirements.html>

Run `composer install` to install third party components.

## Frontend build dependencies

(not required in production)

The following dependencies must be installed globally:

1. Node.js and NPM:
    * Windows or OSX: https://nodejs.org/en/download/
    * Linux: https://nodejs.org/en/download/package-manager/
2. bower, gulp and karma via NPM:
    * `npm install -g bower gulp karma`

3. Ruby

4. Sass (via Ruby):
    * `gem install sass`


## Build the frontend

1. Open the `frontend` directory
2. Run `npm install` once to install local NPM dependencies
3. Run `bower install` once to get 3rd party components
4. Run `gulp` to build the frontend assets


## Develop on the frontend

Keep `gulp watch` running in the background. It will watch your source files and rebuild assets when it detects a change.

You might also want to install the [LiveReload browser extensions](http://livereload.com/extensions/) to see changes without having to reload the page.

You can install new bower packages using `bower install {packageName} --save`.
To add JavaScript components to the `vendor.min.js`, add the path to the `vendorScripts` array in Gulpfile.js

To run the unit tests, execute `karma start`.