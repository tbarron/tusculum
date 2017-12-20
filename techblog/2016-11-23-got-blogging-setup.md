---
prev: 2016-11-21-understanding-jekyll
title: Blogging is Set Up
next: 2016-11-24-drafts-in-jekyll
---

So I got blogging set up and I can write all I want here. Here's what it
took:

         * mkdir _posts
         * emacs _posts/2016-11-21-understanding-jekyll.md
           ... wrote a short piece about how jekyll works ...

I have jekyll running, regenerating the site on each file change and
serving it locally on port 4000. So I was able to see my post by visiting
http://localhost:4000/2016/11/21/understanding-jekyll.html.

However, it wasn't rendering properly. My stylesheets were being ignored.
This was because they were being referenced with a relative url in the
layout. Like so:

        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="css/github-light.css">

Since this would be used for files in two different places on the site (the
root and also in directories named YYYY/MM/DD, I needed to reference these
with an absolute url. However, I didn't want to hardcode "localhost:4000"
in there since that wouldn't work when I push the pages to github. Jekyll
provides the variable _site.baseurl_ just for this purpose.

        {% raw %}
        <link rel="stylesheet" href="{{ site.baseurl }}/css/styles.css">
        <link rel="stylesheet" href="{{ site.baseurl }}/css/github-light.css">
        {% endraw %}

Next, I wanted an index of blog posts. I got that by putting the following
code in file blog.md

        {% raw %}
        ---
        ---
        <div id="post">
          <ul>
            {% for post in site.posts %}
            <li><a href="{{ post.url }}">{{ post.date | date: "%Y-%m-%d" }} 
                                       | {{ post.title }}</a></li>
            {% endfor %}
          </ul>
        </div>
        {% endraw %}

Jekyll renders that into blog.html, so in index.md (or _includes/head.html,
actually) I can link to 

        {% raw %}
        {{ site.baseurl }}/blog.html
        {% endraw %}

to see my list of blog posts.

#### References ####

 * [https://jekyllrb/docs/templates](https://jekyllrb/docs/templates)
 * [https://jekyllrb/docs/posts](https://jekyllrb/docs/posts)
 * [http://tom.preston-werner.com](http://tom.preston-werner.com) (redirects from [http://mojombo.github.io](http://mojombo.github.io))
 * [https://github.com/mojombo/mojombo.github.io](https://github.com/mojombo/mojombo.github.io)
