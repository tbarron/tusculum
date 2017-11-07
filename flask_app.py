
# A very simple Flask Hello World app for you to get started with...

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    rval = """
    <ul>
    <li><a href="cal_p_pound">Calories per Pound</a>
    </ul>
    """
    return rval

@app.route('/cal_p_pound')
def calories_per_pound():
    return 'This is the calories per pound page'