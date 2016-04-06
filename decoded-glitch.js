// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "decoded",
			defaults = {
				showTime: 100,
				sprite: '/sprite.png',
				spriteSize: {width: 700, height: 700},
				glitchMaxSize: 20,
				orientation: 'both',
				mouseEvent: true,
				mouseProbability: 0.01,
				scrollEvent: true,
				scrollProbability: 0.1
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.$element = $(element);

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				this._size = {w: this.$element.innerWidth(), h: this.$element.outerHeight()};

				this._orientationValues = ['width', 'height'];
				this.showGlitch();
				this.setEvents();
			},
			setStyle: function(el) {
				var style = {
					position: 'fixed',
					top: Math.random() * this._size.h + 'px',
					left: Math.random() * this._size.w + 'px',
					'background-image': 'url("'+this.settings.sprite+'")',
					'background-position': Math.random() * this.settings.spriteSize.width + 'px ' + Math.random() * this.settings.spriteSize.height + 'px'
				},
				randomValue = 0,
				orientation = '';
				
				switch(this.settings.orientation) {
					case 'both':
						randomValue = Math.ceil(Math.random() * this._orientationValues.length);
					break;
					case 'horizontal':
						randomValue = 1;
					break;
					case 'vertical':
						randomValue = 2;
					break;
				}
				
				orientation = this._orientationValues[randomValue - 1];
				style[orientation] = Math.random() * this.settings.spriteSize[orientation] + 'px';
				style[(randomValue == 1) ? 'height': 'width'] = parseInt(Math.random() * this.settings.glitchMaxSize) + 'px';

				el.css(style);
			},
			generateElement: function( text ) {
				var el = $(document.createElement('div'));
				this.setStyle(el);
				return el;
			},
			showGlitch: function(el) {
				var el = this.generateElement();
				this.$element.append(el);

				el.fadeIn();
				/*if(Math.random() > 0.5) {
					el.animate({'bottom': parseInt(el.css('top')) + 20 + 'px'}, 100);
				} else {
					el.animate({'right': parseInt(el.css('left')) + 200 + 'px'}, 500);
				}*/
				//el.animate({'left': parseInt(el.css('left')) + ((Math.random()>0.5) ? 20:-20) + 'px'}, 100);
				setTimeout(function(){
					el.fadeOut(1, function(){
						$(this).remove();
					});
					//el.remove();
				}, parseInt(this.settings.showTime));
			},
			setEvents: function() {
				var that = this;
				if(this.settings.scrollEvent) {
					$(window).on('scroll', function(e){
						if(Math.random() < that.settings.scrollProbability)
							that.showGlitch();
					});
				}

				if(this.settings.scrollEvent) {
					this.$element.on('mousemove', function(e) {
						if(Math.random() < that.settings.mouseProbability)
							that.showGlitch();
					});
				}
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );