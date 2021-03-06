/******************************************************************
	
	
	@ Item          Gravity // Coming Soon WordPress
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************/
 
 
 /******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Text Slider
	--  2. Social Icons
	--  3. Contact Form
    --  4. Subscribe Form
    --  5. Overlay
 
 
 ******************************************************************/
 

    
    
/** 1. Text Slider
*******************************************************************/

jQuery(document).ready(function($) {
    
    $(".grcs_text_slider").each(function() {
        
        var elIn = $(this);
            
        if ( !elIn.hasClass("unsync") && background_mode == "kenburns" ) {
            var eltimeout = background_kenburns_timeout, 
                elSpeed = background_kenburns_transition_duration;


        } else if ( !elIn.hasClass("unsync") && background_mode == "slider" ) {
            var eltimeout = background_slider_timeout, 
                elSpeed = background_slider_transition_duration;

        } else {
            var eltimeout = elIn.attr("data-timeout"), 
                elSpeed = elIn.attr("data-duration");
        }

         elIn.cycle({
            delay: 0,
            slides: ".slide",
            log: false,
            autoHeight: "container",
            fx: elIn.attr("data-fx"),
            timeout: parseInt(eltimeout),
            speed: parseInt(elSpeed),
        });
            
    });
    
    
    
/** 2. Social Icons
*******************************************************************/
    
    $(".grcs_social_icons").each(function() {
            
        $(this).find("li>a,li>div").tooltip({
            container: 'body',
            delay: { "show": 150, "hide": 0 }
        });
        
    });
    
    $(".grcs_social_icons").click(function() {
        
        $(this).find("li>a,li>div").tooltip('hide');
        
    });
    
    
    
/** 3. Contact Form
*******************************************************************/
    
    $('.grcs_contact_form').each(function() {
            
        var eform = $(this);

        $(this).submit(function(e) {

            e.preventDefault();
            var postdata = $(this).serializeArray();

            postdata.push({name: 'formide', value: eform.find(".form-generate-unique").data("form-ide") });
            postdata.push({name: 'formmSuccess', value: eform.find(".form-generate-unique").data("form-msuccess") });
            postdata.push({name: 'formmInvalid', value: eform.find(".form-generate-unique").data("form-minvalid") });
            postdata.push({name: 'formmEmpty', value: eform.find(".form-generate-unique").data("form-mempty") });

            $.ajax({

                type: "POST",
                url: eform.attr( 'action' ),
                data: postdata,
                dataType: "json",
                success: function(json) {

                    if (eform.hasClass("error")) {

                        eform.find("input").removeClass("active");
                        eform.find("textarea").removeClass("active");

                    }

                    setTimeout(function(){

                        if (json.nameMessage !== "") {

                            eform.find("input[name=name]").addClass("active").attr("placeholder",json.nameMessage);
                            eform.addClass("error");

                        }

                        if (json.emailMessage !== "") {

                           eform.find("input[name=email]").addClass("active").val('').attr("placeholder",json.emailMessage);
                           eform.addClass("error");

                        }

                        if (json.messageMessage !== "") {

                            eform.find("textarea[name=message]").addClass("active").attr("placeholder",json.messageMessage);
                            eform.addClass("error");

                        }

                    }, 50);

                    if (json.nameMessage === "" && json.emailMessage === "" && json.messageMessage === "") {

                        eform.removeClass("error").addClass("success");
                        eform.find("textarea, input").attr("placeholder","");
                        eform.find("textarea").attr("placeholder",json.succesMessage);
                        eform.find("textarea, input, button").val('').prop('disabled', true);

                    }

                }

            });

        });
            
    });
    
    
    
/** 4. Subscribe Form
*******************************************************************/
    
    $('.grcs_subscribe_form').each(function() {
            
        var eform = $(this);

        $(this).submit(function(e) {

          e.preventDefault();  
          var postdata = $(this).serializeArray();

            postdata.push({name: 'formMo', value: eform.find(".form-generate-unique").data("form-mo") });
            postdata.push({name: 'formmSuccess', value: eform.find(".form-generate-unique").data("form-msuccess") });
            postdata.push({name: 'formmInvalid', value: eform.find(".form-generate-unique").data("form-minvalid") });
            postdata.push({name: 'formmEmpty', value: eform.find(".form-generate-unique").data("form-mempty") });
            postdata.push({name: 'formmFail', value: eform.find(".form-generate-unique").data("form-mfail") });
            postdata.push({name: 'formMake', value: eform.find(".form-generate-unique").data("form-make") });
            postdata.push({name: 'formMaid', value: eform.find(".form-generate-unique").data("form-maid") });
            postdata.push({name: 'formMaopt', value: eform.find(".form-generate-unique").data("form-maopt") });
            postdata.push({name: 'formFilo', value: eform.find(".form-generate-unique").data("form-filo") });

          $.ajax({

              type: 'POST',
              url: eform.attr( 'action' ),
              data: postdata,
              dataType: 'json',
              success: function(json) {

                  if(json.valid === 0) {

                      eform.addClass("error");
                      eform.find("input").attr("placeholder", json.message);
                      eform.find("input").val('');


                  } else {

                      eform.find("input").val('').prop('disabled', true);
                      eform.find("button").val('').prop('disabled', true);
                      eform.find("input").attr("placeholder",json.message);
                      eform.removeClass("error").addClass("success");

                  }

              }

            });

        });
            
    });
    
    
    
/** 5. Overlay
*******************************************************************/
    
    $(".grcs_overlay").each(function() {

        // VARIABLES
        var sectionContainer = $(this),
            sections = $(this).find(".grcs_overlay_section"),
            upBtn = $(".go-up"),
            clickedSectionIndex = 0,
            bulletNavEvent = false,
            downBtn = $(".go-down"),

            frontpage = $(".grcs_hero_container .front-content"),
            frontpageContainer = frontpage.find(".container-mid"),

            amountOfSections = sections.length,
            currentSection = 0,
            currentSectionSelector;
        
        
        function mobileSections(){
            
            amountOfSections = 1;
            $(".grcs_social_icons li .go-down").parent().remove();
            
        } if(isMobile.any()) { mobileSections(); };
        
        

        function hideFrontPage() {

            prevent_class_removal = false;

            $(".grcs_hero_container .container-mid").addClass("block-overflow");
            frontpage.addClass("overlay-active");
            frontpage.find(".enter-animation").addClass("ivis");
            frontpage.find(".enter-animation").css("transition","all 1s .5s");
            $(".grcs_youtube_controls").removeClass("show");
            $(".grcs_audio_player_toggle").removeClass("show");

            $('#cycle').cycle('pause');

        }

        function showFrontPage() {
            
            prevent_class_removal = true;

            frontpage.removeClass("overlay-active");
            frontpage.find(".enter-animation").removeClass("ivis");
            frontpage.find(".enter-animation").css("transition","all 1s .2s");

            setTimeout(function() {
                $(".grcs_youtube_controls").addClass("show");
                $(".grcs_audio_player_toggle").addClass("show");
            }, 200);

            setTimeout(function() {
                if(prevent_class_removal == true) { $(".grcs_hero_container .container-mid").removeClass("block-overflow"); }
            }, 1000);

            setTimeout(function() {
                $('#cycle').cycle('resume');
            }, 1400);

        }

        function nextOverlay() {

            if ( currentSection == amountOfSections || blockProcess === true ) {
                return false;
            }

            blockProcess = true;
            sectionContainer.addClass("movement-in-progress");

            if( currentSection === 0 ){

                hideFrontPage();

                setTimeout(function() {
                    sectionContainer.addClass("open");
                }, 200);	

            }


            if(bulletNavEvent == false) {
                currentSection = currentSection + 1;
            } else {
                currentSection = clickedSectionIndex; 
                bulletNavEvent = false;
            }

            sections.removeClass("active");
            currentSectionSelector = sections.eq((currentSection - 1));

            setTimeout(function() {

                currentSectionSelector.addClass("active");
                updateBulletNav();

                setTimeout(function() {

                    upBtn.addClass("active");

                    setTimeout(function() {
                        blockProcess = false;
                        sectionContainer.removeClass("movement-in-progress");
                    }, 800);

                }, 400);

            }, 1000);

        }

        function prevOverlay() {

            if ( currentSection === 0 || blockProcess === true ) {
                return false;
            }

            blockProcess = true;
            sectionContainer.addClass("movement-in-progress");

            if(bulletNavEvent == false) {
                currentSection = currentSection - 1;
            } else {
                currentSection = clickedSectionIndex; 
                bulletNavEvent = false;
            }

            sections.removeClass("active");
            currentSectionSelector = sections.eq((currentSection - 1));

            setTimeout(function() {
                
                if( amountOfSections > 1){
                    currentSectionSelector.addClass("active");
                }
                
                updateBulletNav();

                setTimeout(function() {
                    blockProcess = false;
                    sectionContainer.removeClass("movement-in-progress");
                }, 800);

            }, 800);

            if( currentSection === 0 ){

                upBtn.removeClass("active");

                setTimeout(function() {
                    showFrontPage();
                    sectionContainer.removeClass("open");
                }, 800);

            }

        }

        function updateBulletNav() {

            if(sectionContainer.data("bullet-nav") === 'yes') {
                $(".grcs_bullet_nav .nav_dots").removeClass("active");
                $(".grcs_bullet_nav .nav_dots").eq(currentSection).addClass("active");
            }

        }

        function clickBulletNav() {

            $('.grcs_bullet_nav .nav_dots').click(function(){

                clickedSectionIndex = $('.grcs_bullet_nav .nav_dots').index(this);

                if( clickedSectionIndex != currentSection ) {
                    if( clickedSectionIndex < currentSection  ) {
                        bulletNavEvent = true;
                        prevOverlay();
                    } else {
                        bulletNavEvent = true;
                        nextOverlay();
                    }
                }

            });

        }

        function createBulletNav() {

            $("body").append('<div class="grcs_bullet_nav"></div>');

            for (i = 0; i < (amountOfSections + 1); i++) { 
                $(".grcs_bullet_nav").append('<div class="nav_dots"></div>');
            }
            
            if(sectionContainer.data("bullet-nav-titles") === 'yes') {
                
                $(".grcs_bullet_nav .nav_dots").eq(0).attr("title","Home");
                
                var total_count = $('.grcs_overlay .grcs_overlay_section').length;
                
                for(var i = 0; total_count > i ; i++) {
                    
                    var section_name = $('.grcs_overlay .grcs_overlay_section').eq(i).data("name");
                    
                    $(".grcs_bullet_nav .nav_dots").eq(i+1).attr("title",section_name);
                    
                }
                
                $('.grcs_bullet_nav .nav_dots').tooltip({
                    placement: "left",
                });  
                
            }

            updateBulletNav();
            clickBulletNav();

        } 

        if(sectionContainer.data("bullet-nav") === 'yes' && !isMobile.any() ) {
            createBulletNav();
        }



        // EVENT - ON DOWN BUTTON CLICK
        downBtn.click(function() {
            nextOverlay();
        });

        // EVENT - ON UP BUTTON CLICK
        upBtn.click(function() {
            prevOverlay();
        });

        if( sectionContainer.attr('data-mouse-control') != 'yes' ) {

            // EVENT - ON DOWN SCROLL GLOBAL	
            $('html').on('DOMMouseScroll mousewheel', function(e){

                var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;

                if(theEvent / 120 < 0) {
                    nextOverlay();
                }

            });

            // EVENT - ON UP SCROLL GLOBAL	
            $('html').on('DOMMouseScroll mousewheel', function(e){

                var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;

                if(theEvent / 120 > 0) {
                    prevOverlay();
                }

            });

        }

        if( sectionContainer.attr('data-arrow-control') != 'yes' ) {

            // EVENT - KEYDOWN	
            $(document).keydown(function(e) {

                switch(e.which) {
                    case 38: // up
                        prevOverlay();
                    break;
                    case 40: // down
                        nextOverlay();
                    break;
                    default: return; 
                }

                e.preventDefault();

            });

        }
    
    });
            
});