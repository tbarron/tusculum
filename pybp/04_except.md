[<==](/python-best-practices/03_dry) | [TOC](index) | [==>](/python-best-practices/05_bricks)

# Chapter 4: Uncaught Exception Handler

Provide a general exception handler at the top level of your program

**Why**: Provides a "last resort" opportunity to catch errors.
This gives you control over the format and content of the error the user
sees.

**How**:
There are a couple of ways to do this. The first is by wrapping the
call to main(), or the contents of main() in a try ... except block.

## Example 1

        def main(args):
            ...

        if __name__ == "__main__":
            try:
                main(sys.argv)
            except Exception, e:
                # simple, one line error message
                print str(e)

                # full traceback for development/debugging
                raise

Another option, perhaps simpler and cleaner, is to use
[sys.excepthook](https://docs.python.org/2/library/sys.html#sys.excepthook)
to override Python's default
handling of uncaught exceptions:

## Example 2

        import sys

        def main(args):
            ...
        def exc_handler(xtype, err, traceback):
            # simple, one line error message
            print str(err)
            # full traceback
            py_except(xtype, err, traceback)

        if __name__ == "__main__":
            py_except = sys.excepthook
            sys.excepthook = exc_handler
            main(sys.argv)

Whichever approach you choose, pick one or the other. In most cases using
both would not be appropriate.

Of course, this allows us a lot of flexibility -- exc_handler() could
send a short one line message to the
user while saving the complete traceback in a log file for later
reference, which might be a way of
doing both. So you can have your cake and eat it, too.

**[NOTE]** This entry is not intended to suggest avoiding `try ... except`
blocks at lower levels of your program. The `try ... except` mechanism is
the standard way of detecting and handling exceptional conditions as your
code runs. Rather, the intent here is to encourage you to put an exception
catcher at the top level of your program so you have the opportunity to
handle unexpected exceptions. As we discover exceptions, and they shift
from being unexpected to expected, we'd at least consider adding more
specific lower level +try ... except+ blocks to handle each one.

## References

  * [sys.excepthook(type, error, traceback)](https://docs.python.org/2/library/sys.html#sys.excepthook)
