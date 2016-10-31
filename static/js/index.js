
	$(document).ready(function(){
		//首页顶部导航
		var indexTopFixed = function (){
			if($(window).scrollTop() >= $(".bannerwrap").height()){
				$("#indexTop").addClass("scroll");
			}else{
				$("#indexTop").removeClass("scroll");
			}
		}


		//导航显示子菜单
		$("ul.nav-list li:eq(3)").hover(
		function(){
			$(".subnav").removeClass("hide");
		},
		function(){
			$(".subnav").addClass("hide");
		});

		//轮播图片
		$('.jiu9-slider').unslider({
			animation: 'fade',
			autoplay: true,
			arrows: false
		});

		//浮动导航显示子菜单
		$("ul.nav-list li:eq(3)").hover(function(){
			$(".subnav").removeClass("hide");
			$("ul.nav-list .addvalue").addClass("hover");
		});
		$("ul.nav-list li:eq(3)").mouseleave(function(){
			$(".subnav").addClass("hide");
			$("ul.nav-list .addvalue").removeClass("hover");
		});

		//左中右过渡动画
		function animationLCR(){
			$(".animationLCR").each(function(){
				var rowOffsetTop = $(this).offset().top;
				if($(document).scrollTop() > rowOffsetTop - $(window).height() + 160){
					$(this).find("li").eq(0).addClass("slideleft");
					$(this).find("li").eq(1).addClass("zoomin");
					$(this).find("li").eq(2).addClass("zoomin");
					$(this).find("li").eq(3).addClass("slideright");
					$(this).find("li").eq(4).addClass("zoomin");
					$(this).find("li").eq(5).addClass("slideright");
					$(this).addClass("show");
				}
			})
		}
		animationLCR();

		//列表齐出大小动画
		function animationZoomIn(){
			$(".animationZoomIn").each(function(){
				var rowOffsetTop = $(this).offset().top;
				if($(document).scrollTop() > rowOffsetTop - $(window).height() + 160){
					$(this).find("a").addClass("zoomin");
					$(this).addClass("show");
				}
			})
		}
		animationZoomIn();

		//行业案例hover动效
		$(".casewrap .caseitem").each(function(){
			$(this).hover(function(){
				$(this).addClass("hover");
				//$(this).find(".caseintro").stop(false,true).animate({"top":"40px"},600);
			})
			$(this).mouseleave(function(){
				$(this).removeClass("hover");
				//$(this).find(".caseintro").stop(false,true).animate({"top":"100%"},600);
			})
		})

		//add appwrap firstSlide
		$("#firstSlide div[data-scro='controler'] b,#firstSlide div[data-scro='controler2'] a").click(function(){
			var T = $(this);
			if(T.attr("class")=="down") return false;
			J2ROLLING_ANIMATION.st({
				findObject : T,	//当前点击对象 默认写
				main : T.parent().parent().find("div[data-scro='list']"),	//滚动目标容器窗口对象
				main2 : T.parent().parent().find("div[data-scro='list2']"),	//滚动目标容器窗口对象
				pagSource : T.parent().parent().find("div[data-scro='controler'] b"),	//切换按钮对象
				className : "down",		//选中的样式
				duration : "fast",		//滚动速度 和jquery速度一致
				on : $(this)[0].tagName=="A" ? true : false		//用于判断是否开启无限滚动 or 来回切换
			});
			return false;
		});
		var J2SETTIME="", J2Time=true,J2ROLLING_ANIMATION = {
			init : function(){
				this.start();
				this.time();	
			},
			st : function(o){
				if(J2Time){
					this.animate(o.findObject,o.main,o.main2,o.className,o.duration,o.pagSource,o.on);
					J2Time = false;
				}
			},
			animate : function(T,M,M2,C,S,P,O){
					var _prevDown = O ? P.parent().find("*[class='"+C+"']") : T.parent().find(T[0].tagName+"[class='"+C+"']"),
						_prevIndex = _prevDown.index(),
						_thisIndex = O ? (T.attr("class")=="next" ? _prevIndex+1 : _prevIndex-1) : T.index(),
						_list = M.find(".item"),
						_list2 = M2.find(".item"),
						p2n = 1;
					_prevDown.removeClass(C);
					if(O){
						if(_thisIndex==-1) _thisIndex=_list.size()-1;
						if(_thisIndex==_list.size()) _thisIndex=0;
						P.eq(_thisIndex).addClass(C);
					}else{
						T.addClass(C);
					}
					if(T.attr("class")=="prev" || _thisIndex<_prevIndex) p2n = false;
					if((T.attr("class")=="next" || _thisIndex>_prevIndex)&&T.attr("class")!="prev") p2n = true;
					
					!p2n ? _list.eq(_thisIndex).css("left",-M.width()) : '';
					!p2n ? _list2.eq(_thisIndex).css("left",-M.width()) : '';
					_list.eq(_prevIndex).animate({left:p2n ? -M.width() : M.width()},S,function(){
						$(this).removeAttr("style");	
						J2Time = true;
					});
					_list2.eq(_prevIndex).animate({left:p2n ? -M.width() : M.width()},S,function(){
						$(this).removeAttr("style");	
						J2Time = true;
					});
					_list.eq(_thisIndex).animate({left:"0px"},S);
					_list2.eq(_thisIndex).animate({left:"0px"},S);
			},
			start : function(){
				$("#firstSlide div[data-scro='controler'] b,#firstSlide div[data-scro='controler2'] a").mouseover(function(){
					window.clearInterval(J2SETTIME);																			   
				}).mouseout(function(){
					J2ROLLING_ANIMATION.time();
				});
			},
			time : function(){
				J2SETTIME = window.setInterval(function(){
					var num = $("#firstSlide div[data-scro='controler'] b[class='down']").index(),
						_list = $("#firstSlide div[data-scro='list'] li"),
						_list2 = $("#firstSlide div[data-scro='list2'] li");
					_list.eq(num).animate({"left":-$("#firstSlide div[data-scro='list']").width()},"slow",function(){
						$(this).removeAttr("style");	
						$("#firstSlide div[data-scro='controler'] b").removeClass("down").eq(num).addClass("down");
					});	
					_list2.eq(num).animate({"left":-$("#firstSlide div[data-scro='list2']").width()},"slow",function(){
						$(this).removeAttr("style");	
						$("#firstSlide div[data-scro='controler'] b").removeClass("down").eq(num).addClass("down");
					});	
					num++;
					if(num==_list.size()){
						num=0;
					}
					_list.eq(num).animate({"left":"0px"},"slow");
					_list2.eq(num).animate({"left":"0px"},"slow");		
				},6000);
			}
		};
		//J2ROLLING_ANIMATION.init();	//firstSlide是否开启自动轮播
		$("#firstSlide .controler b").slice(6,11).hide();
		try{
			$("#firstSlide .controler a").click(function(){
				!$(this).hasClass("fold")?$(this).addClass("fold") && $(this).find(".appname").html("收起") && $("#firstSlide .controler b").slice(5,11).slideDown():$(this).removeClass("fold") && $(this).find(".appname").html("更多") && $("#firstSlide .controler b").slice(5,11).slideUp();
			})
		} catch (e){
			//do nothing
		}

		//二维码
		$(".fix-QRcode").hover(function(){
			$(".downQRcode").stop().animate({"right":"49px"},400).show();
		}, function(){
			$(".downQRcode").stop().hide().animate({"right":"69px"},0);
		});

		//返回顶部
		$(".fix-backtop").click(function(){$("html,body").animate({scrollTop: "0px"}, 500);});

		//滚动事件
		$(window).scroll(function(){
			//首页顶部导航
			indexTopFixed();

			//首页产品特点过渡动画
			animationLCR();

			//行业案例过度动画
			animationZoomIn();


			//返回顶部
			if($(window).scrollTop() >= 300){
				$(".right-fixed").fadeIn(300);
			}else{
				$(".right-fixed").fadeOut(300);
			} 
		});

	});
