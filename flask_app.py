from flask import Flask
from flask import render_template


app = Flask(__name__)


@app.route('/')
def main_page():
    return render_template('index.html')


@app.route('/cal-p-lb')
def calories_per_pound():
    return render_template('calorease.html')


@app.route('/compounding')
def compounding():
    return "This computes interest compounding over time"


@app.route('/wandro')
def wandro():
    return render_template('wandro.html')


@app.route('/calendar')
def calendar():
    return render_template('calendar.html',
                           title='Mental-Hacking Your Calendar')
