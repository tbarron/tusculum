from flask import Flask
from flask import render_template
from flask import request

import glob

app = Flask(__name__)


# -----------------------------------------------------------------------------
@app.before_request
def before_request():
    if 'localhost' in request.host_url:
        app.jinja_env.cache = {}


# -----------------------------------------------------------------------------
@app.route('/')
def main_page():
    return render_template('index.html')


# -----------------------------------------------------------------------------
@app.route('/cal-p-lb')
def calories_per_pound():
    return render_template('calorease.html')


# -----------------------------------------------------------------------------
@app.route('/compounding')
def compounding():
    return "This computes interest compounding over time"


# -----------------------------------------------------------------------------
@app.route('/mental_hygiene')
def mental_hygiene():
    return render_template('mental_hygiene.html',
                           title="Mental Hygiene")


# -----------------------------------------------------------------------------
@app.route('/wandro')
def wandro():
    return render_template('wandro.html')


# -----------------------------------------------------------------------------
@app.route('/calendar')
def calendar():
    return render_template('calendar.html',
                           title='Mind-Hacking Your Calendar')


# -----------------------------------------------------------------------------
@app.route('/tests/<payload>')
def tests(payload):
    return render_template('tests/jasmine.html', payload=payload)


# -----------------------------------------------------------------------------
def generate_file_list():
    glist = ['templates/*.html',
             'templates/tests/*.html',
             'static/js/*.js',
             'static/js/tests-jasmine/*.js',
             ]
    rval = []
    for gexpr in glist:
        tmp = glob.glob(gexpr)
        rval.extend(tmp)
    return rval


# -----------------------------------------------------------------------------
if __name__ == '__main__':
    flist = generate_file_list()
    print(flist)
    app.run(extra_files=flist)
