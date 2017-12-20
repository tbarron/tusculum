---
title: Drafts in Jekyll
prev: 2016-11-23-got-blogging-setup
next: 2016-11-24-scalability
---
The jekyll documentation talks about putting drafts for posts in a _drafts
directory without dating them. It seems to me it will be simpler to just
keep them in the _posts directory and use git to manage whether they get
pushed to the site or not.

When I run the jekyll server locally, I'll be able to preview them but as
long as I haven't told git about them and/or pushed them, they won't be
visible on the site.

Once I'm happy with what they say and how they look, I'll 'git
add/commit/push' and the draft will be published. There may be private
pages that live as a draft for a long time and never get published.

