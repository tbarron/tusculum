[<==](12_func.docstring) | [TOC](index) | [==>](14_context_mgr)

# Chapter 13: Leak Prevention

Use +with+ to represent pairs of action that should be taken together
so that you avoid resource leakage over time. footnoteref:[n1]
Examples are open/close, lock/unlock, cd to another directory/return
to the starting directory, etc.

**Why**: It's easy to forget the downstream action, especially if
there's enough code using the resource to distract you.

**How**: Use Python's +with+ statement when accessing the resource so
that disposition of the resource is automatic.

=== Example

**Not so good**:

----
f = open(filename, 'w')
f.write(data)
...                         <1>
f.close()                   <2>
----
 <1> Imagine 100 lines of output here.
 <2> Wouldn't it be easy to forget this close?

**Better**:

----
with open(filename, 'w') as f:
    f.write(data)           <3>
----
 <3> The close is automatic. You don't have to remember.

