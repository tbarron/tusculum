[<==](15_method_obj) | [TOC](index) | [==>](17_always)

# Chapter 16: True Good, False Bad

Some interfaces use zero to indicate success and a non-zero value to
indicate failure. In Python, True means success and False means
failure.

If you have to deal with a crazy interface, wrap it in such a way that
it makes pythonic sense to the rest of your code.

**Why**: Allowing the craziness into your code will eventually let it
  get everywhere. Nobody wants that.

**How**: You can use, for example, +not bool(rc)+ to translate 0 to True
  and 1 to False.

=== Example

**Not so good**:
----
def crazy_api(*args):
    do_the_thing()
    if it_worked():
        return 0
    else:
        return -1
----

**Preferable**:
----
def wrap_craziness(*args):
    rc = crazy_api(*args)
    return not bool(rc)
----

Example adapted from
http://www.slideshare.net/pydanny/python-worst-practices[Python Worst
Practices, Daniel Greenfeld]
footnoteref:[n3]

