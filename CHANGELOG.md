## 1.0.4 ... 2018.xxxx

 * Conway's Game of Life in javascript
   * Sensitive to size of browser window when loaded
   * Selectable starting configurations
   * Step or run
   * User-controllable step interval

## 1.0.3 ... 2018.0127

 * Add links to projects page

## 1.0.2 ... 2018.0127 18:42:48

 * Brought back rounded corners on the gravatar images that was lost
   temporarily

## 1.0.1 ... 2018.0127 18:26:43

 * index.{css,html}: Use CSS grid rather than flex to get component
   responsiveness
 * test/test_deploy.py: Add test for deployability
 * version.py: Add file to define the version

## 1.0.0 ... 2017.1220 05:46:48

 * techblog: Machinery in flask app for serving techblog
 * techblog: Styling for techblog entries
 * CHANGELOG up to date

## 1001e0bb ... 2017-12-20 05:35:13

 * techblog: Add blog entries and template for rendering them

## 8ccdac7a ... 2017-12-20 05:29:06

 * writing.html: Begin populating writing list

## f0e9b360 ... 2017-12-20 05:25:21

 * projects.html: Populate the list of projects, some with links

## f64b447b ... 2017.1220 05:19:57

 * README.md: Improve description of autoenv

## 5cb36d9e ... 2017.1219 10:51:17

 * Show most recent commit at bottom right
 * Write last_commit() and use it to display the commit being shown (green
   if up to date, red if there are uncommitted updates)

## 38702cb4 ... 2017.1219 10:50:32

 * Update the tools row with actual links to github, bit bucket, and
   travis.

## 8704f1c4 ... 2017.1219 10:49:08

 * Put content in iframe panels so they are independently scrollable with
   appropriate styling.

## 0589eaaf ... 2017.12.18 19:04:48

 * Use flexbox instead of grid to manage the layout format so I can have
   the tools bar (github, travis, etc.) at the bottom of the browser
   window.

## ab7f7822 ... 2017.1218 18:24:43

 * Make routes server-sensitive so I can do things like shutting down or
   restarting flask locally in testing without opening the production one
   to attacks.

## b4a8606a ... 2017.1218 16:30:54

 * Reorganize -- new top level page with Javascript, CSS, HTML (JaCH) under
   it

## 5bae77b8 ... 2017.1208 07:55:54

 * Added jasmine-based tests for the Javascript code
