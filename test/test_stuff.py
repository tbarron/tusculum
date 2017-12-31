import pdb
import pytest
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time


# -----------------------------------------------------------------------------
@pytest.fixture(scope="module")
def web():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()


# -----------------------------------------------------------------------------
def test_head_page_verify_elements(web):
    web.get("localhost:5000/jach")
    # time.sleep(2)
    exp = ["Calories per Pound",
           "Compounding Interest (placeholder)",
           "Gregorian Calendar Mental Hack",
           "Mental Hygiene",
           "wandro - A scrolling, random wikipedia viewer"]
    for item in exp:
        elm = web.find_element_by_link_text(item)
        elm.click()
        web.switch_to_window(web.window_handles[1])
        # time.sleep(2)
        web.close()
        web.switch_to_window(web.window_handles[0])
        # time.sleep(2)


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


# -----------------------------------------------------------------------------
def test_useful(web):
    web.get("localhost:5000/useful")
    elements = web.find_elements_by_xpath("//p[@class='thought']")
    assert len(elements) == 6

    element = web.find_element_by_xpath("//input[@name='thought_text']")
    assert element.get_attribute("type") == "text"

    element = web.find_element_by_xpath("//input[@name='suggest']")
    assert element.get_attribute("type") == "submit"

    element = web.find_element_by_xpath("//input[@name='more_th']")
    assert element.get_attribute("type") == "submit"

    element = web.find_element_by_xpath("//input[@name='fewer_th']")
    assert element.get_attribute("type") == "submit"

    element = web.find_element_by_xpath("//input[@name='all_th']")
    assert element.get_attribute("type") == "submit"
