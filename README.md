Backbone.Layout
===============

A simple layout manager for Backbone.  Backbone.Layout provides easy view life cycle managment for composite views.

[![Build Status](https://travis-ci.org/HumbleSoftware/backbone-layout.svg?branch=master)](https://github.com/HumbleSoftware/backbone-layout)

# API

`.setView(view[, selector][, options])`
* `view` an instance of a Backbone view
* `selector` a css selector (optional)
* `options` configuration options (optional)
  * `append` by default, `setView` replaces views
  * `cache` cache long-running views when replacing (do not call `remove` or `render`)

This attaches a view to a selector.  If no selector is provided, the view is attached to the layouts `el`.  Multiple views may be attached to a single element with the `append` option.  Long-running views may be preserved across renders and replacements with the `cache` option.

# Development

This project uses a gulp-based build, npm for package management, and mocha, jshint and phantomjs for testing.  The development source is in `backbone.layout.js` and tests are in `spec/`.  `To begin devleopment:

* `npm install` install packages
* `gulp` starts the develpment watcher
* `gulp test` executes the test suite
* `gulp build` builds the production version

