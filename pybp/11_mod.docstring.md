[<==](10_keywords) | [TOC](index) | [==>](12_func.docstring)

# Chapter 11: Module Docstrings

For each module that you write, provide a docstring describing the
purpose it serves in the overall context of the program.

**Why**: The +pydoc+ command will use the docstring as part of the
  program documentation.

**How**: Put a pair of triple quotes at the top of the file
  with the docstring between them

=== Example 1: **No docstring -- Poor**
----
#!/usr/bin/env python
class Foobar(...):
    ....
----
No description of the module in the pydoc output.

=== Example 2: **Obvious docstring -- Better than nothing (maybe)** 
----
"""                                           <1>
This module describes module docstrings
"""
----
 <1> Triple quotes delimit the docstring.

The description becomes part of the program documentation. However, an
obvious docstring that gets out of synch with the content of the
module can be worse than nothing because it is misleading.

=== Example 3: **Places this module in the big picture -- Better**
----
"""                                           <1>
This discussion of module docstrings in Python is one of a group of
Python Best Practices.
"""
----
 <1> Triple quotes delimit the docstring.

The description becomes part of the program documentation.
