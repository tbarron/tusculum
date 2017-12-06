[<==](04_except) | [TOC](index) | [==>](06_bug_test)

# Chapter 5: Bricks, not Monoliths

Design functions and methods as many tiny bricks rather than a
few huge monoliths. Encapsulate non-obvious code in well-named functions so
it's clear what the call does.

**Why**: 

* Small chunks of well-encapsulated code can be put together in lots
  of different ways to build up more significant functionality. On the
  other hand, it's difficult to reuse 500-line special-purpose
  routines effectively.
* Small functions are easier to understand and test. It may
  communicate more effectively
  to write a short routine whose purpose and function are obvious from
  the name and code than to comment the same code as a chunk embedded
  in a larger function.

**How**: 

* Limit each function/method to a single task, all at the same
  level of abstraction. Name functions so that it's clear what they do.

## Example

### Not so good

        def do_everything():
            ... 1000 lines in a single function ...

### Less obvious

        ...
        if self.flags & 0b1000:          # What do this do?
            ...
 
### More obvious

        ...
        def is_visible(self):            # Oh! It checks visibility!
           return self.flags & 0b1000
 
        if self.is_visible():
            ...

Example is adapted from
[Python Best Practices Patterns, Vladimir Keleshev](http://stevenloria.com/python-best-practice-patterns-by-vladimir-keleshev-notes)
