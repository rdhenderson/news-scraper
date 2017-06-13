this["Template"] = this["Template"] || {};

this["Template"]["detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <button id=\"comment-history-toggle\" type=\"button\" class=\"custom-btn btn btn-md btn-primary btn-block\" data-target=\"#comment-history\" data-toggle=\"collapse\">\n          Show comments\n        </button>\n";
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
    + " </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12 news\" role=\"tablist\">\n    <button id=\"add-favorite\" type=\"button\" class=\"custom-btn btn btn-md btn-primary btn-block\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n      Add To Favorites\n    </button>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12 news\" role=\"tablist\">\n    <button id=\"comment-form-toggle\" type=\"button\" class=\"custom-btn btn btn-md btn-primary btn-block\" data-target=\"#comment-form\" data-toggle=\"collapse\">\n      Add Comment\n    </button>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <form id=\"comment-form\" class=\"collapse\" onsubmit=\"submitComment();\">\n      <div class=\"form-group row\">\n        <label for=\"comment-title\" class=\"col-sm-2 col-form-label\">User Name</label>\n        <div class=\"col-sm-10\">\n          <input type=\"text\" class=\"form-control\" id=\"comment-user\" placeholder=\"Username\">\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label for=\"comment-title\" class=\"col-sm-2 col-form-label\">Title:</label>\n        <div class=\"col-sm-10\">\n          <input type=\"text\" class=\"form-control\" id=\"comment-title\" placeholder=\"Title\">\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label for=\"comment-body\" class=\"col-sm-2 col-form-label\">Comment:</label>\n        <div class=\"col-sm-10\">\n          <textarea type=\"textarea\" class=\"form-control\" id=\"comment-body\" rows=\"6\" placeholder=\"Comment...\"></textarea>\n        </div>\n      </div>\n      <div class=\"form-group row\">\n      <div class=\"offset-sm-2 col-sm-10\">\n        <button id=\"comment-submit\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" type=\"submit\" class=\"custom-btn btn btn-md btn-primary\">Submit Comment</button>\n      </div>\n    </div>\n    </form>\n  </div>\n</div>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.comments : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div id=\"comment-history\" class=\"collapse\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.comments : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});

this["Template"]["headline"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header-search\" role=\"tab\" id=\"article-"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n      <h5 class=\"mb-0\">\n        <h3 data-parent=\"#accordion\">\n          "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n        </h3>\n      </h5>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"accordion\" class=\"news\" role=\"tablist\">\n  <label id=\"headline-list-head\" data-toggle=\"collapse\" data-target=\"#headline-list\"> <h2> Latest Headlines </h2></label>\n  <div id=\"headline-list\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.headline : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});

this["Template"]["title"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"card\">\n    <div class=\"card-header-search headline\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" role=\"tab\">\n      <h5 data-parent=\"#accordion\">\n        "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n      </h5>\n    </div>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- Handlebars Article Headline Template -->\n<div class=\"news\" role=\"tablist\">\n  <h2> Latest Headlines </h2>\n  <div id=\"headline-list\" class=\"collapse show\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.headline : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});