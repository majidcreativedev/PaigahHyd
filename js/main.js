(function($) {
  "use strict";

  // global variables
  var $ = jQuery,
    userTouchDev = navigator.userAgent.match(/iPad|iPhone|Android/i),
    $body = $('body'),
    $windowBrowser = $(window),
    usrBrowser = navigator.userAgent,
    link = '.single-page-nav a',
    cache = [],
    slider_container_height = 0;

    /* add class touch device */
  (function(){
    if(userTouchDev) $body.addClass('touch-device');
    else $body.addClass('no-touch-device');
  })();

/* FUNCTION LIST 
---------------------------------------------------------------------*/

/* --------- Background Clip Title ----------- */
function titleParams() {
  var title = $('.title-box .title'),
      padding = $('.slider-overlay .bg-padding');
  
  if (title.attr('data-fontsize') !== undefined && title.attr('data-fontsize') !== false && title.attr('data-fontsize') !== '') {
    var fontSize = title.attr('data-fontsize');
    
    title.css('fontSize', fontSize + 'px');
    padding.css('height', fontSize * 0.16);
    
    if ($body.width() < 992 && $body.width() > 767) {
      title.css('fontSize', (fontSize * 0.57) + 'px');
      padding.css('height', fontSize * 0.57 * 0.16);
    } else if ($('body').width() < 768) {
      title.css('fontSize', (fontSize * 0.25) + 'px');
      padding.css('height', fontSize * 0.25 * 0.16);
    }
  }
  
  if (title.attr('data-fontweight') !== undefined && title.attr('data-fontweight') !== false && title.attr('data-fontweight') !== '') {
    title.css('fontWeight', title.attr('data-fontweight'));
  }
  
  if (title.attr('data-fontfamily') !== undefined && title.attr('data-fontfamily') !== false && title.attr('data-fontfamily') !== '') {
    title.css('fontFamily', title.attr('data-fontfamily'));
  }
  
  if (title.attr('data-bg') !== undefined && title.attr('data-bg') !== false && title.attr('data-bg') !== '') {
    $('.slider-overlay .slider-content .bg').css('background', title.attr('data-bg'));
  }
}

/* TitleCanvas
---------------------------------------------------------------------- */ 
function titleCanvas() {
  var titleBox    = $('.title-box'),
      title       = titleBox.find('.title'),
      titleWidth  = title.width(),
      titleHeight = title.height(),
      fontSize    = 190,
      fontWeight  = 800,
      fontFamily  = '"Raleway", sans-serif',
      bg          = 'rgba(255, 255, 255, 0.85)';
    
  fontSize = parseFloat(title.css('font-size'));
  
  if (title.attr('data-fontweight') !== undefined && title.attr('data-fontweight') !== false && title.attr('data-fontweight') !== '') {
    fontWeight =  parseFloat(title.attr('data-fontweight'));
  }
  
  if (title.attr('data-fontfamily') !== undefined && title.attr('data-fontfamily') !== false && title.attr('data-fontfamily') !== '') {
    fontFamily = title.attr('data-fontfamily');
  }
  
  if (title.attr('data-bg') !== undefined && title.attr('data-bg') !== false && title.attr('data-bg') !== '') {
    bg = title.attr('data-bg');
  }

  $('.title-canvas').remove();
  
  titleBox.find('.title').after('<canvas class="title-canvas" width="' + titleWidth + '" height="' + titleHeight + '"></canvas>');
  
  var canvas = titleBox.find('.title-canvas').get(0),
    ctx = canvas.getContext("2d");

  ctx.fillStyle = bg; 
  ctx.fillRect(0,0,titleWidth,titleHeight);
  
  ctx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';

  ctx.globalCompositeOperation = 'destination-out';
  wrapText(ctx, title.text(), titleWidth / 2 , fontSize * 0.87, titleWidth, fontSize);
  title.addClass('hidden-title');
  titleBox.closest('.slider-overlay').addClass('loaded');
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + '';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + '';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

/* ----------------------- Accordion --------------------------- */
function toggleChevron(e) {
  $(e.target).prev('.panel-heading')
    .find("i.indicator")
      .toggleClass('glyphicon-minus glyphicon-plus');
}

/* GOOGLE MAPS 
  --------------------------------------------------------------- */ 
function initializeMap($body){
  var bodyW = $body.width(),
      num2, choordsMap1, choordsMap2;
  // modify the coordinates of the map
  if(bodyW > 940) {
    num2 = -73.978705;
    choordsMap1 = 40.8;
    choordsMap2 = -74.5;
  }
  else if(bodyW < 939 && bodyW > 480) {
    num2 = -74.178705;
    choordsMap1 = 40.8;
    choordsMap2 = -74.5;
  }
  else if(bodyW < 479 && bodyW > 300) {
    num2 = -73.978705;
    choordsMap1 = 41.2;
    choordsMap2 = -73.98;
  }
  // modify the coordinates of the map

  setTimeout(function(){
    var mapOptions = {
      zoom: 10,
      draggable: false,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,

      scrollwheel: false,
      center: new google.maps.LatLng(choordsMap1, choordsMap2)
      // 41.2, -73.98
    },
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
    image = 'images/marker.png',
    myLatLng = new google.maps.LatLng(40.756168, num2), //num2
    beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      title: 'Manhattan'
    });
  },0);  
}

/* ------------- Carousel -----------------*/
function initCarousels(){
  $('.carousel-box').each(function(index){
    var self = $(this),
        prevBtn = '.prev'+index,
        nextBtn = '.next'+index,
        maxItem = self.data('item-max'),
        widthItem = self.data('item-width'), 
        initCaroucel;     
    self.attr('id', 'fredsel'+index);
    $('button.prev').each(function(index){
      $(this).addClass('prev'+index);
    });
    $('button.next').each(function(index){
      $(this).addClass('next'+index);
    });

    setTimeout(function(){
      initCaroucel = $('#'+self.attr('id'));

      initCaroucel.carouFredSel({
        responsive: true,
        width: '100%',
        prev: prevBtn,
        next: nextBtn,
        scroll: {
          items: 1,
          speed: 500,
          timeoutDuration:300000},
       
        items: {
          width: widthItem,
          height: 'auto',
          visible: {
            min: 1,
            max: maxItem
          }
        },
        onCreate: function(){
          self.addClass('init');
          self.parent().add(self).css('height', self.children().first().height() + 'px');
          setTimeout(function() {
            self.parent().add(self).css('height', self.children().first().height() + 'px');
          }, 500);
          // !!!! перевірити на сторінці елементів
          var top = self.find('.img-block img').height();
          self.closest('.post-slider, .posted-slider, .slider-people').find('.prev, .next').css('top', top / 2);
        }
      }).touchwipe({
          wipeLeft: function() {
            console.log('touchswipe work!!!!!!!!!');
            initCaroucel.trigger('next', 1);
          },
          wipeRight: function() {
            initCaroucel.trigger('prev', 1);
          },
          preventDefaultEvents: false
        });
      
    },0);
  });
}

/*------- SKILLS SIRCLES --------*/
function initSkillSircles(classElem) {
  var $skillItem = $(classElem);
  if ($skillItem) {
    $skillItem.each(function(){
      var $this = $(this),
          title,
          dataPercent = dataAttrSkills($this, 'percent', '50'),
          startcolorline = dataAttrSkills($this, 'start-color', 'transparent'),
          color = dataAttrSkills($this,'color', '#111');
     
      title = $this.text();
      // advanced settings
      $this.appear(function() {
        $this.easyCircleSkill({
          percent        : dataPercent,
          linesize       : 3,
          startcolorline : startcolorline,
          skillName      : title,
          colorline      : color
        });
      });    

    });
  };
};

function dataAttrSkills(elem, dataName, setDefault) {
  var data = elem.data(dataName),
    res= !!data ? data : setDefault;
  return res;
}

// portfolio sliders
var portfolioConfig = 'data.json';
if( 'devicePixelRatio' in window && window.devicePixelRatio >= 2 ){
  portfolioConfig = 'data-2x.json';
}

function initSlider(selector) {
  
  $(selector).responsiveSlides({
    auto: false,             // Boolean: Animate automatically, true or false
    speed: 500,            // Integer: Speed of the transition, in milliseconds
    timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
    pager: false,           // Boolean: Show pager, true or false
    nav: true,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: false,           // Boolean: Pause on hover, true or false
    pauseControls: true,    // Boolean: Pause when hovering controls, true or false
    prevText: "Previous",   // String: Text for the "previous" button
    nextText: "Next",       // String: Text for the "next" button
    maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
    navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "rslides",   // String: Change the default namespace used
    before: function(){},   // Function: Before callback
    after: function(){}     // Function: After callback
  });
}

function buildSlider(data) {

  var html = false;

  if (data) {
    html = '<h4 class="album-name text-center">'+data.title+'</h4>';
    
    // while photos
    if($(data.photos).size()) {
      html += '<div class="wrap-slider"><div class="photos-container">';
      $.each(data.photos, function(i, photo){
        html += '<div><img src="'+photo+'" alt="" /></div>';
      });
      html += '</div></div>';
    }
    
    // Add info about alboms
    html += '<div class="additional-info row">\
              <div class="col-md-7">\
                <div class="heading">Description</div>\
                <div class="description">'+data.description+'</div>\
              </div>\
              <div class="col-md-5">\
                <div class="heading">Info</div>\
                <div class="adinfo-category"><strong>categories: </strong>'+data.category+'</div>\
                <div class="client"><strong>client: </strong>'+data.client+'</div>\
                <div class="link"><strong>link: </strong><a href="'+data.url+'">VISIT SITE</a></div>\
              </div>\
            </div>';
  }
  
  return html;
}

function getNextID(current_element_id) {
  var nextAlbomID = false;
  if ((cache.length - 1) != current_element_id) {
    nextAlbomID = cache[current_element_id + 1];
  } else {
    nextAlbomID = cache[0];
  }
  return nextAlbomID;
}
  
function getPrevID(current_element_id) {
  var prevAlbomID = false;
  if (current_element_id != 0) {
    prevAlbomID = cache[current_element_id - 1];
  } else {
    prevAlbomID = cache[cache.length - 1];
  }
  return prevAlbomID;
}

function getJsonArray(elements, callback_success, callback_error) {
  $.getJSON(portfolioConfig, function(data) {     
    for (index = 0; index < elements.length; ++index) {
      // buildAlbumSlider(elements[index], data[elements[index]]);
    }
    if (callback_success && typeof(callback_success) === "function") {
      callback_success(data);
    }
  });
}

function getJsonID(id, callback_success, callback_error) {
  -$.getJSON(portfolioConfig, function(data) {
    var d = data[id];
    if (callback_success && typeof(callback_success) === "function") {
      callback_success(d);
    }
  });
}

function destroy(selector){
  jQuery(selector).html("");
}

function create(current_id, next_id, prev_id) {
  /* Fix height */
  $(".sliders").css('min-height', slider_container_height);   
  $('.sliders .sliders-preloader').removeClass('loaded');   
  $('.sliders .container').fadeOut({
    complete: function() {

      getJsonID(current_id, function(data){
        var html = buildSlider(data);

        $(".sliders a.next").data('albomid', next_id);
        $(".sliders a.prev").data('albomid', prev_id);
        
        $("#albom").html(html);
            
        initSlider('.photos-container');
            
        $('.sliders .container').fadeIn({
          easing: 'swing',
          complete: function() {
            slider_container_height = $(".sliders .row .container").height();
            $('.sliders .sliders-preloader').addClass('loaded');
          }
        });
      });
    }
  });
}


/* document.ready
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------*/

$(document).ready(function(){

	/* open menu slide  
	----------------------------------------------------------------------*/
  var $menuElem = $("#wrapper, #slide-menu, #wrapper-header");
  $("#menu-open").click(function() {  
    if ($menuElem.hasClass("open-menu")) {
      $menuElem.removeClass("open-menu");   
    }
    else {
      $menuElem.addClass("open-menu");     
    }
  });
  $(".menu-close, #wrapper").click(function() {  
    $menuElem.removeClass("open-menu");   
  });

  /* STYLED SELECT  
  ------------------------------------------------------------------ */
  if($("select").length>0){
    $('select').styler();
  }

  /* Height Overlay Text Block 
  -------------------------------------------------------------------*/
  $('.front-page #primary-banner-title, .other-style #primary-banner-title, .video-section, #full-width-slider').css( "height", $(window).height());

  /* Clit title 
  -------------------------------------------------------------------*/
  if($('.slider-overlay').length>0) {
    titleParams();
  }

  /* Go-to-about 
  ------------------------------------------------------------------*/
  $body.on('click', '.go-to-about', function(e) {
    $('body, html').animate({
      scrollTop: $('#about-as').offset().top - (-10)
    }, 400);
    e.preventDefault();
  }); 

  /* SCROLL TOP and other files
  ------------------------------------------------------------------*/
  $body.on('click', '.go-up', function(e) {
    var $link = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $('body, html').offset().top
    }, 1600);
    e.preventDefault();
  });

  /* add class fixed for menu
  -------------------------------------------------------------------*/
  if($(".front-page #wrapper-header").length>0) {
    $(window).scroll(function(){
      var navHeight = $( window ).height() - 100;
      var window_top = $(window).scrollTop() - navHeight; 
      var div_top = $('#nav-anchor').offset().top;
        if (window_top > div_top) {
            $('#wrapper-header').addClass('fixed');
        } else {
            $('#wrapper-header').removeClass('fixed');
        }
    });
  }


  /* Accordion
  -------------------------------------------------------------------*/
  if ($('.accordion')) {
    $body.on('hidden.bs.collapse', '.accordion', toggleChevron);
    $body.on('shown.bs.collapse', '.accordion', toggleChevron);
  }; 

  /* myTab 
  -------------------------------------------------------------------*/
  if($(".myTab").length>0){
    $('.myTab').tabCollapse();
  }

  /* Fancy box 
  ------------------------------------------------------------------*/
  if($(".fancybox").length>0){
    $(".fancybox").fancybox({
      openEffect : 'none',
      closeEffect : 'none',
    });
  }

  /* Open second ul menu slide
  ------------------------------------------------------------------*/
  $body.on('click', ".collapsed", function(){
    $(this).toggleClass("start-collapsed");
  });

  /* Scroll to link in menu 
  ----------------------------------------------------------------------*/
  $body.on('click', link, function(e) {
    var target = $(this).attr('href');
    if ($(target).length) {
      $('body, html').animate({scrollTop: $(target).offset().top}, 400);
    }
    e.preventDefault();
  });

  /* SKILLS SIRCLES 
  ----------------------------------------------------------------------*/
  initSkillSircles('.skill-item');

  /* Add Animate CSS  
  ----------------------------------------------------------------------*/
  // function animations() {
    // Calculating The Browser Scrollbar Width
    var parent, child, scrollWidth, bodyWidth;

  if (scrollWidth === undefined) {
    parent = $('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
    child = parent.children();
    scrollWidth = child.innerWidth() - child.height(99).innerWidth();
    parent.remove();
  }

  $('.appear-block').each(function() {
    var $this = $(this);
    $this.addClass('appear-animation');

    if(!$body.hasClass('no-csstransitions') && ($body.width() + scrollWidth) > 767) {
      $this.appear(function() {
      var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

        if(delay > 1) $this.css('animation-delay', delay + 'ms');
        $this.addClass($this.attr('data-appear-animation'));

        setTimeout(function() {
          $this.addClass('appear-animation-visible');
        }, delay);
      }, {accX: 0, accY: -150});
    } else {
      $this.addClass('appear-animation-visible');
    }
  });

  /* Animation Progress Bars 
  ---------------------------------------------------------------------*/
  $('.progress').each(function() {
  var $this = $(this);

  $this.appear(function() {
    var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

    if(delay > 1) $this.css('animation-delay', delay + 'ms');
    
    $this.find('.progress-bar').addClass($this.attr('data-appear-animation'));

    setTimeout(function() {
      $this.find('.progress-bar').animate({
        width: $this.attr('data-appear-progress-animation')
      }, 500, 'easeInCirc', function() {
        $this.find('.progress-bar').animate({
        textIndent: 10
        }, 1500, 'easeOutBounce');
      });
      }, delay);
    }, {accX: 0, accY: -50});
  });


  /* portfolio carousels
  ----------------------------------------------------------------------------*/
  $body.on('click', '.element-item', function () {
    // Select current element ID
    var currentAlbomID = $(this).data('albumid');
    // ReInit after click
    cache = [];
    $('.element-item:visible').each(function(index, element) {
      var AlbomID = $(element).data('albumid');
      cache.push(AlbomID);
    });
    var current_element_id = $.inArray(currentAlbomID, cache);
    var nextAlbomID = getNextID(current_element_id);
    var prevAlbomID = getPrevID(current_element_id);  
    // Get JSON
    create(currentAlbomID, nextAlbomID, prevAlbomID);
  });
  $body.on('click', '.prev.p-scroll',function() {
    var albom_id = $(this).data('albomid');
    var current_element_id = $.inArray(albom_id, cache);
    var nextAlbomID = getNextID(current_element_id);
    var prevAlbomID = getPrevID(current_element_id);
    create(albom_id, nextAlbomID, prevAlbomID);
    return false;
  });

  $body.on('click', '.next.p-scroll', function() {
    var albom_id = $(this).data('albomid');
    
    var current_element_id = $.inArray(albom_id, cache);
    var nextAlbomID = getNextID(current_element_id);
    var prevAlbomID = getPrevID(current_element_id);

    create(albom_id, nextAlbomID, prevAlbomID);
    return false;
  });

  /* ISOTOPE  
  ----------------------------------------------------------- */
  if($(".isotope").length>0) {
    // initialize Isotope after all images have loaded
    var $container = $('.isotope').imagesLoaded(function() {
      $container.isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
      });
    });
      
    // filter functions
    var itemReveal = Isotope.Item.prototype.reveal;
    Isotope.Item.prototype.reveal = function() {
      itemReveal.apply( this, arguments );
      $( this.element ).removeClass('isotope-hidden');
    };
  
    var itemHide = Isotope.Item.prototype.hide;
    Isotope.Item.prototype.hide = function() {
      itemHide.apply( this, arguments );
      $( this.element ).addClass('isotope-hidden');
    };
    
    // demo code
    $(function() {
      var $container = $('.isotope');
      $container.isotope({
        layoutMode: 'fitRows'
      });
      $('#filters').on( 'click', 'button', function() {
        var filtr = $( this ).attr('data-filter');
        $container.isotope({ filter: filtr });
      });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });

  }

  $body.on('click', '.a-sliders-close', function() {
    console.log('close');
    $('.sliders .container').hide();
    destroy('#albom');
    $(".sliders").css('min-height', 0);
    setTimeout(function(){
      $('body, html').animate({
        scrollTop: $('#back-top').offset().top - (200)
      }, 250);
    },0);
      
    return false;
  });

  /*play-video
  ----------------------------------------------------------------------------*/

  $body.on('click', '.play-video', function (e) {
      var videoContainer = $('.video-block');
      videoContainer.prepend('<iframe src="http://player.vimeo.com/video/22439234" width="500" height="281" class="stretch-both" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>');
      videoContainer.fadeIn(300);
      e.preventDefault();
  });
  // Close Video
  $body.on('click', '.close-video', function (e) {
      $('.video-block').fadeOut(400, function () {
          $("iframe", this).remove().fadeOut(300);
      });
  });


		/* Video Youtube 
	----------------------------------------------------------------------*/
	if($(".bg-youtube-video").length>0) {
		$('.layer .background-video.bg-youtube-video').tubular({ 
			videoId: $(".background-video.bg-youtube-video").data('video'), 
			start: 3,
			mute: true
		});			
	}

	/* Remove Video 
	------------------------------------------------------------------*/
	if($(".bg-video").length>0) {
		if(navigator.userAgent.match(/iPad|iPhone|Android/i)) {
			$('.bg-video').find('video').remove();
		}
	}

	/* ------------------- Add class if IE 11 or IE10 ------------------*/

	var ua = navigator.userAgent,
		doc = document.documentElement;

	if ((ua.match(/MSIE 10.0/i))) {
		doc.className = doc.className + " ie10";

	} else if((ua.match(/rv:11.0/i))){
		doc.className = doc.className + " ie11";
	}

  /* Carousels 
  --------------------------------------------------------------------*/
  initCarousels();

  /* GOOGLE MAPS  
  ------------------------------------------------------------------- */
  if($("#map-canvas").length>0) {
    initializeMap($body);
  }

  /* Current Navigation 
  --------------------------------------------------------------------*/ 
  $windowBrowser.on('scroll', function() {

    // menu waypoint
    $(link).each(function(index) {
      var $this  = $(this),
        scrollPos = $windowBrowser.scrollTop()+1,
        refElement = $($this.attr('href')),
        thisTop = refElement.position().top;

      if (thisTop <= scrollPos &&
          thisTop + refElement.innerHeight() > scrollPos) {
        $(link).removeClass('current');
        $this.addClass('current');
      } else $this.removeClass('current');
    });
      
  });

  /* Active Navigation 
  --------------------------------------------------------------------*/ 
  var url = window.location.pathname, 
      urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
  
  // now grab every link from the navigation
  $('#navigation-menu a').each(function(){
      // and test its normalized href against the url pathname regexp
      if(urlRegExp.test(this.href.replace(/\/$/,''))){
        $(this).addClass('active');
      }
  });


	/* RETINA 
	--------------------------------------------------------------------*/
	if( 'devicePixelRatio' in window && window.devicePixelRatio >= 2 ){
		$('body').addClass('device-retina');
		var imgToReplace = $('img.replace-2x').get();
	 
		for (var i=0,l=imgToReplace.length; i<l; i++) {
			var src = imgToReplace[i].src;
			src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
			imgToReplace[i].src = src;
		 
			$(imgToReplace[i]).load(function(){
				$(this).addClass('loaded');
			});
		}
	}

  /* Jqplot Chart 1 
  ----------------------------------------------------------------- */
  if($("#chart1").length>0) {
    
    var data = [
      ['One', 25],['Two', 15], ['Three', 16], 
      ['Four', 17],['Five', 12], ['Six', 15]
  ];
  var plot1 = jQuery.jqplot ('chart1', [data], { 
    seriesDefaults: {
      shadow: false,
      renderer:$.jqplot.DonutRenderer,
        rendererOptions: {
        startAngle: -90,
        diameter: 140,
        dataLabelPositionFactor: 0.6,
        innerDiameter: 28,
        showDataLabels: true
      }
    },
    grid:{
      background:'transparent',
      borderColor:'transparent',
      shadow:false,
      drawBorder:false,
      shadowColor:'transparent'
    },
    seriesColors: [
      "#3f4bb8",
      "#e13c4c",
      "#ff8137",
      "#ffbb42",
      "#20bdd0",
      "#2b70bf",
      "#f25463",
      "#f1a114",
      "#f5707d",
      "#ffd07d",
      "#4c7737"],
    legend: { 
      show:false, 
      location: 'e'
    }
  });
  $windowBrowser.resize(function() {
    plot1.replot({
      resetAxes: true
    });
  });
  }

  /* Morris 
  ---------------------------------------------------------------------------*/
  if($("#graph").length>0) {
    new Morris.Line({
      // ID of the element in which to draw the chart.
      element: 'graph',
      // Chart data records -- each entry in this array corresponds to a point on
      // the chart.
      data: [
        {"month": "2012-10", "sales": 4000, "rents": 5000},
        {"month": "2012-09", "sales": 4000, "rents": 5500},
        {"month": "2012-08", "sales": 3300, "rents": 5100},
        {"month": "2012-07", "sales": 3300, "rents": 5150},
        {"month": "2012-06", "sales": 3100, "rents": 4800},
        {"month": "2012-05", "sales": 2900, "rents": 4100},
        {"month": "2012-04", "sales": 2300, "rents": 4600},
        {"month": "2012-03", "sales": 2300, "rents": 3500},
        {"month": "2012-02", "sales": 2700, "rents": 1700},
        {"month": "2012-01", "sales": 2000, "rents": 1000}
      ],
      // The name of the data record attribute that contains x-values.
      xkey: 'month',
      // A list of names of data record attributes that contain y-values.
      ykeys: ['sales', 'rents'],
      // Labels for the ykeys -- will be displayed when you hover over the
      // chart.
      labels: ['sales', 'rents'],
      barRatio: 0.4,
      xLabelAngle: 35,
      hideHover: 'auto',
      smooth: false,
      resize: true,
      lineColors: ['#98b025','#d45050', '#000099']
    });
    }

    if($("#hero-bar").length>0) {
    Morris.Bar({
      element: 'hero-bar',
      data: [
        {month: 'Jan.', sales: 2000, rents:2400},
        {month: 'Feb.', sales: 3000, rents:3100},
        {month: 'Mar.', sales: 3600, rents:3000},
        {month: 'Apr.', sales: 4300, rents:4100},
        {month: 'May.', sales: 3300, rents:3500},
        {month: 'Jun.', sales: 3000, rents:3800},
        {month: 'Jul.', sales: 3400, rents:2900},
        {month: 'Aug.', sales: 2900, rents:3500},
        {month: 'Sep.', sales: 4000, rents:3500},
        {month: 'Oct.', sales: 3900, rents:3400}
      ],
      xkey: 'month',
      ykeys: ['sales', 'rents'],
      labels: ['sales', 'rents'],
      barRatio: 0.4,
      xLabelAngle: 35,
      hideHover: 'auto',
      resize: true,
      lineColors: ['#98b025','#d45050', '#000099']
    });
  }

  /* Notify Me
  ----------------------------------------------------------------*/
  $('.notify-me').submit(function(e){
    var form           = $(this),
        message        = form.find('.form-message'),
        messageSuccess = 'Your email is sended',
        messageInvalid = 'Please enter a valid email address',
        messageSigned  = 'This email is already signed',
        messageErrore  = 'Error request';
    
    e.preventDefault();
    
    $.ajax({
      url     : 'php/notify-me.php',
      type    : 'POST',
      data    : form.serialize(),
      success : function(data){
        form.find('.btn').prop('disabled', true);
        
        message.removeClass('text-danger').removeClass('text-success').fadeIn();
        
        console.log(data)
        
        switch(data) {
          case 0:
            message.html(messageSuccess).addClass('text-success').fadeIn();
          
            setTimeout(function(){
              form.trigger('reset');
              
              message.fadeOut().delay(500).queue(function(){
                message.html('').dequeue();
              });
            }, 2000);
            
            break;
          case 1:
            message.html(messageInvalid).addClass('text-danger').fadeIn();
            
            break;
          case 2:
            message.html(messageSigned).addClass('text-danger').fadeIn();
            
            setTimeout(function(){
              form.trigger('reset');

              message.fadeOut().delay(500).queue(function(){
                message.html('').dequeue();
              });
            }, 2000);
            
            break;
          default:
            message.html(messageErrore).addClass('text-danger').fadeIn();
        }
        
        form.find('.btn').prop('disabled', false);
      }
    });
  });

  /* Contact Form
  -----------------------------------------------------------------------*/
  $('.contact-form').submit(function(e){
    var form = $(this);
    
    e.preventDefault();
    
    $.ajax({
      type: 'POST',
      url : 'php/contact.php',
      data: form.serialize(),
      success: function(data){
        form.find('.form-message').html(data).fadeIn();
        
        
        form.find('.btn').prop('disabled', true);
          
        if ($(data).is('.send-true')){
          setTimeout(function(){
            form.trigger('reset');
            
            form.find('.btn').prop('disabled', false);
            
            form.find('.form-message').fadeOut().delay(500).queue(function(){
              form.find('.form-message').html('').dequeue();
            });
          }, 2000);
        } else {
          form.find('.btn').prop('disabled', false);
        }
      }
    });
  });

/* mCustomScrollbar 
  ----------------------------------------------------------------------*/
  if($("#slide-menu .wrapper-slide-menu-content").length>0) {
    $('#slide-menu .wrapper-slide-menu-content').mCustomScrollbar();
  }


}); 
	

 
/*-------------------------------------------------------------------*/
/*---------------------------Window.resize---------------------------*/
/*-------------------------------------------------------------------*/

$( window ).resize(function() {

  /* Height Overlay Text Block
  -----------------------------------------------------------------*/
  $('.front-page #primary-banner-title, .other-style #primary-banner-title, .video-section, #full-width-slider').css( "height", $(window).height());


	/* Background Clip Title 
	-----------------------------------------------------------------*/
  if($('.slider-overlay').length>0) {
    titleParams();
    titleCanvas();
  }

  /* Carousels 
  ----------------------------------------------------------------*/
  initCarousels();
  /* Google maps
  ----------------------------------------------------------------*/
  initializeMap($body);

  


}); 

/*-------------------------------------------------------------------*/
/*---------------------------Window.Load-----------------------------*/
/*-------------------------------------------------------------------*/
$( window ).load(function() {
	/* Hide preloader
	-------------------------------------------------------------------*/
  $('.preloader').fadeOut('slow',function(){$(this).remove();}); 

  /* Background Clip Title 
	-------------------------------------------------------------------*/
   if($('.slider-overlay').length>0) { 
    titleCanvas();
  }

 	/* Start ResponsiveSlides
 	-------------------------------------------------------------------*/
	if($(".rslides-1").length>0) {
		$('.rslides-1').addClass('start');
		$('.rslides-1.start').responsiveSlides({
			timeout: 5000,
			speed: 1000, 
      pager: true
		});
	}

  /* ---------------------- SOCIAL BUTTONS --------------------------*/
  if($(".social-inp").length>0) {
    var urlsoc = location.href;
    $('.shared-btn').each(function(){
      new GetShare({
        root: $(this),
        network: $(this).data('network'),
        button: {text: ''},
        share: {
          url: urlsoc,
          message: 'Link to '+urlsoc+' '
        }
      });
    });
  }

  /* --------- shareCount -------------- */
  function shareCount() {
    var numb = $('.post-soc-icon .social-inp .getshare-counter'),
      allCount = 0;
    numb.each(function () {
      allCount = allCount + Number($(this).html());
    });
    $('.count-shared .quantity').html(allCount);
  }


});


})(jQuery); 