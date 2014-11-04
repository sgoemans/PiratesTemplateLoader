/**
 * Created by Goemans.Stephan on 03.11.2014.
 */
var templateLoader = {
	load: function (views, callback) {
		var deferreds = [];
		$.each(views, function (index, view) {
			if (window[view]) {
				/*
				 jQuery.get( url [, data ] [, success ] [, dataType ] ) is a shorthand Ajax function,
				 which is equivalent to:
				 $.ajax({
				 	url: url,
				 	data: data,
				 	success: success,
				 	dataType: dataType
				 });
				 This jQuery XHR object, or "jqXHR," returned by $.get() implements the Promise
				 interface, giving it all the properties, methods, and behavior of a Promise (see
				 Deferred object for more information).
				 */

				deferreds.push($.get('templates/' + view + '.html', function (data) {
					// Underscore compiles the template and returns a function which takes the
					// data argument to populate the template with.
					window[view].prototype.template = _.template(data);
				}, 'html'));
			} else {
				alert(view + " not found");
			}
		});
		/*
		 If a Deferred is passed to jQuery.when(), its Promise object (a subset of the
		 Deferred methods) is returned by the method. Additional methods of the Promise object can
		 be called to attach callbacks, such as deferred.then. When the Deferred is resolved or
		 rejected, usually by the code that created the Deferred originally, the appropriate
		 callbacks will be called. For example, the jqXHR object returned by jQuery.ajax() is a
		 Promise and can be used this way:
		 	$.when( { testing: 123 } ).done(function( x ) {
		 		alert( x.testing ); // Alerts "123"
		 	});
		 */
		$.when.apply(null, deferreds).done(callback);
	}
};

templateLoader.load(["HeaderView", "HomeView", "FooterView", "ListView", "ListItemView", "DetailsView", "SearchResultItemView"],
	function () {
		//app = new Router();
		//Backbone.history.start();
	});