import pdb
import pytest
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time

def test_head_page_verify_elements():
# -----------------------------------------------------------------------------
@pytest.fixture(scope="module")
def web():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()


    exp = ["Calories per Pound",
           "Compounding Interest (placeholder)",
           "Gregorian Calendar Mental Hack",
           "Mental Hygiene",
           "wandro - A scrolling, random wikipedia viewer"]
    for item in exp:
        elm = driver.find_element_by_link_text(item)
        elm.click()
        driver.switch_to_window(driver.window_handles[1])
        time.sleep(2)
        driver.close()
        driver.switch_to_window(driver.window_handles[0])
        time.sleep(2)
    driver.quit()
# -----------------------------------------------------------------------------
def test_find_iframe(web):
    web.get("localhost:5000")
    exp = {"Useful Thoughts": "x",
           "source for tusculum.pythonanywhere.com": "x",
           "Javascript, CSS, and HTML (JaCH) Doo-dads": "x",
           "backscratcher": "x",
           "evernote-helpers": "x",
           "tbx - utility toolbox (Python)": "x"}
    elm = web.find_elements_by_xpath("//iframe[@class='panel']")
    elm = web.find_element_by_xpath("//iframe[@id='projects']")
    web.switch_to_frame(elm)
    for link in web.find_elements_by_xpath("//a"):
        exp[link.text] += "w"

    justweb = [x for x in exp.keys() if exp[x] == "w"]
    justexp = [x for x in exp.keys() if exp[x] == "x"]
    assert justweb == [], "In the webpage but not expected"
    assert justexp == [], "Expected but not in the webpage"


