/* author :  an.hyo-ju ( anoju@cntt.co.kr ) in CNTT 
 * 
 * modify : byeon sang woo in CNTT
 * 
 * */
var cookiedata = document.cookie;


$(function(){
	headCtl();
	formStyle();
	popupUI();
	//tapMotion();
	faqMotion();
	topBtn();
	scrollItem();
	//menuCtrl();
	subNav();
});

function headCtl(){
	var $header = $('#header');
	var gnbTxt = $('#gnb a');
	var title = $('#menu_title').text();
	var docTitle = $('.sub_nav_tit em').text();
	
	if(!title == ''){
		document.title = docTitle + ' | AMAZING RACE';
	}else{
		document.title = 'AMAZING RACE';
	}
	
	var current = $.trim(title);
	
	//gnb active
	gnbTxt.each(function() {
		 if ($(this).text() == current) {
			$(this).parents('li').addClass('active');
		}
	});
	
	$('.btn_gnb a').click(function(e){
		e.preventDefault();
		if($('html').hasClass('gnb_open')){
			$('html').removeClass('gnb_open');
			return false;
		}else{
			$('html').addClass('gnb_open');
			return false;
		}
	});
	$('.gnb_wrap').on('click',function(){
		$('html').removeClass('gnb_open');
	}).on('click','>div',function(e) {
		e.stopPropagation();
	});
	$('.gnb_tab a').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		console.log(href);
		$(href).show().siblings('.gnb_navi').hide();
		$(this).parent().addClass('on').siblings().removeClass('on');
	});
	
	$('.gnb_navi .in_sub').click(function(e){		
		console.log($(window).width());
		if($(window).width() <= 1024){
			e.preventDefault();
			$(this).parent().toggleClass('on').siblings().removeClass('on');
			$(this).next().slideToggle().parent().siblings().children('ul').slideUp();
		}
	});
	
	$(window).resize(function(){
		if($(window).width() > 1024){
			$('.gnb_navi, .gnb_navi > ul > li > ul').removeAttr('style');
			$('.m_depth2').removeAttr('style');
		}
	});
	
	$(window).on('scroll resize',function(){
		var	$headHeight = $('#header').outerHeight(),
			$sclTop = $(window).scrollTop();

		if($headHeight < $sclTop){
			$header.addClass('fixed');
		}else{
			$header.removeClass('fixed');
		}
	});

	$('.owl-nav div').attr('tabindex', 0);
}


function subNav(){
	var subNavItem = $( ".sub_nav_web" ).clone().find( "li" ),
		subNavTit = $('.sub_nav_tit em').text(),
		current = $.trim(subNavTit);

	// 모바일 서브 네비
	$('.sub_nav_mobile').append(subNavItem);
	$('.sub_nav_mobile').microfiche();
	
	
	$('.sub_nav_box ul').find('li a').each(function() {
		if ( $(this).text() === current) {
			$(this).parents('li').addClass('active');
		}
	});
}


function getBrowserType(){    
	"use strict";
	var _ua = navigator.userAgent;
	var rv = -1;
	 
	//IE 11,10,9,8
	var trident = _ua.match(/Trident\/(\d.\d)/i);
	if( trident !== null )
	{
		if( trident[1] == "7.0" ) return rv = "IE" + 11;
		if( trident[1] == "6.0" ) return rv = "IE" + 10;
		if( trident[1] == "5.0" ) return rv = "IE" + 9;
		if( trident[1] == "4.0" ) return rv = "IE" + 8;
	}
	 
	//IE 7...
	if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
	 
	/*
	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
	if( rv == 7 ) return rv = "IE" + 7; 
	*/
	 
	//other
	var agt = _ua.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}

/* form */
function formStyle(){
	$('input, textarea').placeholder();
	
	//checkbox, radio
	$('label .checkbox, label .radio').focus(function(){
		$(this).parent().addClass('hover');
	}).blur(function(){
		$(this).parent().removeClass('hover');
	});

	//inputFile	
	$('.input_file > input').focus(function(){
		$(this).closest('.input_file').find('.btn_file input').trigger('click');
	});	
	$('.input_file .btn_file .button').click(function(e){
		e.preventDefault();
		$(this).closest('.input_file').find('.btn_file input').trigger('click');
	});	
	$('.input_file .btn_file input').change(function(){
		$(this).closest('.input_file').find('> input').val($(this).val());
	});
}

/* TOP 버튼 */
function topBtn() {
    var settings = {
            button      : '#toTop',
            text        : 'to top',
            min         : 100,
            fadeIn      : 400,
            fadeOut     : 400,
            scrollSpeed : 800,
            easingType  : 'easeInOutExpo'
        };

   $('body').append('<a href="#" id="' + settings.button.substring(1) + '" title="' + settings.text + '">' + settings.text + '</a>');
    $( settings.button ).on('click', function( e ){
        $('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );
        e.preventDefault();
    })
    .on('mouseenter', function() {
        $( settings.button ).addClass('hover');
    })
    .on('mouseleave', function() {
        $( settings.button ).removeClass('hover');
    });

    $(window).scroll(function() {
        var position = $(window).scrollTop();
        if ( position > settings.min ) { $( settings.button ).fadeIn( settings.fadeIn );  }
        else { $( settings.button ).fadeOut( settings.fadeOut );  }
    });
}

/* Tap */
function tapMotion(){
	$(window).load(function(){
		$('.tabMotion a').click(function() {
			if(!$(this).parent().hasClass('on')){
				var href = $(this).attr('href');		
				$(href).addClass('on').siblings('.tab_cont').removeClass('on');
				$(this).parent().addClass('on').siblings().removeClass('on');
				$(this).parents('.tabmenu').removeClass('tab_open')
			}else{
				$(this).parents('.tabmenu').toggleClass('tab_open')
			}
			return false;
	    });
	
		var speed = 500,
			$href = location.href,
			$tabId = $.url($href).param('tabId'),
			$tabIdx = $.url($href).param('tabIdx'),
			$SclId = $.url($href).param('SclId'),
			$id = $('#'+$SclId);
			
		if($('.tabMotion').length > 0){	
			$('.tabMotion').each(function(index, element) {
				var $this = $(this),
					$id2 = $this.attr('id');
				if($id2 == $tabId && $tabIdx > 0){
					$this.children('li').eq($tabIdx).find('a').trigger('click');
				}else if($id2 == $tabId && $tabIdx == 'last'){
					$this.children('li').last().find('a').trigger('click');
				}else{
					$this.children('li').first().find('a').trigger('click');
				}
			});
		}

		if($id.length > 0 && $id.is(':visible')){
			var $top = $id.offset().top;
			//console.log($top,$locationH)
			$(window).scrollTo($top-$locationH,speed);
		}
	})
}


//resizeEnd
$(window).resize(function() {
    if(this.resizeTO) {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    },300);
});

//popup
function popOpen(tar){
	var $pop = $(tar).find('.form_info_pop');
	//var $wrapH,$popH,$mT
	
	$('body').addClass('pop_opened');
	$(tar).addClass('pop_opened');
	//popPositin(tar);
	$(window).on('resizeEnd',function(){
		//popPositin(tar);
	})
}

function popPositin(tar){
	var $wrapW = $(tar).width(),
		$wrapH = $(tar).height(),
		$pop = $(tar).find('.pop_wrap'),
		$popW = $pop.outerWidth(),
		$popH = $pop.outerHeight(),
		$mL = Math.max(0,($wrapW-$popW)/2)
		$mT = Math.max(0,($wrapH-$popH)/2);
		$html = $('html');
		$pop.stop().css({'margin-top':$mT,'margin-left':$mL});
}

function popupUI(){
	$('.pop_open').on('click',function(e) {
		e.preventDefault();
		var pop = $(this).attr('href');
		popOpen(pop);
	});
	$('.pop_close').on('click',function(e) {
		e.preventDefault();
		pop = $(this).closest('.pop_bg');
		popClose(pop);
	});
	
	$('.pop_bg').on('click',function(){
		var vCont = $(this);
		if(!vCont.hasClass('close_none')){popClose(vCont);}
	}).on('click','.pop_wrap',function(e) {
		e.stopPropagation();
	});
}
function popClose(tar) {	
	//var $pop = $(tar).find('.form_info_pop');
	$('body').removeClass('pop_opened');
	$('.form_info_pop').removeClass('pop_opened');
}

function todayPopup(){
	var $speed = 500;
	var popList=[];

	if($('.pop_today').length > 0){
		$('.pop_today').each(function(){
			var $id = $(this).attr('id')
			popList.push($id)
		})
	}

	$('.pop_today .pop_modal_close').click(function(e){
		var chk = $(this).closest('.pop_today').find('.todayChk'),
			$id = $(this).closest('.pop_today').attr('id');

		if (chk.is(':checked') ) {
			setCookie( $id, 'done' , 1 );
		}
		$('#'+$id).hide($speed);
	})
	
	for(var i in popList){
		if(cookiedata.indexOf(popList[i]+'=done') < 0) {					
			$('#'+popList[i]).show($speed);
		};
	}
}

/* faq */
function faqMotion(){
	$('.faq_list dt a').on('click',function(e) {
		e.preventDefault();
		var $this = $(this);
		
		$this.parents('dl').toggleClass('on').siblings('dl').removeClass('on');
		$this.parent().next().slideToggle(300).attr('tabindex', 0);
		$('.faq_list dd:visible').not($this.parent().next()).slideUp(300)
		return false;
	});
	$('.faq_list dd').blur(function(){
		var $this = $(this);
		$this.parents('dl').removeClass('on')
		$this.slideUp(300);
	})
}


function scrollItem(){
	var $elements = $( '*[data-animation]' );
	var h = $(window).height()
	$elements.each( function( i, el ) {
		var $el = $( el ),
		    animationClass = $el.data('animation');

		$el.addClass( animationClass );
		$el.addClass( 'animated' );
		$el.addClass('double-animation');
		var t = $el.offset().top;
		if(t > h){
			$el.addClass('wait-animation');
			$el.removeClass('double-animation');
		}
		
		console.log(t);
		$el.one('inview', function(){
			if($el.hasClass('wait-animation')){
				$el.removeClass('wait-animation');
				$el.addClass('double-animation');
			}
		});
	});
}


//android version
var ua = navigator.userAgent;
if( ua.indexOf("Android") >= 0 ){
  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8));
}

//mobile device
var isMobile = {
    Android: function () {
             return navigator.userAgent.match(/Android/i) == null ? false : true;
    },
    BlackBerry: function () {
             return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
    },
    IOS: function () {
             return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
    },
    Opera: function () {
             return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
    },
    Windows: function () {
             return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
    },
    any: function () {
             return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());
    }
};