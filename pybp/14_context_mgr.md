[<==](13_with) | [TOC](index) | [==>](15_method_obj)

# Chapter 14: Context Managers

Compose your own context manager to control a resource

**Why**: You can apply the power of +with+ to your own resources.

**How**: Write a __context manager__ class to acquire, manage, and
  dispose of the resource.

=== Example 1

----
class Chdir(object):    
    def __init__(self, target):                        <1>
        self.start = os.getcwd()        
        self.target = target
    def __enter__(self):                               <2>
        os.chdir(self.target)        
        return self.target
    def __exit__(self, type, value, traceback):        <3>
        os.chdir(self.start)             
----
 <1> The constructor runs after with, before as.
 <2> __enter__() runs after as. The return value is assigned to
    the name after as.
 <3> __exit__() runs upon leaving the indented block under the
    with statement.

==== Usage

----
print os.getcwd()
with Chdir("/somewhere/else") as cwd:
    assert(cwd == "/somewhere/else")
    print os.getcwd()
print os.getcwd()
----

===== Output

----
/starting/directory
/somewhere/else
/starting/directory
----

////
=== Example 2 footnoteref:[note_1]

----
class SomeProtocol:
    def __init__(self, host, port):        
        self.host, self.port = host, port

    def __enter__(self):        
        self._client = socket()        
        self._client.connect((self.host, 
                              self.port))

    def __exit__(self, exception, value, traceback):        
        self._client.close()

def send(self, payload): ...

def receive(self): ...

with SomeProtocol(host, port) as protocol:    
    protocol.send(['get', signal])    
    result = protocol.receive() 
----
////



