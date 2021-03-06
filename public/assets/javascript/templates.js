this["Template"] = this["Template"] || {};

this["Template"]["detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <button id=\"comment-history-toggle\" type=\"button\" class=\"custom-btn btn btn-md btn-primary btn-block\" data-target=\"#comment-history\" data-toggle=\"collapse\">\n          Toggle comments\n        </button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"card\">\n          <div class=\"card-block\">\n            <h4 class=\"card-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n            <p class=\"card-text\">"
    + alias4(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper)))
    + "</p>\n          </div>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<!-- Handlebars Article Detail Template -->\n\n<div class=\"row\">\n  <div class=\"col-md-12 title-row\">\n    <h2 class=\"title\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.title : stack1), depth0))
    + " </h2>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12 detail-div\"> "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.detail : stack1), depth0)) != null ? stack1 : "")
    + " </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12 news\" role=\"tablist\">\n    <button id=\"js-add-favorite\" type=\"button\" class=\"custom-btn btn btn-md btn-primary btn-block\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n      Add To Favorites\n    </button>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12 news\" role=\"tablist\">\n    <button id=\"comment-form-toggle\" type=\"button\" class=\"custom-btn btn btn-md btn-primary btn-block\" data-target=\"#comment-form\" data-toggle=\"collapse\">\n      Add Comment\n    </button>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <form id=\"comment-form\" class=\"collapse\" onsubmit=\"submitComment();\">\n      <div class=\"form-group row\">\n        <label for=\"js-comment-title\" class=\"col-sm-2 col-form-label\">\n          Title:\n        </label>\n        <div class=\"col-sm-10\">\n          <input id=\"js-comment-title\" type=\"text\" class=\"form-control\" placeholder=\"Title\">\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label for=\"js-comment-body\" class=\"col-sm-2 col-form-label\">\n          Comment:\n        </label>\n        <div class=\"col-sm-10\">\n          <textarea id=\"js-comment-body\" type=\"textarea\" class=\"form-control\" rows=\"6\" placeholder=\"Comment...\"></textarea>\n        </div>\n      </div>\n      <div class=\"form-group row\">\n      <div class=\"offset-sm-2 col-sm-10\">\n        <button id=\"js-comment-submit\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" type=\"submit\" class=\"custom-btn btn btn-md btn-primary\">Submit Comment</button>\n      </div>\n    </div>\n    </form>\n  </div>\n</div>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.comments : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div id=\"comment-history\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.comments : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});

this["Template"]["favorites"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.favorites : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <button class=\"dropdown-item js-favorite-item\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" type=\"button\">\n          "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n        </button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "      <button class=\"dropdown-item\" type=\"button\">No Favorites Here</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"dropdown\">\n  <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"user-dropdown\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n    Welcome "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n  </button>\n  <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"user-dropdown\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.favorites : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});

this["Template"]["headline"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <div class=\"card\">\n        <div id=\"article-"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"card-header\" role=\"tab\">\n          <h3 class=\"mb-0\"> "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + " </h3>\n        </div>\n      </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"news\" role=\"tablist\">\n  <label id=\"headline-list-head\">\n    <h2> Latest Headlines </h2>\n  </label>\n  <div id=\"headline-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.headline : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});

this["Template"]["title"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <div class=\"card\">\n        <div class=\"card-header headline js-headline\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" role=\"tab\">\n          <h5> "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + " </h5>\n        </div>\n      </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- Handlebars Article Headline Template -->\n<div class=\"news\" role=\"tablist\">\n  <label id=\"headline-list-head\">\n    <h2> Latest Headlines </h2>\n  </label>\n\n  <div id=\"headline-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.headline : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});