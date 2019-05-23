# Changelog

Notable changes for this project.

## [1.0.9] / 2019-05-23 / Add update script for refreshing tusculum
### Additions
 * New script 'update'

## [1.0.8] / 2019-05-23 / Add GPS coord converter
### Additions
 * Add page 'degrees' to convert among various formats for lat/long values


## [1.0.7] / 2018-10-16 / Link to Python Best Practices
### Additions
 * Add link to Python Best Practices on home page


## [1.0.6] / 2018-09-15 / Correct README.md
### Additions
 * Add up link to each blog page

### Changes
 * Put newest techblog entries in reverse chronological order
 * Correct Simple Release Cycle URL in README.md
 * Correct comments (flask_app.py)
 * Use CSS grid to lay out title, prev, next, and up links


## [1.0.5] / 2018-09-15 / Adding (Partial) Random Sierpinski Calculator
### Additions
 * Add 'sierpinski' entry in flask_app.py, sierpinski.html template,
   sierpinski entry in jach.html, file sierpinski.js
 * Reset button
 * Favicon suppression

### Changes
 * Make content sensitive to window resizes

### Deletions
 * Obsolete stuff


## [1.0.4] / 2018-07-12 / Conway's Game of Life in Javascript

 * Conway's Game of Life in javascript
   * Sensitive to size of browser window at load time
   * Selectable starting configurations
   * Step or run
   * User-controllable step interval
   * CSS handled in javascript so we don't need a separate .css file,
     jslife.css removed
   * Support interesting initial arrangements
   * Collapsed cell borders
 * Document work cycle in README.md
 * Add link to project envy in github


## [1.0.3] / 2018-01-27 / Project Page Links

 * Add links to projects page


## [1.0.2] / 2018-01-27 / Round-corner Gravatar Images

 * Brought back rounded corners on the gravatar images that was lost
   temporarily


## [1.0.1] / 2018-01-27 / Switch Back from Flexbox to Grid

 * index.{css,html}: Use CSS grid rather than flex to get component
   responsiveness
 * test/test_deploy.py: Add test for deployability
 * version.py: Add file to define the version


## [1.0.0] / 2017-12-20 / Techblog in Flask

 * techblog: Machinery in flask app for serving techblog
 * techblog: Styling for techblog entries
 * CHANGELOG up to date


## [1001e0bb] / 2017-12-20 / Tech blogs

 * techblog: Add blog entries and template for rendering them


## [8ccdac7a] / 2017-12-20 / Writing List

 * writing.html: Begin populating writing list


## [f0e9b360] / 2017-12-20 / Projects

 * projects.html: Populate the list of projects, some with links


## [f64b447b] / 2017-12-20 / Better autoenv description

 * README.md: Improve description of autoenv


## [5cb36d9e] / 2017-12-19 / Report Last Commit

 * Show most recent commit at bottom right
 * Write last_commit() and use it to display the commit being shown (green
   if up to date, red if there are uncommitted updates)


## [38702cb4] / 2017-12-19 / Tools Row

 * Update the tools row with actual links to github, bit bucket, and
   travis.


## [8704f1c4] / 2017-12-19 / Independent Scrollability through IFRAME

 * Put content in iframe panels so they are independently scrollable with
   appropriate styling.


## [0589eaaf] / 2017-12-18 / Flexbox

 * Use flexbox instead of grid to manage the layout format so I can have
   the tools bar (github, travis, etc.) at the bottom of the browser
   window.


## [ab7f7822] / 2017-12-18 / Server Sensitivity

 * Make routes server-sensitive so I can do things like shutting down or
   restarting flask locally in testing without opening the production one
   to attacks.


## [b4a8606a] / 2017-12-18 / Reorg

 * Reorganize -- new top level page with Javascript, CSS, HTML (JaCH) under
   it


## [5bae77b8] / 2017-12-08 / Jasmine

 * Added jasmine-based tests for the Javascript code
