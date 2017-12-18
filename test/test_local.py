from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

import pdb
import pytest
import time

def test_index(tmpdir):
    driver = webdriver.Chrome()
    driver.get("localhost:5000")

    # hedgehog gravatar
    log = tmpdir.join('log')
    pdb.set_trace()
    elements = driver.find_element_by_tag_name("a")
    log.write(dir(elements[0]))
    driver.quit()
