from flask import Flask
from flask import render_template
from flask import request
from flask import Markup

import glob
import logging
import markdown
import pdb
import subprocess
import sys

app = Flask(__name__)


# -----------------------------------------------------------------------------
def main(args):
    """
    Here's where everything starts. We know about the following arguments:

     -d        run the debugger
     --bg      start a detached process with the --logging argument
     --logging set up logging to flask.log and run the app

    With no command line option, we run the app attached to the terminal.
    """
    if '-d' in args:
        pdb.set_trace()
    flist = generate_file_list()
    if '--logging' in args:
        logging.basicConfig(filename="flask.log", level=logging.DEBUG)
        logging.info(flist)
        app.run(extra_files=flist)
    elif '--bg' in args:
        relaunch()
    else:
        print(flist)
        app.run(extra_files=flist)


# -----------------------------------------------------------------------------
@app.before_request
def before_request():
    """
    Clear the jinja cache so that updated HTML will be reflected in the browser
    """
    if 'localhost' in request.host_url:
        app.jinja_env.cache = {}


# -----------------------------------------------------------------------------
@app.route('/')
def main_page():
    """
    Render the front page
    """
    return(render_template('index.html', title="Tusculum"))


# -----------------------------------------------------------------------------
@app.route('/calendar')
def calendar():
    """
    Render the calendar page
    """
    return(render_template('calendar.html',
                           title='Mind-Hacking Your Calendar'))


# -----------------------------------------------------------------------------
@app.route('/cal-p-lb')
def calories_per_pound():
    """
    Render the calories per pound page
    """
    return(render_template('calorease.html'))


# -----------------------------------------------------------------------------
@app.route('/compounding')
def compounding():
    """
    This is a placeholder. Not sure this will ever get implemented
    """
    return("This computes interest compounding over time")


# -----------------------------------------------------------------------------
@app.route('/mental_hygiene')
def mental_hygiene():
    """
    Render the mental hygiene page
    """
    return(render_template('mental_hygiene.html', title="Mental Hygiene"))


# -----------------------------------------------------------------------------
@app.route('/jach')
def jach():
    """
    Render the Javascript, CSS, HTML page
    """
    return(render_template('jach.html', title="Tusculum"))


# -----------------------------------------------------------------------------
@app.route('/wandro')
def wandro():
    """
    Render the wandro page
    """
    return(render_template('wandro.html'))


# -----------------------------------------------------------------------------
@app.route('/restart')
def restart():
    """
    If we're local, relaunch ourselves
    """
    if 'localhost' in request.headers['Host']:
        logging.info('Relaunching')
        relaunch()
    else:
        return("", 404)


# -----------------------------------------------------------------------------
@app.route('/shutdown')
def shutdown():
    """
    Shutdown the server, but only if we're running locally
    """
    if 'localhost' in request.headers['Host']:
        logging.info('shutting down')
        sys.exit()
    else:
        return("", 404)


# -----------------------------------------------------------------------------
@app.route('/debug')
def debug():
    """
    Fire up the debugger. This only works when the flask process is attached to
    the terminal.
    """
    pdb.set_trace()
    return("debugging done")


# -----------------------------------------------------------------------------
@app.route('/tests/<payload>')
def tests(payload):
    """
    Render Jasmine test pages
    """
    return(render_template('tests/jasmine.html', payload=payload))


# -----------------------------------------------------------------------------
@app.route('/readme')
def readme():
    """
    Render the README page
    """
    raw = read_file("README.md")
    html = Markup(markdown.markdown(raw))
    return(render_template("markdown.html", title="README", html=html))


# -----------------------------------------------------------------------------
def read_file(filename):
    """
    Open a file and return its contents as a string
    """
    with open(filename, 'r') as f:
        return(f.read())


# -----------------------------------------------------------------------------
def relaunch():
    """
    Relaunch myself as a detached process with logging set up
    """
    subprocess.Popen("python flask_app.py --logging".split())
    sys.exit()


# -----------------------------------------------------------------------------
def generate_file_list():
    """
    Make list of the files we want flask to reload when changed
    """
    glist = ['templates/*.html',
             'templates/tests/*.html',
             'static/js/*.js',
             'static/js/tests-jasmine/*.js',
             ]
    rval = []
    for gexpr in glist:
        tmp = glob.glob(gexpr)
        rval.extend(tmp)
    return(rval)


# -----------------------------------------------------------------------------
if __name__ == '__main__':
    main(sys.argv)
