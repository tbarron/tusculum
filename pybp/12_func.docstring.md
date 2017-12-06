[<==](11_mod.docstring) | [TOC](index) | [==>](13_with)

# Chapter 12: Function Docstrings

For each function that you write, provide a docstring describing the
purpose it serves in the overall context of the program.

**Why**: The +pydoc+ command will use the docstring as part of the
  program documentation.

**How**: Put a pair of triple quotes immediately after the +def+ line
  with the docstring between them

=== Example

**No docstring -- Poor**: 
----
def squash(string):
    rval = re.sub("", "", string)          <1>
    return rval.strip()

 ...
 $ pydoc myprog
 ...
 FUNCTIONS
     ...
     squash(string)
     ...                                   <2>
----
 <1> The docstring would go right before this line.
 <2> No description of squash in the pydoc output.

**Better**:
----
def squash(string):
    """                                    <1>
    Remove whitespace to make strings easier to compare in tests.
    """
    rval = re.sub("", "", string)
    return rval.strip()

 ...
 $ pydoc myprog
 ...
 FUNCTIONS
     ...
     squash(string)                        <2>
         Remove whitespace to make strings easier to compare 
         in tests.
     ... 
----
 <1> Triple quotes delimit the docstring.
 <2> The description becomes part of the program documentation.

In the spirit of xref:_test_driven_development[test driven
development], you could even compose a test that looks at each
function in your system and reports the ones with no docstring.
