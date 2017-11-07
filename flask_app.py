
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    rval = """
    <ul>
    <li><a href="cal-p-lb">Calories per Pound</a>
    <li><a href="compounding">Compounding Interest</a>
    </ul>
    """
    return rval

@app.route('/cal-p-lb')
def calories_per_pound():
    return render_template('calorease.html')
    # return 'This is the calories per pound page'

@app.route('/compounding')
def compounding():
    return "This computes interest compounding over time"
