# Python Anywhere Home Page

## Description

I'm using pythonanywhere.com as a low cost (i.e., free) hosting solution
for a personal home page by serving the stuff I'm working on as a flask
app. If I ever figure out a way to monetize something here, I'll start
sending some of the bucks along to pythonanywhere so I can have a premium
account.

This project is based at $HOME/prj/github/tusculum on my personal machine.
In the rest of this file, $ROOT refers to this directory.

In this project, I want to apply the following three conventions:

  * [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
  * [Semantic Versioning](https://semver.org/), and
  * [Simple Release Cycle](http://tusculum.pythonanywhere.com/techblog/2018-09-14-simple-release-cycle).

Everything in this repository is free and unencumbered software released in
to the public domain. For more information, please visit
<http://unlicense.org>.

### Work Cycle

  (see https://tusculum.pythonanywhere.com/techblog/2018-09-14-simple-release-cycle)
  
  * Create a branch off master with a meaningful name.
  
  * Make changes in the branch to fix the bug, add new functionality, or
    whatever.
    
      * Update tests (if appropriate).
      * Update payload code / content.
      * Update CHANGELOG.md to describe the updates.
      * Update the project version (version.py or wherever).
      
  * Run tests and make sure they pass
  
  * Commit changes in the work branch.
  
  * Tag the final commit in the work branch with the new version.
  
  * Checkout 'master' and merge the work branch.
  
  * Run tests and make sure they pass.
  
  * Push master to origin.

For the tusculum project, after pushing from the local machine to github,
the code must be deployed on pythonanywhere.com. To do this...

  * Login to pythonanywhere as tusculum.
  
  * Open a bash shell
  
  * cd web
  
  * run 'update'


### Files and Directory Layout

    +- DODO                        development planning (not in git)
    |
    +- .env                        autoenv file (not in git)
    |
    +- README.md                   this file
    |
    +- flask_app.py                the root of the flask app
    |
    +- attic/                      old files no longer in use
    |
    +- static/                     static files -- javascript and css
    |  |
    |  +- js/                      javascript files
    |  |   |
    |  |   +- tests-jasmine/       jasmine spec files for tests
    |  |
    |  +- styles/                  css files
    |
    +- templates/                  html files
    |  |
    |  +- tests/                   jasmine.html - test & fixture container
    |
    +- venv                        project virtual environment (not in git)


### autoenv

With [autoenv](https://github.com/kennethreitz/autoenv) installed,
$ROOT/.env gets run when I cd into $ROOT. This allows for setting up my
work environment automagically upon entering the work directory.

### The flask app

[Flask](https://github.com/pallets/flask/) is installed in the project's
virtual environment ($ROOT/venv).

I can fire up a local flask server for testing by running

        $ flask-app

Since I have autoenv installed, I have put an .env file in $ROOT. In there
is the line

        alias flask-app="python flask_app.py"

The code in flask_app.py checks its command line options for the following:

        -d         runs the debugger
        --bg       runs flask_app in the background
        --logging  runs the application with logging set up
        no option  runs the app attached to terminal with no logging

The function generate\_file\_list() creates the list of files I want flask to
watch and reload itself when one of them changes.

### Tests

We're using the jasmine framework for our Javascript unit testing. It is
installed at $HOME/lib/js/jasmine and linked for this project's use at
.../static/js/jasmine.

We run our tests by pointing the browser at url
localhost:5000/tests/<filename> where <filename> is one of 'calendar',
'calorease', or 'wandro'. The file


markdown README.md > templates/README.html


### Branches

master: Currently released code.

degrees: Add calculator for converting degrees to degrees/minutes to
  degrees/minutes/seconds.

speed: Adding a page to convert among speeds expressed using various units:
  miles/hour, feet/second, meters/s, kilometer/hour, furlongs/fortnite.

mouser: Trying to figure out how to make the loaded pages in wandro scroll
  together. The current (undesirable) behavior is that when the current
  page is exhausted and a new page is loaded, scrolling is sensitive to
  where the mouse is relative to the break between the pages and at times
  the previous page scrolls within its frame rather than moving everything
  up. I would prefer to set the frame to be the same length as the page so
  that the frame is not exhausted until the page is.
