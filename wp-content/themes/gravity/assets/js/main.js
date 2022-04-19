/******************************************************************
	
	
	@ Item          Gravity // Coming Soon WordPress
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************/
 
 
 /******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Foundation
	--  2. Audio Player
	--  3. Background Effects
 
 
 ******************************************************************/




/** 1. Foundation
*******************************************************************/

var blockProcess = true;
prevent_class_removal = true;
jQuery(window).on('load', function($) {

    jQuery('.grcs_text_slider').cycle("goto","0");
    jQuery('.grcs_text_slider').cycle("pause");    
    
    setTimeout(function() {		
        
        if ( ! jQuery('#page-loader').hasClass("freeze") ) { 
            jQuery("#page-loader").addClass("hide-this");
        }

        setTimeout(function() {	
                
            var time = 0;
            var count = jQuery('.grcs_hero_container .front-content .container-mid .enter-animation').length;
            
            if(count != 0) {
                
                jQuery('.grcs_hero_container .front-content .container-mid .enter-animation').each(function() {

                    var el = jQuery(this);
                    var delay = parseInt(el.attr("data-delay"));
                    time += delay;

                    setTimeout(function() {

                      el.removeClass("ivis");

                      if (!--count) {
                          
                          jQuery('.grcs_text_slider').cycle("goto","0");
                          jQuery('.grcs_text_slider').cycle("resume");
                          
                          setTimeout(function(){

                          blockProcess = false;

                          jQuery(".grcs_bullet_nav").addClass("init");
                          jQuery(".grcs_main_menu_button").addClass("init");
                          jQuery("#canvas").addClass("init");
                          jQuery(".grcs_youtube_controls").addClass("show");
                          jQuery(".grcs_audio_player_toggle").addClass("show");
                          if(prevent_class_removal == true) {jQuery(".grcs_hero_container .container-mid").removeClass("block-overflow"); }
                        
                          

                          },400);
                          
                      }

                    }, time); 

                });
                
            } else {
                
                jQuery(".grcs_bullet_nav").addClass("init");
                jQuery(".grcs_main_menu_button").addClass("init");
                jQuery("#canvas").addClass("init");
                jQuery(".grcs_youtube_controls").addClass("show");
                jQuery(".grcs_audio_player_toggle").addClass("show");
                
            }

        }, 200);

    }, 600);

});
jQuery(document).ready(function($) {
	"use strict";
    
    
    if( ! $("body").hasClass("compose-mode") ) {
        $('.grcs_hero_container .front-content .container-mid .enter-animation').addClass("ivis");
    }
    
    $(".grcs_hero_container .container-mid").addClass("block-overflow");
    
    
    jQuery(window).on('load', function() {
        console.log("ct");
        $('.grcs_text_slider').cycle("goto","0");
        $('.grcs_text_slider').cycle("pause");    
        
        setTimeout(function() {		
            
            if ( ! $('#page-loader').hasClass("freeze") ) { 
                $("#page-loader").addClass("hide-this");
            }

            setTimeout(function() {	
                    
                var time = 0;
                var count = $('.grcs_hero_container .front-content .container-mid .enter-animation').length;
                
                if(count != 0) {
                    
                    $('.grcs_hero_container .front-content .container-mid .enter-animation').each(function() {

                        var el = $(this);
                        var delay = parseInt(el.attr("data-delay"));
                        time += delay;

                        setTimeout(function() {

                          el.removeClass("ivis");

                          if (!--count) {
                              
                              $('.grcs_text_slider').cycle("goto","0");
                              $('.grcs_text_slider').cycle("resume");
                              
                              setTimeout(function(){

                              blockProcess = false;

                              $(".grcs_bullet_nav").addClass("init");
                              $(".grcs_main_menu_button").addClass("init");
                              $("#canvas").addClass("init");
                              $(".grcs_youtube_controls").addClass("show");
                              $(".grcs_audio_player_toggle").addClass("show");
                              if(prevent_class_removal == true) {$(".grcs_hero_container .container-mid").removeClass("block-overflow"); }
                            
                              

                              },400);
                              
                          }

                        }, time); 

                    });
                    
                } else {
                    
                    $(".grcs_bullet_nav").addClass("init");
                    $(".grcs_main_menu_button").addClass("init");
                    $("#canvas").addClass("init");
                    $(".grcs_youtube_controls").addClass("show");
                    $(".grcs_audio_player_toggle").addClass("show");
                    
                }

            }, 200);

        }, 600);

    });
    
    
    // Add Push Alerts for wrong actions
    function gravity_alert_push() {
        
        if( $(".grcs_overlay").length > 1 ) {
            console.log('%c>Error: More than 1 Overlay Container found!', "background: red; color: white;");
            alert('Error: More than 1 Overlay Container found!');
        }
        
        if( $(".grcs_hero_container").length > 1 ) {
            console.log('%c Error: More than 1 Hero Container found!', "background: red; color: white;");
            alert('>Error: More than 1 Hero Container found!');
        }
        
    } 
    gravity_alert_push();
    
    
    // Gravity menu setup
    function gravity_menu_setup() {
        
        if( $(".grcs_main_menu").length == 0 ) {
            return false;
        }

        $(".grcs_main_menu_button").click(function(){
            
            if( $("body").hasClass("grcs_menu_open") ) {
                $("body").removeClass("grcs_menu_open");
            } else {
                $("body").addClass("grcs_menu_open"); 
            }

        });
        
        $(".grcs_page_wrapper").click(function(){
            
            if( $("body").hasClass("grcs_menu_open") ) {
                $("body").removeClass("grcs_menu_open");
            }

        });
            
        $(".grcs_main_menu li.menu-item-has-children").append('<span class="sub-trigger fa fa-angle-down"></span);');
        
        $(".grcs_main_menu .menu").slicknav({
            label: '',
            prependTo: '.grcs_main_menu',
            allowParentLinks: true
        });

        $(".grcs_main_menu_button").click(function(){
            $('.grcs_main_menu .menu').slicknav('toggle');
        });
        
    }
    gravity_menu_setup();
    
    
    
/** 2. Audio Player
*******************************************************************/
    if ( $("#grcs_audio_player").length ) {
        
        var myAudio = document.getElementById("grcs_audio_player"),
            isPlaying = false;

        $(".grcs_audio_player_toggle").click(function() {

            if (isPlaying) {
                myAudio.pause();
            } else {
                myAudio.play();
            }

        });   

        myAudio.onplaying = function() {
            isPlaying = true;
            $(".grcs_audio_player_toggle").removeClass("ti-control-play").addClass("ti-control-pause");
        };
        myAudio.onpause = function() {
            isPlaying = false;
            $(".grcs_audio_player_toggle").removeClass("ti-control-pause").addClass("ti-control-play");
        };
        
    }
    
    
    
 /** 3. Background Effects
*******************************************************************/ 
    
    
    if ( background_particle_effect_toggle == true && background_mode != "sphere" && background_mode != "waves" && background_mode != "space" &&  background_mode != "mesh" && background_mode != "abstract" && background_mode != "galaxy" && background_mode != "skyfall" && background_mode != "rain" ) {
        
        // 2D HOVER EFFECT
        if ( background_parallax_effect_toggle == true ) {

            // PARALLAX HOVER EFFECT
            var $scene = $(".grcs_background_content").parallax({

                scalarX: 25,
                scalarY: 15,
                frictionX: 1.01 - parseFloat(background_parallax_effect_friction_x),
                frictionY: 1.01 - parseFloat(background_parallax_effect_friction_y),
                invertX: parseFloat(background_parallax_effect_invert),
                invertY: parseFloat(background_parallax_effect_invert),

            });

        }
        
    }
    
     // GRAVITY BACKGROUND EFFECT
	function gravityBackgroundEffect() {
			
			function Constellation (canvas, options) {
				
				var screenpointSplitt = 14000,
					viewportWidth = $(".grcs_background_content .level-1").width(),
					viewportHeight = $(".grcs_background_content .level-1").height(),
					particleRecalculated = Math.round( viewportWidth * viewportHeight / 24000 * ( background_particle_effect_particle_amount / 100 ) ),
                    
					$canvas = $(canvas),
					context = canvas.getContext("2d"),
					defaults = {
						star: {color: background_particle_effect_particle_color, width: 1},
						line: {color: background_particle_effect_line_color, width: 0.2},
						position: {x: 0,y: 0},
						width: viewportWidth,
						height: viewportHeight,
						velocity: background_particle_effect_particle_speed / 50,
						length: particleRecalculated,
						distance: 120,
						radius: background_particle_effect_activation_radius,
						stars: []
					},
					
					config = $.extend(true, {}, defaults, options);
		
				function Star () {
					this.x = Math.random() * canvas.width;
					this.y = Math.random() * canvas.height;
					this.vx = (config.velocity - (Math.random() * 0.5));
					this.vy = (config.velocity - (Math.random() * 0.5));
					this.radius = Math.random() * config.star.width;
				}
		
				Star.prototype = {
				
					create: function(){
						context.beginPath();
						context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
						context.fill();
					},
		
					animate: function(){
						
						var i;
						for (i = 0; i < config.length; i++) {
		
							var star = config.stars[i];
		
							if (star.y < 0 || star.y > canvas.height) {
								star.vx = star.vx;
								star.vy = - star.vy;
							} else if (star.x < 0 || star.x > canvas.width) {
								star.vx = - star.vx;
								star.vy = star.vy;
							}
		
							star.x += star.vx;
							star.y += star.vy;
						}
						
					},
		
					line: function(){
						
						var length = config.length,
							iStar,
							jStar,
							i,
							j;
		
						for (i = 0; i < length; i++) {
							
							for (j = 0; j < length; j++) {
								
								iStar = config.stars[i];
								jStar = config.stars[j];
		
								if (
									(iStar.x - jStar.x) < config.distance &&
									(iStar.y - jStar.y) < config.distance &&
									(iStar.x - jStar.x) > - config.distance &&
									(iStar.y - jStar.y) > - config.distance
								) {
									if (
										(iStar.x - config.position.x) < config.radius &&
										(iStar.y - config.position.y) < config.radius &&
										(iStar.x - config.position.x) > - config.radius &&
										(iStar.y - config.position.y) > - config.radius
									) {
										context.beginPath();
										context.moveTo(iStar.x, iStar.y);
										context.lineTo(jStar.x, jStar.y);
										context.stroke();
										context.closePath();
									}
									
								}
								
							}
							
						}
						
					}
					
				};
	
				this.createStars = function () {
					
					var length = config.length,
						star,
						i;
					
					context.clearRect(0, 0, canvas.width, canvas.height);
		
					for (i = 0; i < length; i++) {
						config.stars.push(new Star());
						star = config.stars[i];
						star.create();
					}
					
					star.line();
					star.animate();
					config.stars.splice(length, length);
					
				};
		
				this.setCanvas = function () {
					
					canvas.width = config.width;
					canvas.height = config.height;
					
					context.fillStyle = config.star.color;
					context.strokeStyle = config.line.color;
					context.lineWidth = config.line.width;
					
					if (!options || !options.hasOwnProperty("position")) {
						
						config.position = {
							x: canvas.width * 0.5,
							y: canvas.height * 0.5
						};
						
					}
					
				};
		
				this.loop = function (callback) {
					
					callback();
		
					window.requestAnimationFrame(function () {
						this.loop(callback);
					}.bind(this));
					
				};
		
				this.bind = function () {
					
					$(window).on("mousemove", function(e){
						config.position.x = e.pageX - $canvas.offset().left;
						config.position.y = e.pageY - $canvas.offset().top;
					});
					
				};
		
				this.init = function () {
					this.setCanvas();
					this.loop(this.createStars);
					this.bind();
				};
				
			}
		
			$.fn.constellation = function (options) {
				
				return this.each(function () {
					var c = new Constellation(this, options);
					c.init();
				});
				
			};
		
			$("#canvas canvas").constellation({});
		
            var waitForFinalEvent = (function () {

              var timers = {};

              return function (callback, ms, uniqueId) {

                if (!uniqueId) {
                  uniqueId = "Don't call this twice without a uniqueId";
                }

                if (timers[uniqueId]) {
                  clearTimeout (timers[uniqueId]);
                }

                timers[uniqueId] = setTimeout(callback, ms);

              };

            })();

            $(window).resize(function () {
                waitForFinalEvent(function(){
                        $("#canvas canvas").constellation({});
                }, 500, "some unique string");
            });
		
	} 
    
    if ( background_particle_effect_toggle == true && background_mode != "sphere" && background_mode != "waves" && background_mode != "space" &&  background_mode != "mesh" && background_mode != "abstract" && background_mode != "galaxy" && background_mode != "skyfall" && background_mode != "rain" ) {
        
        gravityBackgroundEffect();
        
    }

     
});



// Mobile Detect Variable
var isMobile = {
    Android:function(){return navigator.userAgent.match(/Android/i);},
    BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i);},
    iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera:function(){return navigator.userAgent.match(/Opera Mini/i);},
    Windows:function(){return navigator.userAgent.match(/IEMobile/i);},
    any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

// Add Class To Body When Mobile
if(isMobile.any()) {
    jQuery("body").addClass("is-mobile");
}