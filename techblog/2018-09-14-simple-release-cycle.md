---
prev: 2017.1219-life-goes-on
title: Simple Release Cycle
next:
---

This is the simple release cycle I use for most of my projects.

  * Create a branch off master with a meaningful name.
  
  * Make changes in the branch to fix the bug, add new functionality, or
    whatever.
    
     * Update tests (if appropriate).
     * Update payload code/content.
     * Update CHANGELOG.md to describe the updates.
     * Update the project version (version.py or wherever)
     
  * Ensure tests pass.
  
  * Commit changes in the work branch.
  
  * Tag the final commit with the new version.
  
  * Checkout master and merge the work branch.
  
  * Check the tests again and ensure they still pass.
  
  * Push master to the origin.
