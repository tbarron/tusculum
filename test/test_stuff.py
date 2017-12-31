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
