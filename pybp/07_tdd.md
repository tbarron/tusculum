[<==](06_bug_test) | [TOC](index) | [==>](08_what_matters)

# Chapter 7: Test Driven Development

Write one or more test functions for each program function. Use a test
runner like [py.test](http://pytest.org/latest/),
[nosetests](https://nose.readthedocs.org/en/latest/), or
[green](https://pypi.python.org/pypi/green) to discover and run tests
regularly.

**Why**: Having a comprehensive set of unit tests allows you to make
changes to your code with confidence. If anything gets broken your test
suite will let you know.

**How**: Ideally, we would write our test functions first and use our test
functions to specify the precise behavior expected of the application
functions. Then, as we write the application functions, run the tests to
assess your progress. In this theoretical scenario, once all your tests
pass, your application is done.

My experience in the real world has been that it's about as hard to write
correct test code as it is to write correct application code. So I usually
wind up developing my test and application functions together. Working on
the application function shows me where I messed up its test functions and
they have to be corrected before I can the get application function right.

Read the documentation for your test runner and understand how it
discovers tests. Most of them check files that match a glob expression
like `test_*.py` in directoriess that typically have to match something
like `test_*` and then run functions and classes with names that include
the string "test".

## Example

### dates.py:

        import time

        def date_arith(base, delta, dunits="sec", fmt="%Y.%m%d %H:%M:%S"):
            """
            Compute a delta from a base date and format the result. e.g.
        
                result = date_arith(time.time(), -3, "day")
            """
            dsec = {'sec': 1,
                    'min': 60,
                    'hour': 3600,
                    'day': 24 * 3600,
                    'week': 7 * 24 * 3600}[dunits] * delta

            t = base + dsec
            rval = time.strftime(fmt, time.localtime(t))
            return rval


### test_dates.py:

        import unittest

        class TestDateRoutines(unittest.TestCase):
            def test_date_arith(self):
                self.assertEqual("2014.0101 00:00:00",
                                 date_arith(1388552400, 0))
                self.assertEqual("2014.0104 00:00:00",
                                 date_arith(1388552400, 3, "day"))
                self.assertEqual("2013.1231 17:00:00",
                                 date_arith(1388552400, -7, "hour"))


### Running the tests:

        $ cd <work-dir>
        $ py.test 

or

        $ cd <work-dir>
        $ nosetests

or

        $ cd <work-dir>
        $ green

