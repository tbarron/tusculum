[<==](16_inverse) | [TOC](index) | [==>](18_cascade)

# Chapter 17: Always Return Something

## (You Do Anyway)

A function with no return statement returns `None`. We can always tack
a `return None` onto the end of a function and make it explicit.
Unless you have a good reason not to, consider including an explicit
`return` statement at the end of every function and method.

**Why**: One of the
  [guiding principles of Python](http://legacy.python.org/dev/peps/pep-0020/)
  is "Explicit is better than implicit". If we omit the return
  statement at the end of a function or method, we're still returning
  something, it just happens to be an invisible `None` value. It's
  better if we make it explicit. That reminds us that we could be
  returning something else if we need to, and it helps us avoid the
  error where we intended to return a computed value but forgot to
  code the `return` statement at all (that's probably never happened
  to you, but I do it all the time).

**How**: You could just try to remember to add `return None` at the
  end of every function you write, but remembering is a weak solution.
  Another possibility is to create a function template and insert it in
  your editor when you want to start a new function.

## Example

### Instead of this:

        def function_template(args):
            """
            This is the docstring
            """
            pass

Using `pass` as a placeholder is a common Python maneuver since Python
requires at least one indented executable line following each line that
ends with a colon. That's fine for loops and conditionals that are intended
to be functionally empty (i.e., do nothing). However, a function that ends
with `pass` does the same thing as one that ends with `return None`. So I
think using `return None` is more honest.

### Do this:

        def function_template(args):
            """
            This is the docstring
            """
            return None
