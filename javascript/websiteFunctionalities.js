$(function() {
	setImageHeight();
	showSubmenu();
	closeSubmenu();
	screenChangeEvent();
});

var mql = window.matchMedia("(min-width: 850px)");
var mql2 = window.matchMedia("(max-width: 849px)");

var image = $("#image-container");
var widthOfImage = image.attr("width");
var heightOfImage = parseInt(widthOfImage) / 8.33;

var menu_item = $(".hasSubmenu");
var caret = $("i:nth-of-type(2)");

var smallImage = $("#art");

function setImageHeight() {
	image.attr("height", heightOfImage);
}

function showSubmenu() {
	menu_item.on("click", 
		function(event) {
			event.stopPropagation();
			$(this).children("ul").toggle("fast");

			if($(this).children("i:nth-of-type(2)").hasClass("fa-caret-right")) {
				$(this).children("i:nth-of-type(2)").removeClass("fa-caret-right").addClass("fa-caret-down");
			} else {
				$(this).children("i:nth-of-type(2)").removeClass("fa-caret-down").addClass("fa-caret-right");
			}
	});
}

function closeSubmenu() {
	$(document).click(function() {
		$(this).children("ul").hide("fast");

		if($(this).children("i:nth-of-type(2)").hasClass("fa-caret-right")) {
			$(this).children("i:nth-of-type(2)").removeClass("fa-caret-down").addClass("fa-caret-right");
		}
	});
}

function screenChangeEvent() {

	//add auto page slide back when menu is not collapse 
	//before rechanging page width
	mql.addListener(handleScreenChange);
	handleScreenChange(mql);

	//add placeholder, contact page
	mql2.addListener(addPlaceholder);
	addPlaceholder(mql2);

	//change to small image in mobile or tablet 
	mql2.addListener(changeToSmallImage);
	changeToSmallImage(mql2);
}

function handleScreenChange(mediaQueryList) {
	if (mediaQueryList.matches) {
		if($("#nav-trigger:checked")){
			$("#nav-trigger").removeAttr("checked");
		}
	}
}

function addPlaceholder(mediaQueryList) {
	if (mediaQueryList.matches) {
		$("#contactname").attr("placeholder", " What's your name?");
		$("#contactemail").attr("placeholder", " What's your email address?");
		$("#contactcomments").attr("placeholder", " What are your questions or comments?");
		$("#captcha").attr("placeholder", " This helps us fight spam.");
	} else {
		$("#contactname").removeAttr("placeholder", " What's your name?");
		$("#contactemail").removeAttr("placeholder", " What's your email address?");
		$("#contactcomments").removeAttr("placeholder", " What are your questions or comments?");
		$("#captcha").removeAttr("placeholder", " This helps us fight spam.");
	}
}

function changeToSmallImage(mediaQueryList) { 
	if (mediaQueryList.matches) {
		if (smallImage.attr("src") == "images/image.jpg") {
			smallImage.attr("src", "images/image-small.jpg")
		}
	} else {
		smallImage.attr("src", "images/image.jpg")
	}
}