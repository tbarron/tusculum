# Python Anywhere Home Page

## Description

I'm using pythonanywhere.com as a low cost (i.e., free) hosting solution
for my personal home page by serving the stuff I'm working on as a flask
app. If I ever figure out a way to monetize something here, I'll start
sending some of the bucks along to pythonanywhere so I can have a premium
account.

This project is based at $HOME/prj/github/tusculum on my personal machine.
In the rest of this file, $ROOT refers to this directory.

### Work Cycle

  1. git checkout master
  2. git checkout -b <branch-name>
  3. git push -u origin <branch-name>
      1) track next steps in DODO (not in git)
      2) ... edit ...
      3) ... test ...
      4) update CHANGELOG.md
      1) git commit
      1) git push
      1) back to step i until ready for a release
  4. git checkout master
  5. [test]
  6. git tag -a <next-release>
  7. git merge <branch-name>
  8. git push
  9. back to step 2 for next feature


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

jslife: Adding a Life game written in javascript.
