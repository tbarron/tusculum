# Python Anywhere Home Page

## Description

I'm using pythonanywhere.com as a low cost (i.e., free) hosting solution
for my personal home page by serving the stuff I'm working on as a flask
app. If I ever figure out a way to monetize something here, I'll start
sending some of the bucks along to pythonanywhere so I can have a premium
account.

This project is based at $HOME/prj/github/tusculum on my personal machine.
In the rest of this file, $ROOT refers to this directory.

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

I have [autoenv](https://github.com/kennethreitz/autoenv) installed for my
account. This allows me to put stuff in $ROOT/.env that will get run when I
cd into $ROOT.

### The flask app

Flask is installed in the project's virtual environment ($ROOT/venv).

I can fire up a local flask server for testing by running

        $ flask-app

Since I have autoenv installed, I have put an .env file in $ROOT. In there
is the line

        alias flask-app="python flask_app.py"

This is how I start up a local flask server for testing. The bottom of
flask_app.py contains the lines

        if __name__ == '__main__':
            flist = generate_file_list()
            print(flist)
            app.run(extra_files=flist)

The function generate\_file\_list() creates the list of files I want flask to
watch and reload itself when one of them changes.

### Directory

### Tests

We're using the jasmine framework for our Javascript unit testing. It is
installed at $HOME/lib/js/jasmine and linked for this project's use at
.../static/js/jasmine.

We run our tests by pointing the browser at url
localhost:5000/tests/<filename> where <filename> is one of 'calendar',
'calorease', or 'wandro'. The file


markdown README.md > templates/README.html
