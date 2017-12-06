[<==](17_always) | [TOC](index) | [==>](19_constructor)

# Chapter 18: Cascading Method Calls

If an object method has nothing better to return, make it return
+self+.

**Why**: This allows functions to cascade. It also helps satisfy
  xref:_bricks_not_monoliths[Practice 2].

**How**: Just +return self+ at the end of each method.

=== Example footnoteref:[n1]

Instead of this:
----
    class Reactor:
        def release_water(self):
            ...
            return                          <1>
        def shutdown(self):
            ...                             <1>
        def alarm(self):
            ...
            return                          <1>

    foo = Reactor()
    foo.release_water()                     <2>
    foo.shutdown()
    foo.alarm()
----
 <1> Methods return None explicitly or implicitly (if return is
    omitted).
 <2> Each method has to be called through the object.

Do this:
----
    class Reactor:
        def release_water(self):
            ...
            return self                     <1>
        def shutdown(self):
            ...
            return self                     <1>
        def alarm(self):
            ...
            return self                     <1>

    foo = Reactor
    foo.release_water().shutdown().alarm()  <2>
----
 <1> Methods return self.
 <2> Calls can be cascaded.


