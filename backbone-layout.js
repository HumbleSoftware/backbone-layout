/**
 * Backbone.Layout (c) 2014 Carl Sutherland
 * MIT License
 */
(function (root, factory) { 

  // AMD support:
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], function (_, Backbone) {
      return factory.apply(root, _, Backbone);
    });
  }

  // Node support:
  else if (typeof exports !== 'undefined') {
    module.exports = factory(root, require('underscore'), require('backbone'));
  }

  // Browser globals:
  else {
    factory(root, _, Backbone);
  }

})(this, function (root, _, Backbone) {

  // Layout:
  var layout = {
    /**
     * Constructor
     */
    constructor: function () {
      this.views = [];
      return Backbone.View.apply(this, arguments);
    },

    /**
     * Bind view to selector.
     *
     * Options:
     * - append  Append the view to the selector
     * - cache  Do not destroy the view.  For switching between views.
     */
    setView: function (view, selector, options) {
      //view = new ComposedView(this, view, selector, options);

      var views = this.views;

      // Options:
      if (!options && selector && !_.isString(selector)) {
        options = selector;
        selector = null;
      }
      options = options || {};
      var append = options.append;
      var cache = options.cache;

      // View container:
      var $container = selector ? this.$(selector) : this.$el;
      var $children = $container.children();

      // Clean up other views if replacing views or moving view
      if (views.length) {
        // Iterate over clone to because we are removing views
        var removed = 0;
        _.each(_.clone(views), function (item, i) {
          var oldView = item.view;
          var options = item.options;
          if ($children.is(oldView.el)) {

            // DOM clean up:
            if (!append && oldView !== view) {
              if (options && options.cache) {
                oldView.$el.detach();
              } else {
                oldView.remove();
              }
            }

            // View list maintenance:
            if (!append || oldView === view) {
              views.splice(i - removed++, 1);
            }
          }
        });
      }

      // Add new view:
      views.push({
        view: view,
        selector: selector,
        options: options
      });
      $container.append(view.el);

      return this;
    },

    /**
     * Renders view and sub-views.
     */
    render: function () {
      var views = this.views;

      // Re-attach views using views and delgate events:
      _.each(views.splice(0, views.length), function (item) {
        var view = item.view;
        var options = item.options;
        if (!options || !options.cache) {
          view.render();
        }
        this.setView(view, item.selector, item.options);
        view.delegateEvents();
      }, this);
      return Backbone.View.prototype.render.apply(this, arguments);
    },

    /**
     * Remove view and sub-views.
     */
    remove: function () {
      _.each(this.views, function (view) { view.view.remove(); });
      return Backbone.View.prototype.remove.apply(this, arguments);
    },

    /**
     * Delegate events on view and sub-views.
     */
    delegateEvents: function () {
      _.each(this.views, function (view) { view.view.delegateEvents(); });
      return Backbone.View.prototype.delegateEvents.apply(this, arguments);
    }
  };

  // Attach Layout to Backbone
  var Layout = Backbone.Layout = Backbone.View.extend(layout);

  // Return for CJS modules
  return Layout;
});
