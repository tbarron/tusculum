[<==](/python-best-practices/02_convention) | [TOC](index) | [==>](/python-best-practices/04_except)

# Chapter 3: Don't Repeat Yourself (DRY)

Code each action exactly once. When you need to do it multiple times,
or do it in conjunction with some other operation, call the routine or object
that knows how to do what's needed as many times as necessary.

This goes for text strings as well. If you're going to use a text
string only once, ever, go ahead and hard code it. As long as it only
occurs in one place, you only have to change it in one place. 

However, as soon as you have two copies of it at different places in your
code (e.g., the place where it is displayed and the test where you check
for it), you'll save yourself work in the long run by putting it in a
message catalog of some sort and having your code retrieve it from the
catalog.

Of course, if you hard code some strings and put others in the catalog,
when you need to change a string, you'll have to figure out which kind this
particular string is and then either track it down in the code base or find
it in the catalog. If all strings go into the catalog at creation, you
always know that your strings live in the catalog.

**Why**: Someday you're going to need to change how you did that
  operation or the contents of the string. Maybe some new technology
  will come along or the thing you're using will stop working. When
  the time comes, you're better off if you can change the behavior or
  text in one spot and be done.

**How**: Write each primitive function/method to do one thing.
  Upstream functions will call these primitives. Keep static messages
  in a message catalog retrieve them when needed.

## Example

### Don't do this:

        if os.path.exists('abcfile'):
            os.unlink('abcfile')
        if os.path.exists('foofile'):
            os.unlink('foofile')
        if os.path.exists('junk'):
            os.unlink('junk')


### Do this instead:

        def conditional_unlink(filename):
            if os.path.exists(filename):
                os.unlink(filename)

        conditional_unlink('abcfile')
        conditional_unlink('foofile')
        conditional_unlink('junk')
