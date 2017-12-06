[<==](09_foundation) | [TOC](index) | [==>](11_mod.docstring)

# Chapter 10: Python Built-Ins

Be aware of 
https://docs.python.org/2/library/functions.html[Python's reserved words]
and avoid overloading or overwriting them.

**Why**: Inadvertent replacement of an internal Python function with
  your own can cause problems from subtle and hard to find bugs all
  the way to spectacular and embarrassing failures.

**How**: 

* Learn the list of Python reserved words.
* Don't use them in unintended ways.
* Ever.

=== Example

**Bad**:
----
object = myObject()              <1>
map = Map()                      <2>
zip = 90213                      <3>
id = 34                          <4>
----
 <1> The original ancestor from which all first class objects inherit
 object-ness.
 <2> Built-in function which applies an operation to every element of
 a sequence.
 <3>Built-in function to tuple-ize sequences.
 <4>Built-in function which returns a unique identifier for every
 object in the system.

**Better**:
----
obj = myObject()                 # abbreviation
object_ = myObject()             # tweak the reserved word

map_obj = Map()                  # compounding to avoid reserved word
map_()                           # tweak

zip_code = 90213                 # compounding, explicitness
postal_code = 90213              # more generic name
zip_ = 90213                     # tweak

pk = 34                          # alternatives
sku = 19
id_ = 72                         # tweak
----

Example adapted from
http://www.slideshare.net/pydanny/python-worst-practices[Python Worst
Practices, Daniel Greenfeld]
footnoteref:[n3,http://www.slideshare.net/pydanny/python-worst-practices[Python Worst Practices]]

