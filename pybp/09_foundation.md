[<==](08_what_matters) | [TOC](index) | [==>](10_keywords)

# Chapter 9: Hard-Edged Foundation

Some tools provide forgiving interfaces that say, "Do this operation
if it's appropriate." So you can call the interface without worrying
about error handling.

Examples are "create table foo if not exists ..." and "drop table foo
if exists ..." in SQL.

On the other hand, "hard-edged" interfaces provide clear feedback about
whether requested operations are successful or not.

You should build your software in layers with the most primitive layers
providing a hard-edged foundation for the rest of the structure.

**Why**: 

**How**: 

=== Example

----
???
----

----
???
----
