"""
I want to use https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
if we have an internet connection and it's available, otherwise fall back to
$base/static/js/jquery.min.js.

How do I test for internet connectivity?

    Check whether hostnames can be resolved:
    host = socket.gethostbyname(hostname)

How do I write a markup function I can call from html like url_for()?
"""
from flask import Flask
from flask import render_template
from flask import request
from flask import Markup

import glob
import logging
import markdown
import os
import pdb
import pexpect
import re
import subprocess
import sys
import useful

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
    (x, y) = last_commit()
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
    (last_update, uptodate) = last_commit()
    return(render_template('index.html', title="Tusculum",
                           last_update=last_update,
                           uptodate=uptodate))


# -----------------------------------------------------------------------------
@app.route('/frame/<panel>')
def frame(panel):
    """
    Render content for a frame
    """
    filename = panel + '.html'
    return(render_template(filename))


# -----------------------------------------------------------------------------
@app.route('/widget/<which>')
def widget(which):
    """
    Render a widget based on the URL
    """
    widges = {'calendar':
                 {'filename': "calendar.html",
                  'title': "Mind-Hacking Your Calendar"},
              'jslife':
                 {'filename': "jslife.html",
                  'title': "Conway's Life in Javascript"},
              'cal-p-lb':
                 {'filename': "calorease.html",
                  'title': ""},
              'compounding':
                 {'filename': "compounding.html",
                  'title': "Compounding",
                  'placeholder': "This computes geometric growth over time"},
              'degrees':
                 {'filename': "degrees.html",
                  'title': "Degrees",},
              'mental_hygiene':
                 {'filename': "mental_hygiene.html",
                  'title': "Mental Hygiene",},
              'sierpinski':
                 {'filename': "sierpinski.html",
                  'title': "Sierpinski: A Geometric Sieve Generator"},
              'speed':
                 {'filename': "speed.html",
                  'title': "Speed",},
              'wandro':
                 {'filename': "wandro.html",
                  'title': "wandro - A scrolling, random wikipedia viewer"},
              }

    if "placeholder" in widges[which]:
        return(widges[which]['placeholder'])
    else:
        return(render_template(widges[which]['filename'],
                               title=widges[which]['title']))


# -----------------------------------------------------------------------------
@app.route('/jach')
def jach():
    """
    Render the Javascript, CSS, HTML page
    """
    return(render_template('jach.html',
                           title="Tusculum"))


# -----------------------------------------------------------------------------
@app.route('/useful/<branch>', methods=["GET", "POST"])
def useful_route(branch):
    """
    Render the 'Useful Thoughts' page
    """
    if 'thoughts' == branch:
        return useful_thoughts()
    elif 'vet' == branch:
        return useful_vet()
    elif 'about' == branch:
        return useful_about()


# -----------------------------------------------------------------------------
def useful_about():
    return(render_template('useful_about.html',
                           title="About Useful Thoughts"))


# -----------------------------------------------------------------------------
def useful_thoughts():
    # If database does not exist, set it up.
    if not os.path.exists("useful.db"):
        useful.setup_database()

    # If a thought has been suggested, add it to the database
    action = request.values.get('action')
    ttext = request.values.get('thought_text')
    suggest_msg = ""
    if action == 'suggest' and ttext != "":
        if useful.store_thought(ttext):
            suggest_msg = "Your suggestion has been added. Thank you."
        else:
            suggest_msg = "That one is already in the database. Thanks!"

    # Decide how many thoughts to retrieve. The default number is 6. If the
    # user has clicked "more", pick a larger number. If the user has clicked
    # "less", pick a smaller number.
    try:
        count = int(request.values.get('count')) or 6
    except:
        count = 6
    if action == 'more':
        count = int(1.5 * count)
    elif action == 'fewer':
        count = int(0.66 * count)

    # Retrieve a random selection of thoughts from the database
    thought_list = useful.random_thoughts(count)

    return(render_template('useful_thoughts.html',
                           thoughts=thought_list,
                           title="Useful Thoughts",
                           suggest_reply=suggest_msg,
                           count=count))


# -----------------------------------------------------------------------------
@app.route('/restart')
def restart():
    """
    If we're local, relaunch ourselves
    """
    if 'localhost' in request.host_url:
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
    if 'localhost' in request.host_url:
        logging.info('shutting down')
        sys.exit()
    else:
        return("", 404)


# -----------------------------------------------------------------------------
@app.route('/techblog/<entry>')
def techblog(entry):
    """
    If *entry* is empty, we render the blog page. Otherwise, we render the
    entry requested.
    """
    if entry == "":
        md, raw = read_file_with_metadata("techblog/front.md")
        html = Markup(markdown.markdown(raw))
    else:
        md, raw = read_file_with_metadata("techblog/{}.md".format(entry))
        html = Markup(markdown.markdown(raw))

    return(render_template("techblog.html",
                           html=html,
                           **md))


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
def last_commit():
    """
    Get the date and time of the last update from git
    """
    rval = pexpect.run('git --no-pager show --format="%H %ci"')
    rval = str(rval).split("\\r\\n")[0]
    rval = rval.replace("b'", "")
    rval = rval.replace("-0500", "EST")
    (hash, date) = rval.split(" ", 1)
    hash_ts = "{}   {}".format(hash[0:8], date)

    uptodate = False
    rval = pexpect.run('git status --porc')
    if rval.decode() == "":
        uptodate = True
    return(hash_ts, uptodate)


# -----------------------------------------------------------------------------
def read_file_with_metadata(filename):
    """
    Read a file and parse the metadata (between two lines of dashes) off the
    front
    """
    with open(filename, 'r') as f:
        data = f.readlines()

    state = 'STARTING'
    mdata = {}
    rval = ""
    for line in data:
        if state == 'STARTING' and line.startswith('---'):
            state = 'METADATA'
        elif state == 'STARTING':
            state = 'CONTENT'
            rval = line
        elif state == 'METADATA' and line.startswith('---'):
            state = 'CONTENT'
        elif state == 'METADATA':
            (key, value) = re.split(":\s*", line, 1)
            mdata[key] = value
        elif state == 'CONTENT':
            rval += line
    return(mdata, rval)


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
