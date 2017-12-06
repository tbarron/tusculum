[<==](05_bricks) | [TOC](index) | [==>](07_tdd)

# Chapter 6: Find a Bug, Write a Test

### (aka, Test Driven Development)
You just found a bug in your code. What's the first thing you do?

My first impulse has always been to start hacking on the code trying to
figure out where the problem is and what to do about it.

A more productive response is to nail down exactly what the problem looks
like with a test that tickles the bug and fails. That way, when we do
remove the bug, the new test will start working, letting us know that we
got it. And we'll have a more complete, more robust test suite.

**Why**: Capturing knowledge about past bugs in tests allows us to
  code with confidence, knowing that any regressions will be exposed
  the next time we run our tests. (Well, *know* may be a little
  strong. But you get the idea. We build confidence in our code by seeing
  it pass the tests we've devised for it. The better and more complete the
  test suite is, the higher our confidence level.)

**How**: Write a new test case and make sure it fails with the buggy code,
  demonstrating the newly discovered issue. If more bugs crop up in the
  process of constructing the new test, write a test for each one.
