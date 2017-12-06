[<==](18_cascade) | [TOC](index) | ==>

# Chapter 19: Object Completeness

When the constructor finishes, the object should be complete and well-formed

**Why**: If two operations are not tied together by the code but I have to
remember to followup A with B, sooner or later I'm going to forget B. 

**How**: Just make sure that at the end of `__init__()`, all the
attributes of the object have been set to a valid value.

Better yet, write a test for each of your object constructors that verifies
a newly constructed object has a valid, meaningful value for each of its
attributes.

## Example

### Instead of this: 

        class Human(object):
            def __init__(self):
                self.name = ""
                self.age = 0
                self.married = True
                pass

        import Human
        p = Human.Person()                                    <1>
        p.name = "George"
        p.age = 75
        p.married = True

 <1> The constructor has finished at this point, so the object exists, but
 between this line and the next, it doesn't represent a valid person. 

----

### Do this:

        class Human(object):
            def __init__(self, name="Unnamed", age=0, married=False):
                self.name = name
                self.age = age
                self.married = married

        import Human
        p = Human.Person(name="George", age=75, married=True) <2>

 <2> When the constructor completes, the object represents a valid person.

The example is adapted from
[Python Best Practices Patterns, Vladimir Keleshev](http://stevenloria.com/python-best-practice-patterns-by-vladimir-keleshev-notes).
