[<==](14_context_mgr) | [TOC](index) | [==>](16_inverse)

# Chapter 15: Method Objects

When many lines of code share many args and temp variables, create a
method object.

**Why**: Rather than making a big monolithic function, we can use a
  class to decompose the functionality into many small methods while
  keeping the associated data encapsulated.

**How**: Arguments are passed to the class constructor and become
  object attributes. Variables become object attributes. The
  +{ul}call{ul}+ method can be provided to make the object callable and
  have it compose the larger task from the small pieces of
  functionality its methods represent.

=== Example  footnoteref:[n1]

**Instead of this**:
----
def send_task(self, task, job, obligation):
    ...
    processed = ...
    ...
    copied = ...
    ...
    executed = ...
    100 more lines
----

**Do this**:
----
class TaskSender:
    def __init__(self, task, job, obligation):
        self.task = task
        self.job = job
        self.obligation = obligation
        self.processed = []
        self.copied = []
        self.executed = []
 
    def __call__(self):
        self.prepare()
        self.process()
        self.execute()

    def prepare():
        # do something

    def process():
        # do something

    def execute():
        # do something
----

**Usage**:

----
    x = TaskSender(12345, 'series15', 'background')   <1>
    x()                                               <2>
----

 <1> Runs the __init__() method, setting object attributes on new
 object x.
 <2> Runs the __call__() method, calling the subordinate object
 methods.

