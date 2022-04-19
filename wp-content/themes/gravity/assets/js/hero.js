/******************************************************************
	
	
	@ Item          Gravity // Coming Soon WordPress
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************/
 
 
 /******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Backgrounds
 
 
 ******************************************************************/




/** 1. BACKGROUNDS
*******************************************************************/



jQuery(document).ready(function($) {
	"use strict";	
	

	// IMAGE BACKGROUND FUNCTION
	function imageBackground() {
	
		// INIT VEGAS SLIDESHOW PLUGIN
		$(".bg-image").vegas({
			
			slides: [{src: background_image_image }],
			delay: 10,
			transitionDuration: 10,
			timer: false,
			
		});
	
	}
	
	
	// SLIDER BACKGROUND FUNCTION
	function sliderBackground() {
	
		// INIT VEGAS SLIDESHOW PLUGIN
		$(".grcs_background_content .bg-image").vegas({
			
			slides: background_slider_slides,
			transition: background_slider_transition,
			delay: background_slider_timeout,
			transitionDuration: background_slider_transition_duration,
            firstTransitionDuration: 1,
			timer: false,
			walk: function (index, slideSettings) {$(".grcs_text_slider").cycle("next");}
			
		});
	
	}
	
	
	// KENBURNS SLIDER BACKGROUND FUNCTION
	function kenburnsBackground() {
		
		// INIT VEGAS SLIDESHOW PLUGIN
		$(".grcs_background_content .bg-image").vegas({
			
			slides: background_kenburns_slides,
			transition: background_kenburns_transition,
			delay: background_kenburns_timeout,
			transitionDuration: background_kenburns_transition_duration,
            firstTransitionDuration: 1,
			timer: false,
			animation: background_kenburns_effect,
			walk: function (index, slideSettings) {$(".grcs_text_slider").cycle("next");}
			
		});
	
	}
	
	
	// YOUTUBE BACKGROUND FUNCTION
	function youtubeBackground() {
	    
        // MOBILE FALLBACK
        if ( jQuery.browser.mobile ) {
            
            $(".grcs_background_content .bg-image").vegas({

                slides: [{src: background_youtube_fallback_image }],
                delay: 100,
                transitionDuration: 100,
                timer: false,

            });
            
            return;
            
        }
        
        if (background_youtube_controls == 1) {
            $("body").append('<div class="grcs_youtube_controls"><i class="volume-button fa fa-volume-up"></i> <i class="pause-button ti-control-pause"></i></div>');  
        }
        
		if (background_youtube_sound == 1) {
            background_youtube_sound = 0;
		} else {
             background_youtube_sound = 1;
            $(".grcs_youtube_controls .volume-button").removeClass("fa-volume-up").addClass("fa-volume-off");
        }
		
		// INIT YOUTUBE BACKGROUND VIDEO PLUGIN
		$(".grcs_background_content .bg-video").append('<div id="bg-youtube" class="player showOn-video-bg"></div>');
		$("#bg-youtube").attr('data-property', '{videoURL:background_youtube_url,containment:".bg-video",autoPlay:true,mute:background_youtube_sound,startAt: background_youtube_start_point,stopAt: background_youtube_end_point,opacity:1,stopMovieOnBlur:false,showControls:false,loop:true}');
	
		// INIT YOUTUBE BACKGROUND VIDEO PLUGIN
		$(".player").mb_YTPlayer();
		
		// PLAYER SOUND CONTROLLER
		$(".grcs_youtube_controls .volume-button").click(function() {
			
			if($("#bg-youtube").hasClass("isMuted")) {
				
				$("#bg-youtube").YTPUnmute(); 
				$( ".grcs_youtube_controls .volume-button" ).removeClass("fa-volume-off").addClass("fa-volume-up");
				
			} else {
				
				$("#bg-youtube").YTPMute();
				$(".grcs_youtube_controls .volume-button").removeClass("fa-volume-up").addClass("fa-volume-off");
				
			}
		
		});
		
		var stBtnCheck = true;
		
		// DO SOMETHING WHEN PLAYER IS PAUSED
		$("#bg-youtube").on("YTPPause",function(){
			
			stBtnCheck = false;
		
		});
		
		// DO SOMETHING WHEN PLAYER IS PLAYING
		$("#bg-youtube").on("YTPPlay",function(){
			
			stBtnCheck = true;
		
		});
		
		// PAUSE PLAYER ON CLICK
		$( ".grcs_youtube_controls .pause-button" ).click(function() {
			
			if (stBtnCheck == true) {
				
				$("#bg-youtube").YTPPause();
				$( ".grcs_youtube_controls .pause-button" ).removeClass("ti-control-pause").addClass("ti-control-play");
				
			} else {
				
				$("#bg-youtube").YTPPlay();
				$( ".grcs_youtube_controls .pause-button" ).removeClass("ti-control-play").addClass("ti-control-pause");
				
			}
		
		});
        
        $('#bg-youtube').on("YTPReady",function(e){
            
            setTimeout(function() {	
                
                $("#bg-youtube").YTPPlay();
                
            },500);
            
        });
		
	}
	
	
	// SOLID COLOR BACKGROUND FUNCTION
	function colorBackground() {
        
		$(".grcs_background_content .bg-color").css("background",background_color_color);
        $(".grcs_background_content .bg-color").css("opacity","1");
		
		// REMOVE PATTERN AND OVERLAY
		$(".grcs_background_content .bg-pattern").remove();
		$(".grcs_background_content .bg-overlay").remove();
	
	}
	
	
	// GRADIENT BACKGROUND FUNCTION
	function gradientBackground() {
        
        // HEX TO RGB CONVERTER
        function hexToRgb(hex) {
            
            hex = hex.replace("#", "");
            
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            return [r, g, b];
        }
		
		// COLOR ARRAY
		var colors = new Array( hexToRgb(background_gradient_color_1), 
                                hexToRgb(background_gradient_color_2), 
                                hexToRgb(background_gradient_color_3), 
                                hexToRgb(background_gradient_color_4), 
                                hexToRgb(background_gradient_color_5), 
                                hexToRgb(background_gradient_color_6) );
		
		var step = 0;
		
		var selector = $(".grcs_background_content .bg-color");
		
		//COLOR TABLE: 
		var colorIndices = [0,1,2,3];
		
		//TRANSITION SPEED
		var gradientSpeed = parseFloat(background_gradient_speed)/40000;
		
		function updateGradient() {
			
			var c0_0 = colors[colorIndices[0]];
			var c0_1 = colors[colorIndices[1]];
			var c1_0 = colors[colorIndices[2]];
			var c1_1 = colors[colorIndices[3]];
			
			var istep = 1 - step;
			var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
			var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
			var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
			var color1 = "rgb("+r1+","+g1+","+b1+")";
			
			var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
			var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
			var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
			var color2 = "rgb("+r2+","+g2+","+b2+")";
			
			selector.css({
			background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
			background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});	
			
			step += gradientSpeed;
			
			if ( step >= 1 )
			{
				
				step %= 1;
				colorIndices[0] = colorIndices[1];
				colorIndices[2] = colorIndices[3];
				
				colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
				colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
			
			}
			
		}
		setInterval(updateGradient,1);
		
        $(".grcs_background_content .bg-color").css("opacity","1");
		$(".grcs_background_content .bg-pattern").remove();
		$(".grcs_background_content .bg-overlay").remove();
	
	}
	
	
	// CANVAS SPHERE BACKGROUND FUNCTION
	function canvasSphereBackground() {
        
		$(".grcs_background_content .bg-overlay").remove();
        $(".grcs_background_content .bg-pattern").remove();
		
		// THREE.JS BASED
		var SCREEN_WIDTH = $(".grcs_background_content .level-1").width(),
			SCREEN_HEIGHT = $(".grcs_background_content .level-1").height(),
	
			mouseX = 0, mouseY = 0,
	
			windowHalfX = SCREEN_WIDTH / 2,
			windowHalfY = SCREEN_HEIGHT / 2,
	
			camera, scene, renderer;
	
			init();
			animate();
	
			function init() {
	
				var container, separation = 100, amountX = 50, amountY = 50,
				particles, particle;
				
				container = document.createElement("div");
				document.getElementById("canvas").appendChild(container);
	
				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = background_sphere_distance * 10;
	
				scene = new THREE.Scene();
				
				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );
				renderer.setClearColor( background_sphere_background_color );
				
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {
	
					color: background_sphere_dot_color,
					program: function ( context ) {
	
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
	
					}
	
				} );
	
				for ( var i = 0; i < 1000; i ++ ) {
	
					particle = new THREE.Sprite( material );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 2 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					particle.position.multiplyScalar( Math.random() * 10 + 450 );
					particle.scale.multiplyScalar( 2 );
					scene.add( particle );
	
				}
	
				for (var i = 0; i < 300; i++) {
	
					var geometry = new THREE.Geometry();
	
					var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
					vertex.normalize();
					vertex.multiplyScalar( 450 );
	
					geometry.vertices.push( vertex );
	
					var vertex2 = vertex.clone();
					vertex2.multiplyScalar( Math.random() * 0.3 + 1 );
	
					geometry.vertices.push( vertex2 );
	
					var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: background_sphere_line_color, opacity: Math.random() } ) );
					scene.add( line );
				}
	
				document.addEventListener( "mousemove", onDocumentMouseMove, false );
				//document.addEventListener( "touchstart", onDocumentTouchStart, false );
				//document.addEventListener( "touchmove", onDocumentTouchMove, false );
	
				window.addEventListener( "resize", onWindowResize, false );
	
			}
	
			function onWindowResize() {
                
                var SCREEN_WIDTH = $(".grcs_background_content .level-1").width(),
			        SCREEN_HEIGHT = $(".grcs_background_content .level-1").height(),
	
				windowHalfX = SCREEN_WIDTH / 2;
				windowHalfY = SCREEN_HEIGHT / 2;
	
				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();
	
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	
			}
	
			function onDocumentMouseMove(event) {
	
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}
	
			function onDocumentTouchStart( event ) {
	
				if ( event.touches.length > 1 ) {
	
					event.preventDefault();
	
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
	
				}
	
			}
	
			function onDocumentTouchMove( event ) {
	
				if ( event.touches.length === 1 ) {
	
					event.preventDefault();
	
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
	
				}
	
			}
	
			function animate() {
	
				requestAnimationFrame( animate );
	
				render();
	
			}
			
			function render() {
					
                camera.position.x += ( mouseX - camera.position.x ) * 0.05;
                camera.position.y += ( - mouseY + 200 - camera.position.y ) * 0.05;
                camera.lookAt( scene.position );
					
                scene.rotation.y += background_sphere_rotation_speed / 10000;
					
                renderer.render( scene, camera );
				
			}
	
	}
	
	
	// CANVAS WAVES BACKGROUND FUNCTION
	function canvasWavesBackground() {
		
		// Z-INDEX CORRECTION BACKGROUND OVERLAY AND PATTERN REMOVE
		$(".grcs_background_content .bg-overlay").remove();
        $(".grcs_background_content .bg-pattern").remove();
	
		// THREE.JS BASED
		var SEPARATION = background_waves_dot_spacing, AMOUNTX = background_waves_dot_amount_x, AMOUNTY = background_waves_dot_amount_y;

			var SCREEN_WIDTH = $(".grcs_background_content .level-1").width();
			var SCREEN_HEIGHT = $(".grcs_background_content .level-1").height();
			var container;
			var camera, scene, renderer;

			var particles, particle, count = 0;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = SCREEN_WIDTH / 2;
			var windowHalfY = SCREEN_HEIGHT / 2;

			init();
			animate();

			function init() {

				container = document.createElement("div");
				document.getElementById("canvas").appendChild(container);

				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = background_waves_distance * 100;

				scene = new THREE.Scene();

				particles = new Array();

				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {

					color: background_waves_dot_color,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();

					}

				} );

				var i = 0;

				for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

						particle = particles[ i ++ ] = new THREE.Sprite( material );
						particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
						particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
						scene.add( particle );

					}

				}

				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );
				renderer.setClearColor( background_waves_background_color );

				document.addEventListener( "mousemove", onDocumentMouseMove, false );
				//document.addEventListener( "touchstart", onDocumentTouchStart, false );
				//document.addEventListener( "touchmove", onDocumentTouchMove, false );

				window.addEventListener( "resize", onWindowResize, false );

			}

			function onWindowResize() {

                var SCREEN_WIDTH = $(".grcs_background_content .level-1").width(),
			        SCREEN_HEIGHT = $(".grcs_background_content .level-1").height();
                
				windowHalfX = SCREEN_WIDTH / 2;
				windowHalfY = SCREEN_HEIGHT / 2;

				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

			}

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}


			function animate() {
					
				requestAnimationFrame( animate );
				
				render();


			}

			function render() {
					
                camera.position.x += ( mouseX - camera.position.x ) * 0.05;
                camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
                camera.lookAt( scene.position );
	
                var i = 0;
	
                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
	
				                for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
	
				                particle = particles[ i++ ];
				                particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * background_waves_dot_intensity * 5 ) +
				                	( Math.sin( ( iy + count ) * 0.5 ) * background_waves_dot_intensity * 5 );
				                particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * ( background_waves_dot_expansion / 1.25 ) +
				                	( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * ( background_waves_dot_expansion / 1.25 );
	
				                }
	
                }
	
                renderer.render( scene, camera );
	
                count += 0.1;

			}
	
	}
	
	
	// CANVAS MESH BACKGROUND FUNCTION
	function meshBackground() {
		
		var c,
			ctx,
			w,
			h,
			spacing,
			spread,
			basePoint,
			rightPoint,
			botPoint,
			mouse,
			mouseMoved,
			cols,
			rows,
			points,
			tick;
		
		function Point( opt ) {
			
			this.x = opt.x;
			this.y = opt.y;
			this.xBase = this.x;
			this.yBase = this.y;
			this.offset = rand( 0, 1000 );
			this.duration = rand( 20, 60 );
			this.range = rand( 5, 5 );
			this.dir = rand( 0, 1 ) > 0.5 ? 1 : -1;
			this.rad = rand( 2, 4 );
			
		}
		
		Point.prototype.step = function() {
			
			this.x = this.xBase + this.dir * Math.sin( ( tick + this.offset ) / this.duration ) * this.range;
			this.y = this.yBase + this.dir * Math.cos( ( tick + this.offset ) / this.duration ) * this.range;
			
			var angle = angleTo( this, mouse );
			 
			this.x = this.x + Math.cos( angle )	* 100;
			this.y = this.y + Math.sin( angle )	* 100;
			
		};
		
		function rand( min, max ) {
			
			return Math.random() * ( max - min ) + min;
			
		}
		
		function dist( p1, p2 ) {
			
			var dx = p1.x - p2.x,
				dy = p1.y - p2.y;
				
			return Math.sqrt( dx * dx + dy * dy );
			
		}
		
		function angleTo( p1, p2 ) {
			
			var dx = p1.x - p2.x,
				dy = p1.y - p2.y;
				
			return Math.atan2( dy, dx );
			
		}
		
		function init() {
			
			c = document.createElement( 'canvas' );
			ctx = c.getContext( '2d' );
			mouse = { x: 0, y: 0 };
			points = [];
			spacing = parseFloat(background_mesh_line_mesh_size);
			spread = spacing * 0.22;
			document.getElementById("canvas").appendChild( c );
			reset();
			loop();
				
		}
		
		function reset() {
			
			w = $(".grcs_background_content .level-1").width();
			h = $(".grcs_background_content .level-1").height();
			c.width = w;
			c.height = h;
			mouse.x = w / 2;
			mouse.y = h / 2;
			mouseMoved = false;
			cols = 0;
			rows = 0;
			points.length = 0;
			tick = 0;
			create();
			
			ctx.strokeStyle = background_mesh_line_color;
			ctx.lineWidth = 2;
			
		}
		
		function create() {
			
			for( var x = -spacing / 2; x < w + spacing; x += spacing ) {
				
				cols++;
				
				for( var y = -spacing / 2; y < h + spacing; y += spacing ) {
					
					if( x == -spacing / 2 ) {
						
						rows++;
						
					}
					
					points.push( new Point({
						
						x: ~~( x + rand( -spread, spread ) ),
						y: ~~( y + rand( -spread, spread ) )
						
					}));
					
				}
				
			}
			
		}
		
		function step() {
			
			if( !mouseMoved ) {
				
				mouse.x = w / 2 + Math.cos( tick / 40 ) * 90;
				mouse.y = h / 2 + Math.sin( tick / 40 ) * 90;
				
			}
			
			points.forEach( function( point ) {
				
				point.step();
				
			});
			
			tick++;
			
		}
		
		function draw() {
			
			ctx.clearRect( 0, 0, w, h );
			ctx.beginPath();
			
			for( var x = 0; x < cols; x++ ) {
				
				for( var y = 0; y < rows; y++ ) {
					
					basePoint = points[ x * rows + y ];
					rightPoint = x === cols - 1 ? null : points[ ( x + 1 ) * rows + y ];
					botPoint = y === rows - 1 ? null : points[ x * rows + y + 1 ];
					
					if( rightPoint ) {
						
						ctx.moveTo( basePoint.x, basePoint.y );
						ctx.lineTo( rightPoint.x, rightPoint.y );
						
					}
					
					if( botPoint ) {
						
						ctx.moveTo( basePoint.x, basePoint.y );
						ctx.lineTo( botPoint.x, botPoint.y );
						
					}
					
				}
				
			}
			
			ctx.stroke();
			
			ctx.fillStyle = 'red';
			points.forEach( function( point ) {
				
				ctx.save();
				ctx.beginPath();
				ctx.translate( point.x, point.y );
				ctx.rotate( Math.PI / 4 );
				ctx.rect(  0, 0 , 0, 0 );
				ctx.fill();
				ctx.stroke();
				ctx.restore();
				
			});
			
			var grad = ctx.createRadialGradient( mouse.x, mouse.y, 0, mouse.x, mouse.y, background_mesh_spotlight_size );
			
			grad.addColorStop( 0, 'hsla(0, 0%, 0%, 0.1)' );
			grad.addColorStop( 1, 'hsla(0, 0%, 0%, 0.96)' );
			
			ctx.fillStyle = grad;
			ctx.fillRect( 0, 0, w, h );
			
		}
		
		function loop() {
			
			requestAnimationFrame( loop );
			step();
			draw();
			
		}
		
		function mousemove( e ) {
			
			mouseMoved = true;
			mouse.x = e.pageX;
			mouse.y = e.pageY;
			
		}
		
		window.addEventListener( 'resize', reset );
		window.addEventListener( 'mousemove', mousemove );
		
		init();
        
        // REMOVE OVERLAY AND PATTERN
        $(".grcs_background_content .bg-overlay").remove();
        $(".grcs_background_content .bg-pattern").remove();
	} 
	
	
	// CANVAS SPACE BACKGROUND FUNCTION
	function spaceBackground() {
		
        $(".grcs_background_content .bg-pattern").remove();
        
		/**
		 * A jQuery plugin that generates an interactive starfield inside a canvas element.
		 *
		 * Based on Chiptune's starfield.js:
		 * https://github.com/chiptune/js/blob/master/starfield.html
		 */
		;
		(function($, window, document, undefined) {
		  // Plugin constructor
		  var Starfield = function(el, options) {
			this.el = el;
			this.$el = $(el);
			this.options = options;
		
			that = this;
		  };
		
		  var isPlaying;
		  var isInited = false;
		  var canCanvas = false;
		  var animId;
		  var that;
		
		  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
		
		  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
		
		  // MIT license
		
		  (function() {
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
				window[vendors[x] + 'CancelRequestAnimationFrame'];
			}
		
			if (!window.requestAnimationFrame)
			  window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				  },
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			  };
		
			if (!window.cancelAnimationFrame)
			  window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			  };
		  }());
		
		  // Plugin prototype
		  Starfield.prototype = {
			// Default settings
			defaults: {
			  starColor: background_space_star_color,
			  bgColor: background_space_background_color,
			  mouseMove: parseFloat(background_space_mouse_interaction),
			  speed: background_space_star_speed / 20,
			  quantity: background_space_star_amount,
			  ratio: background_space_star_amount / 2,
			  divclass: "starfield"
			},
              
            // Resize the canvas
            resizer: function() {
                var oldStar				= this.star;
                var initW				= this.context.canvas.width;
                var initH				= this.context.canvas.height;

                this.w					= this.$el.width();
                this.h					= this.$el.height();
                this.x					= Math.round(this.w / 2);
                this.y					= Math.round(this.h / 2);

                // Get the ratio of the old height to the new height
                var ratX 				= this.w / initW;
                var ratY				= this.h / initH;

                this.context.canvas.width	= this.w;
                this.context.canvas.height	= this.h;

                // Recalculate the position of each star proportionally to new w and h
                for(var i = 0; i < this.n; i++) {
                    this.star[i][0]	= oldStar[i][0] * ratX;
                    this.star[i][1]	= oldStar[i][1] * ratY;

                    this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
                    this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;
                }

                that.context.fillStyle		= that.settings.bgColor;
                this.context.strokeStyle	= this.settings.starColor;
            },
		
			init: function() {
			  // Get default settings 
			  this.settings = $.extend({}, this.defaults, this.options);
		
			  // Query variables
			  var url = document.location.href;
			  this.n = parseInt(this.settings.quantity);
			  this.flag = true;
			  this.test = true;
			  this.w = 0;
			  this.h = 0;
			  this.x = 0;
			  this.y = 0;
			  this.z = 0;
			  this.star_color_ratio = 0;
			  this.star_x_save = 0;
			  this.star_y_save = 0;
			  this.star_ratio = this.settings.ratio;
			  this.star_speed = this.settings.speed;
			  this.star_speed_save = 0;
                
			  this.star = new Array(this.n);
			  this.color = this.settings.starColor;
			  this.opacity = 0.1;
		
			  this.cursor_x = 0;
			  this.cursor_y = 0;
			  this.mouse_x = 0;
			  this.mouse_y = 0;
		
			  this.canvas_x = 0;
			  this.canvas_y = 0;
			  this.canvas_w = 0;
			  this.canvas_h = 0;
		
			  this.fps = this.settings.fps;
		
			  // Check for device orientation support
			  this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|IEMobile)/);
			  this.orientationSupport = window.DeviceOrientationEvent !== undefined;
			  this.portrait = null;
		
			  // Inject the canvas element
			  var canvasInit = function() {
				that.w = that.$el.width();
				that.h = that.$el.height();
		
				that.initW = that.w;
				that.initH = that.h;
		
				that.portrait = that.w < that.h;
		
				that.wrapper = $('<canvas />')
				  .addClass(that.settings.divclass);
		
				that.wrapper.appendTo(that.el);
		
				that.starz = $('canvas', that.el);
		
				if (that.starz[0].getContext) { // Can canvas?
				  that.context = that.starz[0].getContext('2d');
				  canCanvas = true;
				}
		
				that.context.canvas.width = that.w;
				that.context.canvas.height = that.h;
			  }
			  canvasInit();
		
			  // Create initial star array and canvas context
			  var starInit = function() {
				// Get context for the canvas element
				if (canCanvas) { // Check for canvas drawering abilities.
				  that.x = Math.round(that.w / 2);
				  that.y = Math.round(that.h / 2);
				  that.z = (that.w + that.h) / 2;
				  that.star_color_ratio = 1 / that.z;
				  that.cursor_x = that.x;
				  that.cursor_y = that.y;
		
				  // Big bang
				  for (var i = 0; i < that.n; i++) {
					that.star[i] = new Array(5);
		
					that.star[i][0] = Math.random() * that.w * 2 - that.x * 2;
					that.star[i][1] = Math.random() * that.h * 2 - that.y * 2;
					that.star[i][2] = Math.round(Math.random() * that.z);
					that.star[i][3] = 0;
					that.star[i][4] = 0;
				  }
		
				  // Set the colors
				  that.context.fillStyle = that.settings.bgColor;
				  that.context.strokeStyle = that.settings.starColor;
				} else {
				  return;
				}
			  }
			  starInit();
		
			  isInited = true;
			},
		
			// Iterate over every star on the field and move it slightly
			anim: function() {
			  this.mouse_x = this.cursor_x - this.x;
			  this.mouse_y = this.cursor_y - this.y;
			  this.context.fillRect(0, 0, this.w, this.h);
		
			  for (var i = 0; i < this.n; i++) {
				this.test = true;
				this.star_x_save = this.star[i][3];
				this.star_y_save = this.star[i][4];
				this.star[i][0] += this.mouse_x >> 4;
		
				// X coords
				if (this.star[i][0] > this.x << 1) {
				  this.star[i][0] -= this.w << 1;
				  this.test = false;
				}
				if (this.star[i][0] < -this.x << 1) {
				  this.star[i][0] += this.w << 1;
				  this.test = false;
				}
		
				// Y coords
				this.star[i][1] += this.mouse_y >> 4;
				if (this.star[i][1] > this.y << 1) {
				  this.star[i][1] -= this.h << 1;
				  this.test = false;
				}
				if (this.star[i][1] < -this.y << 1) {
				  this.star[i][1] += this.h << 1;
				  this.test = false;
				}
		
				// Z coords
				this.star[i][2] -= this.star_speed;
				if (this.star[i][2] > this.z) {
				  this.star[i][2] -= this.z;
				  this.test = false;
				}
				if (this.star[i][2] < 0) {
				  this.star[i][2] += this.z;
				  this.test = false;
				}
		
				this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
				this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;
		
				if (this.star_x_save > 0 &&
				  this.star_x_save < this.w &&
				  this.star_y_save > 0 &&
				  this.star_y_save < this.h &&
				  this.test) {
				  this.context.lineWidth = (1 - this.star_color_ratio * this.star[i][2]) * 2;
				  this.context.beginPath();
				  this.context.moveTo(this.star_x_save, this.star_y_save);
				  this.context.lineTo(this.star[i][3], this.star[i][4]);
				  this.context.stroke();
				  this.context.closePath();
				}
			  }
			},
		
			loop: function() {
			  this.anim();
		
			  animId = window.requestAnimationFrame(function() {
				that.loop()
			  });
			},
		
			move: function() {
			  var doc = document.documentElement;
		
			  if (this.orientationSupport && !this.desktop) {
				window.addEventListener('deviceorientation', handleOrientation, false);
			  } else {
				window.addEventListener('mousemove', handleMousemove, false);

			  }
		
			  function handleOrientation(event) {
				if (event.beta !== null && event.gamma !== null) {
				  var x = event.gamma,
					y = event.beta;
		
				  if (!that.portrait) {
					x = event.beta * -1;
					y = event.gamma;
				  }
		
				  that.cursor_x = (that.w / 2) + (x * 5);
				  that.cursor_y = (that.h / 2) + (y * 5);
                    
				}
			  }
		
			  function handleMousemove(event) {
				that.cursor_x = event.pageX || event.clientX + doc.scrollLeft - doc.clientLeft;
				that.cursor_y = event.pageY || event.clientY + doc.scrollTop - doc.clientTop;
			  }
			},
		
			stop: function() {
			  window.cancelAnimationFrame(animId);
		
			  isPlaying = false;
			},
		
			// this.start this whole thing
			start: function() {
			  // Initialize
			  if (!isInited) {
				isInited = true;
				this.init();
			  }
		
			  // Start the animation loop
			  if (!isPlaying) {
				isPlaying = true;
				this.loop();
			  }
			  window.addEventListener('resize', function() {
				that.resizer()
			  }, false);
		
			  window.addEventListener('orientati onchange', function() {
				that.resizer()
			  }, false);
		
			  // Move stars on mouse move
			  if (this.settings.mouseMove) {
				this.move();
			  }
		
			  return this;
			}
		  }
		
		  Starfield.defaults = Starfield.prototype.defaults;
		
		  // Finally, the actual plugin code
		  $.fn.starfield = function(options) {
			return this.each(function() {
			  new Starfield(this, options).start();
			});
		  }
		
		  window.Starfield = Starfield;
            
		})(jQuery, window, document);
		
		$('#canvas').starfield();
			
	}
    
    
    
    // ABSTRACT BACKGROUND FUNCTION
	function abstractBackground() {
	
		$(".grcs_background_content .bg-pattern").remove();
		$(".grcs_background_content .bg-overlay").remove();

		var bgInterval = setInterval(function(){

			if( $(".grcs_background_content .level-1 #canvas").offset().top <= 50 ) {
				
				$(".grcs_background_content .level-1 #canvas").css({ WebkitTransition: "all .4s" ,transition: "all .4s" });
				$(".grcs_background_content .level-1 #canvas").css("background",background_abstract_background_color);

				clearInterval(bgInterval);
				
			}
			
		}, 50);
		
		var MESH = {
			width: background_abstract_shader_width / 100,
			height: 1.8,
			depth: 60,
			segments: 9,
			slices: 8,
			xRange: background_abstract_width_expansion,
			yRange: 0.1,
			zRange: 1.0,
			ambient: '#666666',
			diffuse: '#fff',
			speed: background_abstract_move_speed / 10000
		};
		
		var LIGHT = {
			count: 2,
			xyScalar: 1,
			zOffset: 100,
			ambient: '#fff',
			diffuse: '#b3b3b3',
			speed: 0.0002,
			gravity: 500,
			dampening: 0.95,
			minLimit: 10,
			maxLimit: null,
			minDistance: 20,
			maxDistance: 400,
			autopilot: true,
			draw: false,
			bounds: FSS.Vector3.create(),
			step: FSS.Vector3.create(
			  Math.randomInRange(0.2, 1.0),
			  Math.randomInRange(0.2, 1.0),
			  Math.randomInRange(0.2, 1.0)
			)
		};
		
		var RENDER = {
			renderer: 'canvas'
		};
		
		var now, start = Date.now();
		var center = FSS.Vector3.create();
		var attractor = FSS.Vector3.create();
		var container = document.getElementById('canvas');
		var output = document.getElementById('canvas');
		var renderer, scene, mesh, geometry, material;
		var canvasRenderer;
		var gui, autopilotController;
		
		function initialise() {
            
			createRenderer();
			createScene();
			createMesh();
			createLights();
			addEventListeners();
			resize(container.offsetWidth, container.offsetHeight);
			animate();
            
		}

		function createRenderer() {
			
			canvasRenderer = new FSS.CanvasRenderer();
			setRenderer(RENDER.renderer);
			
		}

		function setRenderer(index) {
			
			if (renderer) {
			  output.removeChild(renderer.element);
			}

			renderer = canvasRenderer;

			renderer.setSize(container.offsetWidth, container.offsetHeight);
			output.appendChild(renderer.element);
			
		}

		function createScene() {
			scene = new FSS.Scene();
		}

		function createMesh() {
			
			scene.remove(mesh);
			renderer.clear();
			geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.segments, MESH.slices);
			material = new FSS.Material(MESH.ambient, MESH.diffuse);
			mesh = new FSS.Mesh(geometry, material);
			scene.add(mesh);

			// Augment vertices for animation
			var v, vertex;
			for (v = geometry.vertices.length - 1; v >= 0; v--) {
				
				vertex = geometry.vertices[v];
				vertex.anchor = FSS.Vector3.clone(vertex.position);
				vertex.step = FSS.Vector3.create(
					Math.randomInRange(0.2, 1.0),
					Math.randomInRange(0.2, 1.0),
					Math.randomInRange(0.2, 1.0)
				);
				vertex.time = Math.randomInRange(0, Math.PIM2);
				
			}
			
		}

		function createLights() {
			
			var l, light;
			for (l = scene.lights.length - 1; l >= 0; l--) {
                
				light = scene.lights[l];
				scene.remove(light);
                
			}
			
			renderer.clear();
			
			for (l = 0; l < LIGHT.count; l++) {
				
				light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
				light.ambientHex = light.ambient.format();
				light.diffuseHex = light.diffuse.format();
				scene.add(light);

				// Augment light for animation
				light.mass = Math.randomInRange(0.5, 1);
				light.velocity = FSS.Vector3.create();
				light.acceleration = FSS.Vector3.create();
				light.force = FSS.Vector3.create();

				// Ring SVG Circle
				light.ring = document.createElementNS(FSS.SVGNS, 'circle');
				light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
				light.ring.setAttributeNS(null, 'stroke-width', '0.5');
				light.ring.setAttributeNS(null, 'fill', 'none');
				light.ring.setAttributeNS(null, 'r', '10');

				// Core SVG Circle
				light.core = document.createElementNS(FSS.SVGNS, 'circle');
				light.core.setAttributeNS(null, 'fill', light.diffuseHex);
				light.core.setAttributeNS(null, 'r', '4');
				
			}
			
		}

		function resize(width, height) {
			
			renderer.setSize(width, height);
			FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
			createMesh();
			
		}

		function animate() {
			
			now = Date.now() - start;
			update();
			render();
			requestAnimationFrame(animate);
			
		}

		function update() {
			
			var ox, oy, oz, l, light, v, vertex, offset = MESH.depth/2;

			// Update Bounds
			FSS.Vector3.copy(LIGHT.bounds, center);
			FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

			// Update Attractor
			FSS.Vector3.setZ(attractor, LIGHT.zOffset);

			// Overwrite the Attractor position
			if (LIGHT.autopilot) {
			  ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
			  oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
			  FSS.Vector3.set(attractor,
				LIGHT.bounds[0]*ox,
				LIGHT.bounds[1]*oy,
				LIGHT.zOffset);
			}

			// Animate Lights
			for (l = scene.lights.length - 1; l >= 0; l--) {
				
			  light = scene.lights[l];

			  // Reset the z position of the light
			  FSS.Vector3.setZ(light.position, LIGHT.zOffset);

			  // Calculate the force Luke!
			  var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT.minDistance, LIGHT.maxDistance);
			  var F = LIGHT.gravity * light.mass / D;
			  FSS.Vector3.subtractVectors(light.force, attractor, light.position);
			  FSS.Vector3.normalise(light.force);
			  FSS.Vector3.multiplyScalar(light.force, F);

			  // Update the light position
			  FSS.Vector3.set(light.acceleration);
			  FSS.Vector3.add(light.acceleration, light.force);
			  FSS.Vector3.add(light.velocity, light.acceleration);
			  FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
			  FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
			  FSS.Vector3.add(light.position, light.velocity);
				
			}

			// Animate Vertices
			for (v = geometry.vertices.length - 1; v >= 0; v--) {
				
			  vertex = geometry.vertices[v];
			  ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
			  oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
			  oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
			  FSS.Vector3.set(vertex.position,
				MESH.xRange*geometry.segmentWidth*ox,
				MESH.yRange*geometry.sliceHeight*oy,
				MESH.zRange*offset*oz - offset);
			  FSS.Vector3.add(vertex.position, vertex.anchor);
				
			}

			// Set the Geometry to dirty
			geometry.dirty = true;
			
		}

		function render() {
			renderer.render(scene);

			// Draw Lights
			if (LIGHT.draw) {

			  var l, lx, ly, light;
			  for (l = scene.lights.length - 1; l >= 0; l--) {
				  
				light = scene.lights[l];
				lx = light.position[0];
				ly = light.position[1];
				renderer.context.lineWidth = 0.5;
				renderer.context.beginPath();
				renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
				renderer.context.strokeStyle = light.ambientHex;
				renderer.context.stroke();
				renderer.context.beginPath();
				renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
				renderer.context.fillStyle = light.diffuseHex;
				renderer.context.fill();

			  }

			}
		}

		function addEventListeners() {
			window.addEventListener('resize', onWindowResize);
		}

		function onMouseMove(event) {
			FSS.Vector3.set(attractor, event.x, renderer.height - event.y);
			FSS.Vector3.subtract(attractor, center);
		}

		function onWindowResize(event) {
			resize(container.offsetWidth, container.offsetHeight);
			render();
		}
		
		initialise();


		if (canvas.getContext) {
			
			var ctx = canvas.getContext('2d');
			var left = true;

			canvas.height = screen.height - 60;
			canvas.width = screen.width + 20;

			initialize();
			initialize();

			var timer = setInterval(function () {

				for (var i = 1; i <= 1000; i++) {
					
					ctx.beginPath();
					if (left) {
						ctx.moveTo(0, randomize(canvas.height + 10));
						left = false;
					} else {
						ctx.moveTo(randomize(canvas.width+ 10), 0);
						left = true;
					}
					ctx.lineTo(randomize(canvas.width + 50), randomize(canvas.height  + 50));
					ctx.lineTo(randomize(canvas.width + 50), randomize(canvas.height + 50));
					ctx.fillStyle = getRndColor();
					ctx.fill();
					
				}
				
			}, 5000);
			
		}
	
	}
	
	
	
	// GLITCH BACKGROUND FUNCTION
	function glitchBackground() {
		
		var bgImage = "background-image: url('"+background_glitch_image+"')";
		$(".grcs_background_content .level-2 .bg-image").append('<div class="glitch-img" style="'+bgImage+'"></div>');
		$( ".grcs_background_content .glitch-img" ).mgGlitch({
			destroy : false, 
			glitch: true, 
			scale: Boolean(background_glitch_scale_toggle),
			blend : true, 
			blendModeType : 'hue', 
			glitch1TimeMin : 600, 
			glitch1TimeMax : 900, 
			glitch2TimeMin : 10, 
			glitch2TimeMax : 115,
			zIndexStart : 8, 
		});
		
	}
    
    
    
    // RAIN BACKGROUND FUNCTION
	function rainBackground() {
    
          var canvas = $('#canvas canvas')[0];
        
          $('#canvas canvas').css("background",background_rain_background_color); 
    
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          if(canvas.getContext) {

            var ctx = canvas.getContext('2d');
            var w = canvas.width;
            var h = canvas.height;

            ctx.strokeStyle = background_rain_color;
            ctx.lineWidth = background_rain_thickness;
            ctx.lineCap = 'round';


            var init = [];
            var maxParts = background_rain_amount;

            for(var a = 0; a < maxParts; a++) {
              init.push({
                x: Math.random() * w,
                y: Math.random() * h,
                l: Math.random() * 1,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10
              })
            }

            var particles = [];
            for(var b = 0; b < maxParts; b++) {
              particles[b] = init[b];
            }

            function draw() {
              ctx.clearRect(0, 0, w, h);
              for(var c = 0; c < particles.length; c++) {
                var p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
              }
              move();
            }

            function move() {
              for(var b = 0; b < particles.length; b++) {
                var p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if(p.x > w || p.y > h) {
                  p.x = Math.random() * w;
                  p.y = -20;
                }
              }
            }

            setInterval(draw, 26);

          }
	
	}
    
    
    
    // SKYFALL BACKGROUND FUNCTION
	function skyfallBackground() {
    
            $('#canvas canvas').attr("id","skyfallCanvas");
        
            function hexToRgb(hex) {
            
                hex = hex.replace("#", "");

                var bigint = parseInt(hex, 16);
                var r = (bigint >> 16) & 255;
                var g = (bigint >> 8) & 255;
                var b = bigint & 255;

                return r + "," +  g + "," + b;
            }
    
            var c = document.getElementById("skyfallCanvas");
            var ctx = c.getContext("2d");
            var w = c.width = window.innerWidth;
            var h = c.height = window.innerHeight;
            var clearColor = 'rgba(0, 0, 0, .1)';
            var max = background_skyfall_amount;
            var color_set = hexToRgb(background_skyfall_color);
            var drops = [];

            function random(min, max) {
                return Math.random() * (max - min) + min;
            }

            function O() {}

            O.prototype = {
                init: function() {
                    this.x = random(0, w);
                    this.y = 0;
                    this.color = 'rgb('+ color_set +')';
                    this.w = 2;
                    this.h = 1;
                    this.vy = random(4, 5);
                    this.vw = 3;
                    this.vh = 1;
                    this.size = 2;
                    this.hit = random(h * .8, h * .9);
                    this.a = 1;
                    this.va = .96;
                },
                draw: function() {
                    if (this.y > this.hit) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y - this.h / 2);

                        ctx.bezierCurveTo(
                            this.x + this.w / 2, this.y - this.h / 2,
                            this.x + this.w / 2, this.y + this.h / 2,
                            this.x, this.y + this.h / 2);

                        ctx.bezierCurveTo(
                            this.x - this.w / 2, this.y + this.h / 2,
                            this.x - this.w / 2, this.y - this.h / 2,
                            this.x, this.y - this.h / 2);

                        ctx.strokeStyle = 'rgba('+ color_set + ',' +this.a+')';
                        ctx.stroke();
                        ctx.closePath();

                    } else {
                        ctx.fillStyle = this.color;
                        ctx.fillRect(this.x, this.y, this.size, this.size * 5);
                    }
                    this.update();
                },
                update: function() {
                    if(this.y < this.hit){
                        this.y += this.vy;
                    } else {
                        if(this.a > .03){
                            this.w += this.vw;
                            this.h += this.vh;
                            if(this.w > 100){
                                this.a *= this.va;
                                this.vw *= .98;
                                this.vh *= .98;
                            }
                        } else {
                            this.init();
                        }
                    }

                }
            }

            function resize(){
                w = c.width = window.innerWidth;
                h = c.height = window.innerHeight;
            }

            function setup(){
                for(var i = 0; i < max; i++){
                    (function(j){
                        setTimeout(function(){
                            var o = new O();
                            o.init();
                            drops.push(o);
                        }, j * 200)
                    }(i));
                }
            }


            function anim() {
                ctx.fillStyle = clearColor;
                ctx.fillRect(0,0,w,h);
                for(var i in drops){
                    drops[i].draw();
                }
                requestAnimationFrame(anim);
            }


            window.addEventListener("resize", resize);

            setup();
            anim();
	
	}
    
    
    
    // GALAXY BACKGROUND FUNCTION
	function galaxyBackground() {
        
        
            // POLYFILL FOR IE
            if (!Array.prototype.fill) {
              Object.defineProperty(Array.prototype, 'fill', {
                value: function(value) {

                  // Steps 1-2.
                  if (this == null) {
                    throw new TypeError('this is null or not defined');
                  }

                  var O = Object(this);

                  // Steps 3-5.
                  var len = O.length >>> 0;

                  // Steps 6-7.
                  var start = arguments[1];
                  var relativeStart = start >> 0;

                  // Step 8.
                  var k = relativeStart < 0 ?
                    Math.max(len + relativeStart, 0) :
                    Math.min(relativeStart, len);

                  // Steps 9-10.
                  var end = arguments[2];
                  var relativeEnd = end === undefined ?
                    len : end >> 0;

                  // Step 11.
                  var final = relativeEnd < 0 ?
                    Math.max(len + relativeEnd, 0) :
                    Math.min(relativeEnd, len);

                  // Step 12.
                  while (k < final) {
                    O[k] = value;
                    k++;
                  }

                  // Step 13.
                  return O;
                }
              });
            }

            function hexToRgb(hex) {
            
                hex = hex.replace("#", "");

                var bigint = parseInt(hex, 16);
                var r = (bigint >> 16) & 255;
                var g = (bigint >> 8) & 255;
                var b = bigint & 255;

                return r + "," +  g + "," + b;
            }
    
            $('#canvas canvas').attr("id","canvasGalaxy");
        
            var c = document.getElementById("canvasGalaxy");
	        $ = c.getContext("2d");
        
			

            var h = c.height = window.innerHeight,
                w = c.width = window.innerWidth,
                bg_color = hexToRgb(background_galaxy_background_color),
                random = function random(n) { return Math.random() * n; },
                stars = new Array(background_galaxy_star_amount).fill().map(function () {
                    
                      return {

                        r: random(w),
                        s: random(0.01),
                        a: random(Math.PI * 2)

                      };
                    
                });
        
          

            function loop() {
                
              $.fillStyle = "rgba(" + bg_color + ",.1)";
              $.fillRect(0, 0, w, h);
              stars.forEach(function (e) {
                e.a += e.s;
                $.save();
                $.beginPath();
                $.translate(w / 2, h / 2);
                $.rotate(e.a);
                $.arc(e.r, e.r, background_galaxy_star_thickness, 0, Math.PI * 2);
                $.closePath();
                $.fillStyle = background_galaxy_star_color;
                $.fill();
                $.restore();
              });
                
              requestAnimationFrame(loop);
                
            } loop();
        
            window.addEventListener("resize", function (e) {
              w = c.width = window.innerWidth;
              h = c.height = window.innerHeight;
            });


	
	}
    
  
    
	// BACKGROUND CONTROLLER
    if($(".grcs_background_content").length != 0) {
        
        switch(background_mode) {

            case "image":
                imageBackground();
            break;
            case "slider":
                sliderBackground();
            break;
            case "kenburns":
                kenburnsBackground();
            break;
            case "youtube":
                youtubeBackground();
            break;
            case "color":
                colorBackground();
            break;
            case "gradient":
                gradientBackground();
            break;
            case "sphere":	
                canvasSphereBackground();
            break;
            case "waves":
                canvasWavesBackground();
            break;
            case "mesh":
                meshBackground();
            break;
            case "space":	
                spaceBackground();
            break;
            case "abstract":
                abstractBackground();
            break;
            case "glitch":
                glitchBackground();
            break;
            case "rain":
                rainBackground();
            break;
            case "skyfall":
                skyfallBackground();
            break;
            case "galaxy":
                galaxyBackground();
            break;
            case "custom":
                
            break;
            default:
                alert( "Error! No background is set or something went wrong" );
                console.log("Error! No background is set or something went wrong");
            break;	

        }
        
    }

	
});